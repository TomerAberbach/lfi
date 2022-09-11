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

import { createAsyncIterable, createIterable } from '../internal/helpers.js'
import { curry } from './fn.js'
import { asConcur } from './as.js'
import { normalizeReducer } from './reducer.js'
import { next } from './optional.js'
import { map } from './transform.js'

export const reduce = curry((reducer, iterable) => {
  const { create, add, finish } = normalizeReducer(reducer)

  if (create) {
    return reduceInternal(create(), add, finish, iterable)
  }

  return createIterable(function* () {
    const [first, rest] = next(iterable)
    yield* map(value => reduceInternal(value, add, finish, rest), first)
  })
})

function reduceInternal(acc, add, finish, iterable) {
  for (const value of iterable) {
    acc = add(acc, value)
  }

  return finish(acc)
}

export const reduceAsync = curry((asyncReducer, asyncIterable) => {
  const { create, add, combine, finish } = normalizeReducer(asyncReducer)
  const concurIterable = asConcur(asyncIterable)

  if (!create) {
    return createAsyncIterable(async function* () {
      yield* await reduceConcurWithoutCreate(add, finish, concurIterable)
    })
  }
  if (!combine) {
    return reduceConcurWithCreateWithoutCombine(
      create,
      add,
      finish,
      concurIterable,
    )
  }
  return reduceConcurWithCreateWithCombine(
    create,
    add,
    combine,
    finish,
    concurIterable,
  )
})

export const reduceConcur = curry((asyncReducer, concurIterable) => {
  const { create, add, combine, finish } = normalizeReducer(asyncReducer)

  if (!create) {
    return async apply => {
      const accs = await reduceConcurWithoutCreate(add, finish, concurIterable)
      if (accs.length) {
        await apply(accs[0])
      }
    }
  }
  if (!combine) {
    return reduceConcurWithCreateWithoutCombine(
      create,
      add,
      finish,
      concurIterable,
    )
  }
  return reduceConcurWithCreateWithCombine(
    create,
    add,
    combine,
    finish,
    concurIterable,
  )
})

const reduceConcurWithoutCreate = async (add, finish, concurIterable) => {
  const accs = []

  await concurIterable(async acc => {
    while (accs.length) {
      acc = await add(acc, accs.pop())
    }

    accs.push(acc)
  })

  return accs.length ? [await finish(accs[0])] : accs
}

const reduceConcurWithCreateWithCombine = async (
  create,
  add,
  combine,
  finish,
  concurIterable,
) => {
  const accs = [create()]

  await concurIterable(async value => {
    let acc = await add(await (accs.length ? accs.pop() : create()), value)

    while (accs.length) {
      acc = await combine(acc, accs.pop())
    }

    accs.push(acc)
  })

  return finish(await accs[0])
}

const reduceConcurWithCreateWithoutCombine = async (
  create,
  add,
  finish,
  concurIterable,
) => {
  let accPromise = Promise.resolve(create())
  await concurIterable(
    value => (accPromise = accPromise.then(acc => add(acc, value))),
  )
  return finish(await accPromise)
}
