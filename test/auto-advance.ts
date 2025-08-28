import { vitest } from 'vitest'
import { getScheduler } from './fast-check/test-prop.ts'

const autoAdvance =
  <Args extends unknown[], Return>(
    fn: (...args: Args) => Return | PromiseLike<Return>,
  ): ((...args: Args) => Promise<Return>) =>
  async (...args) => {
    let done = false
    const promise = Promise.resolve(fn(...args))
    promise.then(
      () => (done = true),
      () => (done = true),
    )

    // eslint-disable-next-line typescript/no-unnecessary-condition
    while (!done) {
      await getScheduler()?.waitIdle()
      vitest.advanceTimersToNextTimer()
      await Promise.resolve()
    }

    return promise
  }

export default autoAdvance
