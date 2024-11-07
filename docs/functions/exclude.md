[**lfi**](../readme.md) • **Docs**

***

[lfi](../globals.md) / exclude

# Function: exclude()

Returns an iterable containing the values of `iterable` in iteration order
excluding the values of `excluded`.

## Example

```js
console.log(
  pipe(
    [`sloth`, `sleep`, `fast`, `slow`, `mean`],
    exclude([`mean`, `fast`]),
    reduce(toArray()),
  ),
)
//=> [ 'sloth', 'sleep', 'slow' ]
```

## exclude(excluded)

> **exclude**(`excluded`): \<`Value`\>(`iterable`) => `Iterable`\<`Value`, `any`, `any`\>

Returns an iterable containing the values of `iterable` in iteration order
excluding the values of `excluded`.

### Parameters

• **excluded**: `Iterable`\<`unknown`, `any`, `any`\>

### Returns

`Function`

#### Type Parameters

• **Value**

#### Parameters

• **iterable**: `Iterable`\<`Value`, `any`, `any`\>

#### Returns

`Iterable`\<`Value`, `any`, `any`\>

### Example

```js
console.log(
  pipe(
    [`sloth`, `sleep`, `fast`, `slow`, `mean`],
    exclude([`mean`, `fast`]),
    reduce(toArray()),
  ),
)
//=> [ 'sloth', 'sleep', 'slow' ]
```

### Defined in

filters.d.ts:228

## exclude(excluded, iterable)

> **exclude**\<`Value`\>(`excluded`, `iterable`): `Iterable`\<`Value`, `any`, `any`\>

Returns an iterable containing the values of `iterable` in iteration order
excluding the values of `excluded`.

### Type Parameters

• **Value**

### Parameters

• **excluded**: `Iterable`\<`unknown`, `any`, `any`\>

• **iterable**: `Iterable`\<`Value`, `any`, `any`\>

### Returns

`Iterable`\<`Value`, `any`, `any`\>

### Example

```js
console.log(
  pipe(
    [`sloth`, `sleep`, `fast`, `slow`, `mean`],
    exclude([`mean`, `fast`]),
    reduce(toArray()),
  ),
)
//=> [ 'sloth', 'sleep', 'slow' ]
```

### Defined in

filters.d.ts:231
