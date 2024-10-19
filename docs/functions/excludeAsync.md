[**lfi**](../readme.md) • **Docs**

---

[lfi](../globals.md) / excludeAsync

# Function: excludeAsync()

Returns an async iterable containing the values of `asyncIterable` in iteration
order excluding the values of `excluded`.

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

> **excludeAsync**(`excluded`): \<`Value`\>(`asyncIterable`) =>
> `AsyncIterable`\<`Value`, `any`, `any`\>

Returns an async iterable containing the values of `asyncIterable` in iteration
order excluding the values of `excluded`.

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

[exclude.d.ts:253](https://github.com/TomerAberbach/lfi/blob/85d6360ac7d8f71c70f308d2ace5bc2aa99ab03d/src/operations/exclude.d.ts#L253)

## excludeAsync(excluded, asyncIterable)

> **excludeAsync**\<`Value`\>(`excluded`, `asyncIterable`):
> `AsyncIterable`\<`Value`, `any`, `any`\>

Returns an async iterable containing the values of `asyncIterable` in iteration
order excluding the values of `excluded`.

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

[exclude.d.ts:256](https://github.com/TomerAberbach/lfi/blob/85d6360ac7d8f71c70f308d2ace5bc2aa99ab03d/src/operations/exclude.d.ts#L256)
