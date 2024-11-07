[**lfi**](../readme.md) • **Docs**

***

[lfi](../globals.md) / drop

# Function: drop()

Returns an iterable containing the values of `iterable` in iteration order
except for the first `count` values.

If the `count` is greater than the number of values in `iterable`, then an
empty iterable is returned.

## Throws

if `count` isn't a non-negative integer.

## Example

```js
console.log(
  pipe(
    [1, 2, 3, 4, 5, `sloth`],
    drop(3),
    reduce(toArray()),
  ),
)
//=> [ 4, 5, 'sloth' ]
```

## drop(count)

> **drop**\<`Count`\>(`count`): \<`Value`\>(`iterable`) => `Iterable`\<`Value`, `any`, `any`\>

Returns an iterable containing the values of `iterable` in iteration order
except for the first `count` values.

If the `count` is greater than the number of values in `iterable`, then an
empty iterable is returned.

### Type Parameters

• **Count** *extends* `number`

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
console.log(
  pipe(
    [1, 2, 3, 4, 5, `sloth`],
    drop(3),
    reduce(toArray()),
  ),
)
//=> [ 4, 5, 'sloth' ]
```

### Defined in

splices.d.ts:176

## drop(count, iterable)

> **drop**\<`Count`, `Value`\>(`count`, `iterable`): `Iterable`\<`Value`, `any`, `any`\>

Returns an iterable containing the values of `iterable` in iteration order
except for the first `count` values.

If the `count` is greater than the number of values in `iterable`, then an
empty iterable is returned.

### Type Parameters

• **Count** *extends* `number`

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
console.log(
  pipe(
    [1, 2, 3, 4, 5, `sloth`],
    drop(3),
    reduce(toArray()),
  ),
)
//=> [ 4, 5, 'sloth' ]
```

### Defined in

splices.d.ts:176
