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
import { jest } from 'tomer'
import { getScheduler } from './fast-check/test-prop.js'

const autoAdvance =
  <Args extends unknown[], Return>(
    fn: (...args: Args) => Return | Promise<Return>,
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
