[**lfi**](../readme.md) • **Docs**

---

[lfi](../globals.md) / mapAsync

# Function: mapAsync()

Returns an async iterable containing the values of `asyncIterable` transformed
by `fn` in iteration order.

Like `Array.prototype.map`, but for async iterables.

## Example

```js
console.log(
  await pipe(
    asAsync([`sloth`, `more sloth`, `even more sloth`]),
    mapAsync(string => string.length),
    reduceAsync(toArray()),
  ),
)
//=> [ 5, 10, 15 ]
```

## mapAsync(fn)

> **mapAsync**\<`From`, `To`\>(`fn`): (`asyncIterable`) =>
> `AsyncIterable`\<`To`, `any`, `any`\>

Returns an async iterable containing the values of `asyncIterable` transformed
by `fn` in iteration order.

Like `Array.prototype.map`, but for async iterables.

### Type Parameters

• **From**

• **To**

### Parameters

• **fn**

### Returns

`Function`

#### Parameters

• **asyncIterable**: `AsyncIterable`\<`From`, `any`, `any`\>

#### Returns

`AsyncIterable`\<`To`, `any`, `any`\>

### Example

```js
console.log(
  await pipe(
    asAsync([`sloth`, `more sloth`, `even more sloth`]),
    mapAsync(string => string.length),
    reduceAsync(toArray()),
  ),
)
//=> [ 5, 10, 15 ]
```

### Defined in

[transform.d.ts:48](https://github.com/TomerAberbach/lfi/blob/c9ef1bf4d1040d7f49c52b70b358c019e55f524d/src/operations/transform.d.ts#L48)

## mapAsync(fn, asyncIterable)

> **mapAsync**\<`From`, `To`\>(`fn`, `asyncIterable`): `AsyncIterable`\<`To`,
> `any`, `any`\>

Returns an async iterable containing the values of `asyncIterable` transformed
by `fn` in iteration order.

Like `Array.prototype.map`, but for async iterables.

### Type Parameters

• **From**

• **To**

### Parameters

• **fn**

• **asyncIterable**: `AsyncIterable`\<`From`, `any`, `any`\>

### Returns

`AsyncIterable`\<`To`, `any`, `any`\>

### Example

```js
console.log(
  await pipe(
    asAsync([`sloth`, `more sloth`, `even more sloth`]),
    mapAsync(string => string.length),
    reduceAsync(toArray()),
  ),
)
//=> [ 5, 10, 15 ]
```

### Defined in

[transform.d.ts:51](https://github.com/TomerAberbach/lfi/blob/c9ef1bf4d1040d7f49c52b70b358c019e55f524d/src/operations/transform.d.ts#L51)