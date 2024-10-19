[**lfi**](../readme.md) • **Docs**

---

[lfi](../globals.md) / mapConcur

# Function: mapConcur()

Returns a concur iterable containing the values of `concurIterable` transformed
by `fn` in iteration order.

Like `Array.prototype.map`, but for concur iterables.

## Example

```js
console.log(
  await pipe(
    asConcur([`sloth`, `more sloth`, `even more sloth`]),
    mapConcur(string => string.length),
    reduceConcur(toArray()),
  ),
)
//=> [ 5, 10, 15 ]
```

## mapConcur(fn)

> **mapConcur**\<`From`, `To`\>(`fn`): (`concurIterable`) =>
> [`ConcurIterable`](../type-aliases/ConcurIterable.md)\<`To`\>

Returns a concur iterable containing the values of `concurIterable` transformed
by `fn` in iteration order.

Like `Array.prototype.map`, but for concur iterables.

### Type Parameters

• **From**

• **To**

### Parameters

• **fn**

### Returns

`Function`

#### Parameters

• **concurIterable**:
[`ConcurIterable`](../type-aliases/ConcurIterable.md)\<`From`\>

#### Returns

[`ConcurIterable`](../type-aliases/ConcurIterable.md)\<`To`\>

### Example

```js
console.log(
  await pipe(
    asConcur([`sloth`, `more sloth`, `even more sloth`]),
    mapConcur(string => string.length),
    reduceConcur(toArray()),
  ),
)
//=> [ 5, 10, 15 ]
```

### Defined in

[transform.d.ts:76](https://github.com/TomerAberbach/lfi/blob/dd796c78d3ff68ae7bf4a0272b3cbeca688438e7/src/operations/transform.d.ts#L76)

## mapConcur(fn, concurIterable)

> **mapConcur**\<`From`, `To`\>(`fn`, `concurIterable`):
> [`ConcurIterable`](../type-aliases/ConcurIterable.md)\<`To`\>

Returns a concur iterable containing the values of `concurIterable` transformed
by `fn` in iteration order.

Like `Array.prototype.map`, but for concur iterables.

### Type Parameters

• **From**

• **To**

### Parameters

• **fn**

• **concurIterable**:
[`ConcurIterable`](../type-aliases/ConcurIterable.md)\<`From`\>

### Returns

[`ConcurIterable`](../type-aliases/ConcurIterable.md)\<`To`\>

### Example

```js
console.log(
  await pipe(
    asConcur([`sloth`, `more sloth`, `even more sloth`]),
    mapConcur(string => string.length),
    reduceConcur(toArray()),
  ),
)
//=> [ 5, 10, 15 ]
```

### Defined in

[transform.d.ts:79](https://github.com/TomerAberbach/lfi/blob/dd796c78d3ff68ae7bf4a0272b3cbeca688438e7/src/operations/transform.d.ts#L79)
