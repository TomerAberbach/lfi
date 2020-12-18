export function* concat(...iterables) {
  for (const iterable of iterables) {
    yield* iterable
  }
}
