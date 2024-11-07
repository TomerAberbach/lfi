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

[filters.d.ts:254](https://github.com/TomerAberbach/lfi/blob/a3eb3a94b2928b5200a7bcd0a14fdc70f0cb5947/src/operations/filters.d.ts#L254)

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

[filters.d.ts:257](https://github.com/TomerAberbach/lfi/blob/a3eb3a94b2928b5200a7bcd0a14fdc70f0cb5947/src/operations/filters.d.ts#L257)
