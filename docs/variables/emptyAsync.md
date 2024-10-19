[**lfi**](../readme.md) • **Docs**

***

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

[empty.d.ts:31](https://github.com/TomerAberbach/lfi/blob/d7a0f90dd72245d6efd6bd97c58a78b3f3028f25/src/operations/empty.d.ts#L31)
