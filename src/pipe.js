export const pipe = (value, ...fns) => fns.reduce((acc, fn) => fn(acc), value)
