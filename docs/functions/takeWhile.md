[**lfi**](../readme.md) • **Docs**

***

[lfi](../globals.md) / takeWhile

# Function: takeWhile()

Returns an iterable containing the values of `iterable` in iteration order
up until but not including the first value for which `fn` returns a falsy
value.

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

> **takeWhile**\<`Value`\>(`fn`): (`iterable`) => `Iterable`\<`Value`, `any`, `any`\>

Returns an iterable containing the values of `iterable` in iteration order
up until but not including the first value for which `fn` returns a falsy
value.

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

[splices.d.ts:82](https://github.com/TomerAberbach/lfi/blob/a3eb3a94b2928b5200a7bcd0a14fdc70f0cb5947/src/operations/splices.d.ts#L82)

## takeWhile(fn, iterable)

> **takeWhile**\<`Value`\>(`fn`, `iterable`): `Iterable`\<`Value`, `any`, `any`\>

Returns an iterable containing the values of `iterable` in iteration order
up until but not including the first value for which `fn` returns a falsy
value.

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

[splices.d.ts:82](https://github.com/TomerAberbach/lfi/blob/a3eb3a94b2928b5200a7bcd0a14fdc70f0cb5947/src/operations/splices.d.ts#L82)
