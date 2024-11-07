[**lfi**](../readme.md) • **Docs**

***

[lfi](../globals.md) / asAsync

# Function: asAsync()

> **asAsync**\<`Value`\>(`iterable`): `AsyncIterable`\<`Value`, `any`, `any`\>

Returns an async iterable wrapper around `iterable`.

Note that when passing a concur iterable the returned async iterable may have
to buffer the values produced by the concur iterable because values may not
be read from the async iterable as quickly as they are produced by the concur
iterable. This is a fundamental problem because concur iterables are "push"
based while async iterables are "pull" based, which creates backpressure.

## Type Parameters

• **Value**

## Parameters

• **iterable**: `Iterable`\<`Value`, `any`, `any`\> \| `AsyncIterable`\<`Value`, `any`, `any`\> \| [`ConcurIterable`](../type-aliases/ConcurIterable.md)\<`Value`\>

## Returns

`AsyncIterable`\<`Value`, `any`, `any`\>

## Example

```js
const asyncIterable = asAsync([`sloth`, `more sloth`, `even more sloth`])

console.log(typeof asyncIterable[Symbol.asyncIterator])
//=> function

for await (const value of asyncIterable) {
  console.log(value)
}
//=> sloth
//=> more sloth
//=> even more sloth
```

## Defined in

core.d.ts:243
