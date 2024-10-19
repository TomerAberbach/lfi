const createAssert =
  ({ _predicate, _message }) =>
  config =>
    Object.entries(config).every(
      ([name, value]) =>
        _predicate(name, value) ||
        error(`\`${name}\` must be ${_message}: ${value}`),
    )

export const error = message => {
  throw new Error(message)
}

export const assertInteger = createAssert({
  _predicate: (_, value) => Number.isSafeInteger(value),
  _message: `an integer`,
})

export const assertNonNegativeInteger = createAssert({
  _predicate: (name, value) => assertInteger({ [name]: value }) && value >= 0,
  _message: `a non-negative integer`,
})

export const assertPositiveInteger = createAssert({
  _predicate: (name, value) => assertInteger({ [name]: value }) && value > 0,
  _message: `a positive integer`,
})

export const assertPureIterable = createAssert({
  _predicate: (_, { _value: value, _symbol: symbol }) =>
    value[symbol]() !== value[symbol](),
  _message: `a pure iterable`,
})

export const assertRange = createAssert({
  _predicate: (_, [start, end]) => start <= end,
  _message: `a range`,
})
