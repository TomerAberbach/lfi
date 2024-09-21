const withElapsed = async <Value>(
  fn: () => Value | PromiseLike<Value>,
): Promise<{ elapsed: number; result: Value }> => {
  const now = Date.now()
  const result = await fn()
  return { elapsed: Date.now() - now, result }
}

export default withElapsed
