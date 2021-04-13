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

import { curry } from './curry.js'
import { reduce, reduceAsync, reduceConcur } from './fold.js'
import { or, orAsync, orConcur } from './optional.js'
import { pipe } from './pipe.js'
import { map, mapAsync, mapConcur } from './map.js'

const createJoin = (map, reduce, or) =>
  curry((separator, iterable) =>
    pipe(
      iterable,
      map(String),
      reduce((acc, value) => `${acc}${separator}${value}`),
      or(() => ``)
    )
  )

export const join = createJoin(map, reduce, or)
export const joinAsync = createJoin(mapAsync, reduceAsync, orAsync)
export const joinConcur = createJoin(mapConcur, reduceConcur, orConcur)
