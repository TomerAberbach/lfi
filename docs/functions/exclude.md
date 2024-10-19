[**lfi**](../readme.md) • **Docs**

---

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

> **exclude**(`excluded`): \<`Value`\>(`iterable`) => `Iterable`\<`Value`,
> `any`, `any`\>

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

[exclude.d.ts:227](https://github.com/TomerAberbach/lfi/blob/c9ef1bf4d1040d7f49c52b70b358c019e55f524d/src/operations/exclude.d.ts#L227)

## exclude(excluded, iterable)

> **exclude**\<`Value`\>(`excluded`, `iterable`): `Iterable`\<`Value`, `any`,
> `any`\>

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

[exclude.d.ts:230](https://github.com/TomerAberbach/lfi/blob/c9ef1bf4d1040d7f49c52b70b358c019e55f524d/src/operations/exclude.d.ts#L230)
