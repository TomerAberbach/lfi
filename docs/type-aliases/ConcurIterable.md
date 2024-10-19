[**lfi**](../readme.md) • **Docs**

---

[lfi](../globals.md) / ConcurIterable

# Type Alias: ConcurIterable()\<Value\>

> **ConcurIterable**\<`Value`\>: (`apply`) => `Promise`\<`void`\>

Represents a potentially lazy collection of values, each of type `Value`, that
can be iterated over concurrently.

The collection can be iterated by invoking the concur iterable with an `apply`
callback. The callback is applied to each value in the collection, potentially
asynchronously, in some order.

Invoking the concur iterable returns a promise that resolves when `apply` has
been applied to each value in the concur iterable and each result returned by
`apply` is awaited.

It is like an event emitter that accepts only one event handler and returns a
promise that resolves when all events have been emitted and handled.

## Type Parameters

• **Value**

## Parameters

• **apply**: [`ConcurIterableApply`](ConcurIterableApply.md)\<`Value`\>

## Returns

`Promise`\<`void`\>

## Example

```js
const slothNamesConcurIterable = pipe(
  asConcur([`sloth-names1.txt`, `sloth-names2.txt`]),
  mapConcur(filename => fs.promises.readFile(filename, `utf8`)),
  flatMapConcur(content => content.split(`\n`)),
)
```

## Defined in

[as.d.ts:55](https://github.com/TomerAberbach/lfi/blob/c9ef1bf4d1040d7f49c52b70b358c019e55f524d/src/operations/as.d.ts#L55)
