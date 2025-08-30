import type { test as testInternal } from 'vitest'
import { fc, test as fcTestInternal } from '@fast-check/vitest'
import autoAdvance from '../auto-advance.ts'

const wrapTestProp =
  (testProp: typeof fcTestInternal.prop) =>
  <Values extends [any] | any[]>(
    arbitraries: ArbitraryTuple<Values>,
    params?: fc.Parameters<[fc.Scheduler, ...Values]>,
  ) => {
    const fn = testProp<[fc.Scheduler, ...Values]>(
      // eslint-disable-next-line typescript/no-unsafe-argument
      [fc.scheduler(), ...arbitraries] as any,
      params,
    ) as (
      testName: string,
      prop: Prop<[fc.Scheduler, ...Values]>,
      timeout?: number,
    ) => void
    return (
      testName: string,
      prop: Prop<[...Values, fc.Scheduler]>,
      timeout?: number,
    ) =>
      fn(
        testName,
        async (...args: [fc.Scheduler, ...Values]) => {
          const [scheduler, ...values] = args
          context.scheduler = scheduler
          try {
            await autoAdvance(prop)(...values, context.scheduler)
          } finally {
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
    prop: Prop<[...Values, fc.Scheduler]>,
    timeout?: number,
  ) => void
} = Object.assign(fcTestInternal, { prop: wrapTestProp(fcTestInternal.prop) })

type ArbitraryTuple<Values extends [any] | any[]> = {
  [Index in keyof Values]: fc.Arbitrary<Values[Index]>
}
type Prop<Values extends [any] | any[]> = (
  ...args: Values
) => boolean | void | PromiseLike<boolean | void> // eslint-disable-line typescript/no-invalid-void-type

export const getScheduler = (): fc.Scheduler | undefined => context.scheduler

export const getIterableIndex = (): number => context.iterableIndex!++

const context: { scheduler?: fc.Scheduler; iterableIndex?: number } = {
  iterableIndex: 0,
}
