/**
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { fc, testProp as testPropInternal } from 'tomer'
import { SameValueMap } from 'svkc'
import delay from '../delay.js'
import withElapsed from '../with-elapsed.js'
import autoAdvance from '../auto-advance.js'

export const testProp = Object.assign(wrapTestProp(testPropInternal), {
  only: wrapTestProp(testPropInternal.only),
  skip: wrapTestProp(testPropInternal.skip),
  todo: wrapTestProp(testPropInternal.todo),
})

function wrapTestProp(testProp: typeof testPropInternal.only) {
  return <Values extends unknown[] | [unknown]>(
    label: string,
    arbitraries: ArbitrariesTuple<Values>,
    prop: (...values: [...Values, Scheduler]) => unknown,
    params?: fc.Parameters<[fc.ContextValue, ...Values, fc.Scheduler]>,
  ): void => {
    // eslint-disable-next-line jest/expect-expect
    testProp<[fc.ContextValue, ...Values, fc.Scheduler]>(
      label,
      [
        fc.context(),
        ...(arbitraries as unknown as Iterable<Values[keyof Values]>),
        fc.scheduler(),
      ] as unknown as ArbitrariesTuple<
        [fc.ContextValue, ...Values, fc.Scheduler]
      >,
      async (ctx, ...args) => {
        context.scheduler = new Scheduler(args[args.length - 1] as fc.Scheduler)
        try {
          await autoAdvance(prop)(
            ...(args.slice(0, args.length - 1) as Values),
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
      params,
    )
  }
}

type ArbitrariesTuple<Values extends unknown[] | [unknown]> = {
  [Key in keyof Values]: fc.Arbitrary<Values[Key]>
}

export function getScheduler(): Scheduler | undefined {
  return context.scheduler
}

export function getIterableIndex(): number {
  return context.iterableIndex!++
}

const context: { scheduler?: Scheduler; iterableIndex?: number } = {
  iterableIndex: 0,
}

export class Scheduler {
  private readonly scheduler: fc.Scheduler
  private resolveIndex = 0
  private readonly timeoutMap: SameValueMap<
    unknown,
    {
      promise: Promise<{ elapsed: number; resolveIndex: number }>
      value: unknown
    }[]
  > = new SameValueMap()

  public constructor(scheduler: fc.Scheduler) {
    this.scheduler = scheduler
  }

  public async schedule<Value>(value: Value): Promise<Value>
  public async schedule(): Promise<void>
  // eslint-disable-next-line @typescript-eslint/no-invalid-void-type
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
      // eslint-disable-next-line @typescript-eslint/no-empty-function
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

        const { elapsed } = elapsedValues[0]
        return { elapsed, values: getElapsed(elapsed) }
      },
      max: (): { elapsed: number; values: unknown[] } => {
        if (elapsedValues.length === 0) {
          return { elapsed: 0, values: [] }
        }

        const { elapsed } = elapsedValues[elapsedValues.length - 1]
        return { elapsed, values: getElapsed(elapsed) }
      },
      sum: (): number =>
        elapsedValues.reduce((acc: number, { elapsed }) => acc + elapsed, 0),
      values: (): unknown[] => elapsedValues.map(({ value }) => value),
    }
  }

  public async waitAll(): Promise<void> {
    if (this.scheduler.count() > 0) {
      await this.scheduler.waitAll()
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
