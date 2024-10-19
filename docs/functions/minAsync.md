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

[statistics.d.ts:950](https://github.com/TomerAberbach/lfi/blob/c9ef1bf4d1040d7f49c52b70b358c019e55f524d/src/operations/statistics.d.ts#L950)
