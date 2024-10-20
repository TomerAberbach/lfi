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

[exclude.d.ts:137](https://github.com/TomerAberbach/lfi/blob/fd6e1ff9d7b7d249090f89ead6d0a30e26aba2e4/src/operations/exclude.d.ts#L137)

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

[exclude.d.ts:140](https://github.com/TomerAberbach/lfi/blob/fd6e1ff9d7b7d249090f89ead6d0a30e26aba2e4/src/operations/exclude.d.ts#L140)
