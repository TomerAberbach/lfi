[**lfi**](../readme.md) • **Docs**

---

[lfi](../globals.md) / take

# Function: take()

Returns an iterable containing the first `count` values of `iterable` in
iteration order.

If the `count` is greater than the number of values in `iterable`, then an
iterable equivalent `iterable` is returned.

## Throws

if `count` isn't a non-negative integer.

## Example

```js
console.log(pipe([1, 2, 3, 4, 5, `sloth`], take(3), reduce(toArray())))
//=> [ 1, 2, 3 ]
```

## take(count)

> **take**\<`Count`\>(`count`): \<`Value`\>(`iterable`) => `Iterable`\<`Value`,
> `any`, `any`\>

Returns an iterable containing the first `count` values of `iterable` in
iteration order.

If the `count` is greater than the number of values in `iterable`, then an
iterable equivalent `iterable` is returned.

### Type Parameters

• **Count** _extends_ `number`

### Parameters

• **count**: `NonNegativeInteger`\<`Count`\>

### Returns

`Function`

#### Type Parameters

• **Value**

#### Parameters

• **iterable**: `Iterable`\<`Value`, `any`, `any`\>

#### Returns

`Iterable`\<`Value`, `any`, `any`\>

### Throws

if `count` isn't a non-negative integer.

### Example

```js
console.log(pipe([1, 2, 3, 4, 5, `sloth`], take(3), reduce(toArray())))
//=> [ 1, 2, 3 ]
```

### Defined in

[slice.d.ts:244](https://github.com/TomerAberbach/lfi/blob/c9ef1bf4d1040d7f49c52b70b358c019e55f524d/src/operations/slice.d.ts#L244)

## take(count, iterable)

> **take**\<`Count`, `Value`\>(`count`, `iterable`): `Iterable`\<`Value`, `any`,
> `any`\>

Returns an iterable containing the first `count` values of `iterable` in
iteration order.

If the `count` is greater than the number of values in `iterable`, then an
iterable equivalent `iterable` is returned.

### Type Parameters

• **Count** _extends_ `number`

• **Value**

### Parameters

• **count**: `NonNegativeInteger`\<`Count`\>

• **iterable**: `Iterable`\<`Value`, `any`, `any`\>

### Returns

`Iterable`\<`Value`, `any`, `any`\>

### Throws

if `count` isn't a non-negative integer.

### Example

```js
console.log(pipe([1, 2, 3, 4, 5, `sloth`], take(3), reduce(toArray())))
//=> [ 1, 2, 3 ]
```

### Defined in

[slice.d.ts:244](https://github.com/TomerAberbach/lfi/blob/c9ef1bf4d1040d7f49c52b70b358c019e55f524d/src/operations/slice.d.ts#L244)