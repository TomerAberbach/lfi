[**lfi**](../readme.md) • **Docs**

---

[lfi](../globals.md) / emptyAsync

# Variable: emptyAsync

> `const` **emptyAsync**: `AsyncIterable`\<`any`\>

An async iterable that contains zero values.

Can be used as an async iterable of any type.

Like `[]`, but for async iterables.

## Example

```js
console.log(await pipe(emptyAsync, reduceAsync(toArray())))
//=> []
```

## Defined in

[empty.d.ts:31](https://github.com/TomerAberbach/lfi/blob/dd796c78d3ff68ae7bf4a0272b3cbeca688438e7/src/operations/empty.d.ts#L31)
