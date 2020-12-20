/**
 * Copyright 2020 Google LLC
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

export class Iterator {
  constructor(iterator) {
    this.iterator = iterator
    this.result = null
  }

  hasNext() {
    return (this.result ?? (this.result = this.iterator.next())).done !== true
  }

  getNext() {
    if (!this.hasNext()) {
      throw new Error(`Iterator doesn't have next`)
    }

    const { value } = this.result
    this.result = null
    return value
  }

  static fromIterable(iterable) {
    return new Iterator(iterable[Symbol.iterator]())
  }
}

export class AsyncIterator {
  constructor(iterator) {
    this.iterator = iterator
    this.result = null
  }

  async hasNext() {
    return (
      (this.result ?? (this.result = await this.iterator.next())).done !== true
    )
  }

  async getNext() {
    if (!(await this.hasNext())) {
      throw new Error(`AsyncIterator doesn't have next`)
    }

    const { value } = this.result
    this.result = null
    return value
  }

  static fromIterable(iterable) {
    return new AsyncIterator(iterable[Symbol.asyncIterator]())
  }
}
