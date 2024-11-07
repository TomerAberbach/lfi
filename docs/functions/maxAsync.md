[**lfi**](../readme.md) • **Docs**

***

[lfi](../globals.md) / maxAsync

# Function: maxAsync()

> **maxAsync**(`asyncIterable`): `AsyncIterable`\<`number`, `any`, `any`\>

Returns an async iterable containing a maximum value of `asyncIterable` if
`asyncIterable` contains at least one value. Otherwise, returns an empty
async iterable.

## Parameters

• **asyncIterable**: `AsyncIterable`\<`number`, `any`, `any`\>

## Returns

`AsyncIterable`\<`number`, `any`, `any`\>

## Example

```js
console.log(await pipe(asAsync([4, 1, 5, -3]), maxAsync, getAsync))
//=> 5
```

## Defined in

[statistics.d.ts:1012](https://github.com/TomerAberbach/lfi/blob/95b3b82a9fc32cec65089cf86d003d7620dc44fc/src/operations/statistics.d.ts#L1012)
