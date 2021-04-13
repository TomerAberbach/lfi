/**
 * Copyright 2021 Google LLC
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

import { fc } from 'ava-fast-check'
import { compose, pipe } from '../src/pipe.js'
import { test, testProp } from './helpers/macros.js'

testProp(
  `pipe returns the given value for a single argument`,
  [fc.anything()],
  (t, value) => {
    const piped = pipe(value)

    t.is(piped, value)
  }
)

testProp(
  `pipe pipes`,
  [fc.anything(), fc.array(fc.func(fc.anything()), { minLength: 1 })],
  (t, value, [firstFn, ...otherFns]) => {
    t.is(pipe(value, firstFn, ...otherFns), pipe(firstFn(value), ...otherFns))
  }
)

test(`pipe concrete example`, t => {
  const piped = pipe(
    1,
    value => value * 2,
    String,
    string => string.repeat(3)
  )

  t.is(piped, `222`)
})

testProp(
  `compose returns the identity function for no arguments`,
  [fc.anything()],
  (t, value) => {
    const fn = compose()

    t.is(fn(value), value)
  }
)

testProp(
  `compose composes`,
  [fc.anything(), fc.array(fc.func(fc.anything()), { minLength: 1 })],
  (t, value, [firstFn, ...otherFns]) => {
    t.is(
      compose(firstFn, ...otherFns)(value),
      compose(...otherFns)(firstFn(value))
    )
  }
)

test(`compose concrete example`, t => {
  const composed = compose(
    value => value * 2,
    String,
    string => string.repeat(3)
  )

  t.is(composed(1), `222`)
})
