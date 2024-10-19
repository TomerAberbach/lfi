[**lfi**](../readme.md) • **Docs**

---

[lfi](../globals.md) / takeWhile

# Function: takeWhile()

Returns an iterable containing the values of `iterable` in iteration order up
until but not including the first value for which `fn` returns a falsy value.

## Example

```js
console.log(
  pipe(
    [1, 2, 3, 4, 5, 6, 7, 8, `sloth`],
    takeWhile(value => value < 5),
    reduce(toArray()),
  ),
)
//=> [ 1, 2, 3, 4 ]
```

## takeWhile(fn)

> **takeWhile**\<`Value`\>(`fn`): (`iterable`) => `Iterable`\<`Value`, `any`,
> `any`\>

Returns an iterable containing the values of `iterable` in iteration order up
until but not including the first value for which `fn` returns a falsy value.

### Type Parameters

• **Value**

### Parameters

• **fn**

### Returns

`Function`

#### Parameters

• **iterable**: `Iterable`\<`Value`, `any`, `any`\>

#### Returns

`Iterable`\<`Value`, `any`, `any`\>

### Example

```js
console.log(
  pipe(
    [1, 2, 3, 4, 5, 6, 7, 8, `sloth`],
    takeWhile(value => value < 5),
    reduce(toArray()),
  ),
)
//=> [ 1, 2, 3, 4 ]
```

### Defined in

[slice.d.ts:81](https://github.com/TomerAberbach/lfi/blob/c9ef1bf4d1040d7f49c52b70b358c019e55f524d/src/operations/slice.d.ts#L81)

## takeWhile(fn, iterable)

> **takeWhile**\<`Value`\>(`fn`, `iterable`): `Iterable`\<`Value`, `any`,
> `any`\>

Returns an iterable containing the values of `iterable` in iteration order up
until but not including the first value for which `fn` returns a falsy value.

### Type Parameters

• **Value**

### Parameters

• **fn**

• **iterable**: `Iterable`\<`Value`, `any`, `any`\>

### Returns

`Iterable`\<`Value`, `any`, `any`\>

### Example

```js
console.log(
  pipe(
    [1, 2, 3, 4, 5, 6, 7, 8, `sloth`],
    takeWhile(value => value < 5),
    reduce(toArray()),
  ),
)
//=> [ 1, 2, 3, 4 ]
```

### Defined in

[slice.d.ts:81](https://github.com/TomerAberbach/lfi/blob/c9ef1bf4d1040d7f49c52b70b358c019e55f524d/src/operations/slice.d.ts#L81)