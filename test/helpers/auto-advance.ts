import { jest } from 'tomer'
import { getScheduler } from './fast-check/test-prop.js'

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

    // eslint-disable-next-line no-unmodified-loop-condition, typescript/no-unnecessary-condition
    while (!done) {
      await getScheduler()?.waitAll()
      jest.advanceTimersToNextTimer()
      await Promise.resolve()
    }

    return promise
  }

export default autoAdvance
