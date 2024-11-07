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

[core.d.ts:325](https://github.com/TomerAberbach/lfi/blob/a3eb3a94b2928b5200a7bcd0a14fdc70f0cb5947/src/operations/core.d.ts#L325)
