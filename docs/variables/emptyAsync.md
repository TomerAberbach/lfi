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

core.d.ts:325
