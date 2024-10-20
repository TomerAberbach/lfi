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

[empty.d.ts:31](https://github.com/TomerAberbach/lfi/blob/fd6e1ff9d7b7d249090f89ead6d0a30e26aba2e4/src/operations/empty.d.ts#L31)
