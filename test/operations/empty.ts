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

/* eslint-disable typescript/no-explicit-any */

import { expectTypeOf } from 'tomer'
import type { ConcurIterable } from '../../src/index.js'
import {
  empty,
  emptyAsync,
  emptyConcur,
  reduceAsync,
  reduceConcur,
  toArray,
} from '../../src/index.js'
import autoAdvance from '../helpers/auto-advance.js'

test.skip(`empty types are correct`, () => {
  expectTypeOf(empty).toMatchTypeOf<Iterable<any>>()
  expectTypeOf(empty).toMatchTypeOf<Iterable<number>>()
  expectTypeOf(empty).toMatchTypeOf<Iterable<unknown>>()
})

test(`the empty iterable is empty`, () => {
  expect([...empty]).toBeEmpty()
})

test.skip(`emptyAsync types are correct`, () => {
  expectTypeOf(emptyAsync).toMatchTypeOf<AsyncIterable<any>>()
  expectTypeOf(emptyAsync).toMatchTypeOf<AsyncIterable<number>>()
  expectTypeOf(emptyAsync).toMatchTypeOf<AsyncIterable<unknown>>()
})

test(
  `the emptyAsync iterable is empty`,
  autoAdvance(async () => {
    expect(await reduceAsync(toArray(), emptyAsync)).toBeEmpty()
  }),
)

test.skip(`emptyConcur types are correct`, () => {
  expectTypeOf(emptyConcur).toMatchTypeOf<ConcurIterable<any>>()
  expectTypeOf(emptyConcur).toMatchTypeOf<ConcurIterable<number>>()
  expectTypeOf(emptyConcur).toMatchTypeOf<ConcurIterable<unknown>>()
})

test(
  `the emptyConcur iterable is empty`,
  autoAdvance(async () => {
    expect(await reduceConcur(toArray(), emptyConcur)).toBeEmpty()
  }),
)
