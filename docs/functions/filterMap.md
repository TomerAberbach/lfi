[**lfi**](../readme.md) • **Docs**

***

[lfi](../globals.md) / filterMap

# Function: filterMap()

Returns an iterable containing the values of `iterable` transformed by `fn`
in iteration order excluding the values for which `fn` returns `null` or
`undefined`.

## Example

```js
console.log(
  pipe(
    [
      { sloth: `sloth party` },
      { notSloth: `building` },
      { sloth: `sloths in trees` },
      { notSloth: `city` },
    ],
    filterMap(object => object.sloth),
    reduce(toArray()),
  ),
)
//=> [ 'sloth party', 'sloths in trees' ]
```

## filterMap(fn)

> **filterMap**\<`From`, `To`\>(`fn`): (`iterable`) => `Iterable`\<`NonNullable`\<`To`\>, `any`, `any`\>

Returns an iterable containing the values of `iterable` transformed by `fn`
in iteration order excluding the values for which `fn` returns `null` or
`undefined`.

### Type Parameters

• **From**

• **To**

### Parameters

• **fn**

### Returns

`Function`

#### Parameters

• **iterable**: `Iterable`\<`From`, `any`, `any`\>

#### Returns

`Iterable`\<`NonNullable`\<`To`\>, `any`, `any`\>

### Example

```js
console.log(
  pipe(
    [
      { sloth: `sloth party` },
      { notSloth: `building` },
      { sloth: `sloths in trees` },
      { notSloth: `city` },
    ],
    filterMap(object => object.sloth),
    reduce(toArray()),
  ),
)
//=> [ 'sloth party', 'sloths in trees' ]
```

### Defined in

filters.d.ts:138

## filterMap(fn, iterable)

> **filterMap**\<`From`, `To`\>(`fn`, `iterable`): `Iterable`\<`NonNullable`\<`To`\>, `any`, `any`\>

Returns an iterable containing the values of `iterable` transformed by `fn`
in iteration order excluding the values for which `fn` returns `null` or
`undefined`.

### Type Parameters

• **From**

• **To**

### Parameters

• **fn**

• **iterable**: `Iterable`\<`From`, `any`, `any`\>

### Returns

`Iterable`\<`NonNullable`\<`To`\>, `any`, `any`\>

### Example

```js
console.log(
  pipe(
    [
      { sloth: `sloth party` },
      { notSloth: `building` },
      { sloth: `sloths in trees` },
      { notSloth: `city` },
    ],
    filterMap(object => object.sloth),
    reduce(toArray()),
  ),
)
//=> [ 'sloth party', 'sloths in trees' ]
```

### Defined in

filters.d.ts:141
