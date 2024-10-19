[**lfi**](../readme.md) • **Docs**

---

[lfi](../globals.md) / minAsync

# Function: minAsync()

> **minAsync**(`asyncIterable`): `AsyncIterable`\<`number`, `any`, `any`\>

Returns an async iterable containing a minimum value of `asyncIterable` if
`asyncIterable` contains at least one value. Otherwise, returns an empty async
iterable.

## Parameters

• **asyncIterable**: `AsyncIterable`\<`number`, `any`, `any`\>

## Returns

`AsyncIterable`\<`number`, `any`, `any`\>

## Example

```js
console.log(await pipe(asAsync([4, 1, 5, -3]), minAsync, getAsync))
//=> -3
```

## Defined in

[statistics.d.ts:876](https://github.com/TomerAberbach/lfi/blob/dd796c78d3ff68ae7bf4a0272b3cbeca688438e7/src/operations/statistics.d.ts#L876)
