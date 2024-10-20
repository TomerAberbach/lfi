[**lfi**](../readme.md) • **Docs**

***

[lfi](../globals.md) / dropWhile

# Function: dropWhile()

Returns an iterable containing the values of `iterable` in iteration order
starting with the first value for which `fn` returns a falsy value.

## Example

```js
console.log(
  pipe(
    [1, 2, 3, 4, 5, 6, 7, 8, `sloth`],
    dropWhile(value => value < 5),
    reduce(toArray()),
  ),
)
//=> [ 5, 6, 7, 8, 'sloth' ]
```

## dropWhile(fn)

> **dropWhile**\<`Value`\>(`fn`): (`iterable`) => `Iterable`\<`Value`, `any`, `any`\>

Returns an iterable containing the values of `iterable` in iteration order
starting with the first value for which `fn` returns a falsy value.

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
    dropWhile(value => value < 5),
    reduce(toArray()),
  ),
)
//=> [ 5, 6, 7, 8, 'sloth' ]
```

### Defined in

[slice.d.ts:25](https://github.com/TomerAberbach/lfi/blob/fd6e1ff9d7b7d249090f89ead6d0a30e26aba2e4/src/operations/slice.d.ts#L25)

## dropWhile(fn, iterable)

> **dropWhile**\<`Value`\>(`fn`, `iterable`): `Iterable`\<`Value`, `any`, `any`\>

Returns an iterable containing the values of `iterable` in iteration order
starting with the first value for which `fn` returns a falsy value.

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
    dropWhile(value => value < 5),
    reduce(toArray()),
  ),
)
//=> [ 5, 6, 7, 8, 'sloth' ]
```

### Defined in

[slice.d.ts:25](https://github.com/TomerAberbach/lfi/blob/fd6e1ff9d7b7d249090f89ead6d0a30e26aba2e4/src/operations/slice.d.ts#L25)
