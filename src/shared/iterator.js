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
