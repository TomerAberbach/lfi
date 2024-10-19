[**lfi**](../readme.md) • **Docs**

---

[lfi](../globals.md) / generateAsync

# Function: generateAsync()

Returns an infinite async iterable that yields `seed` for its first value and
then yields the awaited result of applying `fn` to its previously yielded value
for every subsequent value.

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

> **generateAsync**\<`Value`\>(`fn`): (`seed`) => `AsyncIterable`\<`Value`,
> `any`, `any`\>

Returns an infinite async iterable that yields `seed` for its first value and
then yields the awaited result of applying `fn` to its previously yielded value
for every subsequent value.

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

[generate.d.ts:47](https://github.com/TomerAberbach/lfi/blob/c9ef1bf4d1040d7f49c52b70b358c019e55f524d/src/operations/generate.d.ts#L47)

## generateAsync(fn, seed)

> **generateAsync**\<`Value`\>(`fn`, `seed`): `AsyncIterable`\<`Value`, `any`,
> `any`\>

Returns an infinite async iterable that yields `seed` for its first value and
then yields the awaited result of applying `fn` to its previously yielded value
for every subsequent value.

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

[generate.d.ts:50](https://github.com/TomerAberbach/lfi/blob/c9ef1bf4d1040d7f49c52b70b358c019e55f524d/src/operations/generate.d.ts#L50)
