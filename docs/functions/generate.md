[**lfi**](../readme.md) • **Docs**

***

[lfi](../globals.md) / generate

# Function: generate()

Returns an infinite iterable that yields `seed` for its first value and then
yields the result of applying `fn` to its previously yielded value for every
subsequent value.

## Example

```js
console.log(
  pipe(
    generate(previousValue => previousValue + previousValue, `sloth`),
    take(3),
    reduce(toArray()),
  ),
)
//=> [ 'sloth', 'slothsloth', 'slothslothslothsloth' ]
```

## generate(fn)

> **generate**\<`Value`\>(`fn`): (`seed`) => `Iterable`\<`Value`, `any`, `any`\>

Returns an infinite iterable that yields `seed` for its first value and then
yields the result of applying `fn` to its previously yielded value for every
subsequent value.

### Type Parameters

• **Value**

### Parameters

• **fn**

### Returns

`Function`

#### Parameters

• **seed**: `Value`

#### Returns

`Iterable`\<`Value`, `any`, `any`\>

### Example

```js
console.log(
  pipe(
    generate(previousValue => previousValue + previousValue, `sloth`),
    take(3),
    reduce(toArray()),
  ),
)
//=> [ 'sloth', 'slothsloth', 'slothslothslothsloth' ]
```

### Defined in

generators.d.ts:69

## generate(fn, seed)

> **generate**\<`Value`\>(`fn`, `seed`): `Iterable`\<`Value`, `any`, `any`\>

Returns an infinite iterable that yields `seed` for its first value and then
yields the result of applying `fn` to its previously yielded value for every
subsequent value.

### Type Parameters

• **Value**

### Parameters

• **fn**

• **seed**: `Value`

### Returns

`Iterable`\<`Value`, `any`, `any`\>

### Example

```js
console.log(
  pipe(
    generate(previousValue => previousValue + previousValue, `sloth`),
    take(3),
    reduce(toArray()),
  ),
)
//=> [ 'sloth', 'slothsloth', 'slothslothslothsloth' ]
```

### Defined in

generators.d.ts:70
