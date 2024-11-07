[**lfi**](../readme.md) • **Docs**

***

[lfi](../globals.md) / excludeAsync

# Function: excludeAsync()

Returns an async iterable containing the values of `asyncIterable` in
iteration order excluding the values of `excluded`.

## Example

```js
console.log(
  await pipe(
    asAsync([`sloth`, `sleep`, `fast`, `slow`, `mean`]),
    excludeAsync([`mean`, `fast`]),
    reduceAsync(toArray()),
  ),
)
//=> [ 'sloth', 'sleep', 'slow' ]
```

## excludeAsync(excluded)

> **excludeAsync**(`excluded`): \<`Value`\>(`asyncIterable`) => `AsyncIterable`\<`Value`, `any`, `any`\>

Returns an async iterable containing the values of `asyncIterable` in
iteration order excluding the values of `excluded`.

### Parameters

• **excluded**: `Iterable`\<`unknown`, `any`, `any`\>

### Returns

`Function`

#### Type Parameters

• **Value**

#### Parameters

• **asyncIterable**: `AsyncIterable`\<`Value`, `any`, `any`\>

#### Returns

`AsyncIterable`\<`Value`, `any`, `any`\>

### Example

```js
console.log(
  await pipe(
    asAsync([`sloth`, `sleep`, `fast`, `slow`, `mean`]),
    excludeAsync([`mean`, `fast`]),
    reduceAsync(toArray()),
  ),
)
//=> [ 'sloth', 'sleep', 'slow' ]
```

### Defined in

filters.d.ts:254

## excludeAsync(excluded, asyncIterable)

> **excludeAsync**\<`Value`\>(`excluded`, `asyncIterable`): `AsyncIterable`\<`Value`, `any`, `any`\>

Returns an async iterable containing the values of `asyncIterable` in
iteration order excluding the values of `excluded`.

### Type Parameters

• **Value**

### Parameters

• **excluded**: `Iterable`\<`unknown`, `any`, `any`\>

• **asyncIterable**: `AsyncIterable`\<`Value`, `any`, `any`\>

### Returns

`AsyncIterable`\<`Value`, `any`, `any`\>

### Example

```js
console.log(
  await pipe(
    asAsync([`sloth`, `sleep`, `fast`, `slow`, `mean`]),
    excludeAsync([`mean`, `fast`]),
    reduceAsync(toArray()),
  ),
)
//=> [ 'sloth', 'sleep', 'slow' ]
```

### Defined in

filters.d.ts:257
