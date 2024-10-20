[**lfi**](../readme.md) • **Docs**

***

[lfi](../globals.md) / map

# Function: map()

Returns an iterable containing the values of `iterable` transformed by `fn`
in iteration order.

Like `Array.prototype.map`, but for iterables.

## Example

```js
console.log(
  pipe(
    [`sloth`, `more sloth`, `even more sloth`],
    map(string => string.length),
    reduce(toArray()),
  ),
)
//=> [ 5, 10, 15 ]
```

## map(fn)

> **map**\<`From`, `To`\>(`fn`): (`iterable`) => `Iterable`\<`To`, `any`, `any`\>

Returns an iterable containing the values of `iterable` transformed by `fn`
in iteration order.

Like `Array.prototype.map`, but for iterables.

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

`Iterable`\<`To`, `any`, `any`\>

### Example

```js
console.log(
  pipe(
    [`sloth`, `more sloth`, `even more sloth`],
    map(string => string.length),
    reduce(toArray()),
  ),
)
//=> [ 5, 10, 15 ]
```

### Defined in

[transform.d.ts:23](https://github.com/TomerAberbach/lfi/blob/fd6e1ff9d7b7d249090f89ead6d0a30e26aba2e4/src/operations/transform.d.ts#L23)

## map(fn, iterable)

> **map**\<`From`, `To`\>(`fn`, `iterable`): `Iterable`\<`To`, `any`, `any`\>

Returns an iterable containing the values of `iterable` transformed by `fn`
in iteration order.

Like `Array.prototype.map`, but for iterables.

### Type Parameters

• **From**

• **To**

### Parameters

• **fn**

• **iterable**: `Iterable`\<`From`, `any`, `any`\>

### Returns

`Iterable`\<`To`, `any`, `any`\>

### Example

```js
console.log(
  pipe(
    [`sloth`, `more sloth`, `even more sloth`],
    map(string => string.length),
    reduce(toArray()),
  ),
)
//=> [ 5, 10, 15 ]
```

### Defined in

[transform.d.ts:26](https://github.com/TomerAberbach/lfi/blob/fd6e1ff9d7b7d249090f89ead6d0a30e26aba2e4/src/operations/transform.d.ts#L26)
