/* eslint-disable typescript/no-invalid-void-type */
import { SameValueMap } from 'svkc'
import type { test as testInternal } from 'vitest'
import { fc, test as fcTestInternal } from '@fast-check/vitest'
import autoAdvance from '../auto-advance.ts'
import delay from '../delay.ts'
import withElapsed from '../with-elapsed.ts'

const wrapTestProp =
  (testProp: typeof fcTestInternal.prop) =>
  <Values extends [any] | any[]>(
    arbitraries: ArbitraryTuple<Values>,
    params?: fc.Parameters<[fc.ContextValue, ...Values, fc.Scheduler]>,
  ) => {
    const fn = testProp<[fc.ContextValue, ...Values, fc.Scheduler]>(
      // eslint-disable-next-line typescript/no-unsafe-argument
      [fc.context(), ...arbitraries, fc.scheduler()] as any,
      params,
    ) as (
      testName: string,
      prop: Prop<[fc.ContextValue, ...Values, fc.Scheduler]>,
      timeout?: number,
    ) => void
    return (
      testName: string,
      prop: Prop<[...Values, Scheduler]>,
      timeout?: number,
    ) =>
      fn(
        testName,
        async (ctx: fc.ContextValue, ...args: [...Values, fc.Scheduler]) => {
          context.scheduler = new Scheduler(args.at(-1) as fc.Scheduler)
          try {
            await autoAdvance(prop)(
              ...(args.slice(0, -1) as Values),
              context.scheduler,
            )
          } finally {
            ctx.log(
              fc.stringify(
                (await context.scheduler.report())
                  .raw()
                  .map(({ elapsed, value }) => [elapsed, value]),
              ),
            )

            /* eslint-disable require-atomic-updates */
            context.scheduler = undefined
            context.iterableIndex = 0
            /* eslint-enable require-atomic-updates */
          }
        },
        timeout,
      )
  }

export const test: typeof testInternal & {
  prop: <Values extends [any] | any[]>(
    arbitraries: ArbitraryTuple<Values>,
    params?: fc.Parameters<[fc.ContextValue, ...Values, fc.Scheduler]>,
  ) => (
    testName: string,
    prop: Prop<[...Values, Scheduler]>,
    timeout?: number,
  ) => void
} = Object.assign(fcTestInternal, { prop: wrapTestProp(fcTestInternal.prop) })

type ArbitraryTuple<Values extends [any] | any[]> = {
  [Index in keyof Values]: fc.Arbitrary<Values[Index]>
}
type Prop<Values extends [any] | any[]> = (
  ...args: Values
) => boolean | void | PromiseLike<boolean | void>

export const getScheduler = (): Scheduler | undefined => context.scheduler

export const getIterableIndex = (): number => context.iterableIndex!++

const context: { scheduler?: Scheduler; iterableIndex?: number } = {
  iterableIndex: 0,
}

export class Scheduler {
  private readonly scheduler: fc.Scheduler
  private resolveIndex = 0
  private readonly timeoutMap = new SameValueMap<
    unknown,
    {
      promise: Promise<{ elapsed: number; resolveIndex: number }>
      value: unknown
    }[]
  >()

  public constructor(scheduler: fc.Scheduler) {
    this.scheduler = scheduler
  }

  public async schedule<Value>(value: Value): Promise<Value>
  public async schedule(): Promise<void>
  public schedule<Value>(...args: Value[]): Promise<Value | void> {
    const promise = withElapsed(async () => {
      await this.scheduler
        .schedule(
          Promise.resolve(),
          args.length > 0 ? fc.stringify(args[0]) : undefined,
        )
        .then(() => delay(1))
    })

    if (args.length === 0) {
      return promise.then(() => {})
    }

    const [value] = args

    let timeouts = this.timeoutMap.get(value)
    if (!timeouts) {
      this.timeoutMap.set(value, (timeouts = []))
    }
    timeouts.push({
      promise: promise.then(({ elapsed }) => ({
        elapsed,
        resolveIndex: this.resolveIndex++,
      })),
      value,
    })

    return promise.then(() => value)
  }

  public async report(...args: unknown[]): Promise<Report> {
    const elapsedValues = (
      await Promise.all(
        (args.length === 0
          ? [...this.timeoutMap.values()].flat()
          : [...(this.timeoutMap.get(args[0]) ?? [])]
        ).map(({ promise, value }) =>
          promise.then(({ elapsed, resolveIndex }) => ({
            elapsed,
            resolveIndex,
            value,
          })),
        ),
      )
    ).sort(
      (
        { elapsed: elapsed1, resolveIndex: resolveIndex1 },
        { elapsed: elapsed2, resolveIndex: resolveIndex2 },
      ) => elapsed1 - elapsed2 || resolveIndex1 - resolveIndex2,
    )

    const getElapsed = (elapsed: number): unknown[] =>
      elapsedValues
        .filter(elapsedValue => elapsedValue.elapsed === elapsed)
        .map(({ value }) => value)

    return {
      raw: (): { elapsed: number; resolveIndex: number; value: unknown }[] =>
        elapsedValues,
      min: (): { elapsed: number; values: unknown[] } => {
        if (elapsedValues.length === 0) {
          return { elapsed: 0, values: [] }
        }

        const { elapsed } = elapsedValues[0]!
        return { elapsed, values: getElapsed(elapsed) }
      },
      max: (): { elapsed: number; values: unknown[] } => {
        if (elapsedValues.length === 0) {
          return { elapsed: 0, values: [] }
        }

        const { elapsed } = elapsedValues.at(-1)!
        return { elapsed, values: getElapsed(elapsed) }
      },
      sum: (): number =>
        elapsedValues.reduce((acc: number, { elapsed }) => acc + elapsed, 0),
      values: (): unknown[] => elapsedValues.map(({ value }) => value),
    }
  }

  public async waitIdle(): Promise<void> {
    if (this.scheduler.count() > 0) {
      await this.scheduler.waitIdle()
    }
  }
}

export type Report = {
  raw: () => { elapsed: number; resolveIndex: number; value: unknown }[]
  min: () => { elapsed: number; values: unknown[] }
  max: () => { elapsed: number; values: unknown[] }
  sum: () => number
  values: () => unknown[]
}
