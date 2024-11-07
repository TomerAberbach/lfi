[**lfi**](../readme.md) • **Docs**

***

[lfi](../globals.md) / generateAsync

# Function: generateAsync()

Returns an infinite async iterable that yields `seed` for its first value and
then yields the awaited result of applying `fn` to its previously yielded
value for every subsequent value.

## Example

```js
console.log(
  await pipe(
    generateAsync(previousValue => previousValue + previousValue, `sloth`),
    takeAsync(3),
    reduceAsync(toArray()),
  ),
)
//=> [ 'sloth', 'slothsloth', 'slothslothslothsloth' ]
```

## generateAsync(fn)

> **generateAsync**\<`Value`\>(`fn`): (`seed`) => `AsyncIterable`\<`Value`, `any`, `any`\>

Returns an infinite async iterable that yields `seed` for its first value and
then yields the awaited result of applying `fn` to its previously yielded
value for every subsequent value.

### Type Parameters

• **Value**

### Parameters

• **fn**

### Returns

`Function`

#### Parameters

• **seed**: `Value`

#### Returns

`AsyncIterable`\<`Value`, `any`, `any`\>

### Example

```js
console.log(
  await pipe(
    generateAsync(previousValue => previousValue + previousValue, `sloth`),
    takeAsync(3),
    reduceAsync(toArray()),
  ),
)
//=> [ 'sloth', 'slothsloth', 'slothslothslothsloth' ]
```

### Defined in

generators.d.ts:91

## generateAsync(fn, seed)

> **generateAsync**\<`Value`\>(`fn`, `seed`): `AsyncIterable`\<`Value`, `any`, `any`\>

Returns an infinite async iterable that yields `seed` for its first value and
then yields the awaited result of applying `fn` to its previously yielded
value for every subsequent value.

### Type Parameters

• **Value**

### Parameters

• **fn**

• **seed**: `Value`

### Returns

`AsyncIterable`\<`Value`, `any`, `any`\>

### Example

```js
console.log(
  await pipe(
    generateAsync(previousValue => previousValue + previousValue, `sloth`),
    takeAsync(3),
    reduceAsync(toArray()),
  ),
)
//=> [ 'sloth', 'slothsloth', 'slothslothslothsloth' ]
```

### Defined in

generators.d.ts:94
