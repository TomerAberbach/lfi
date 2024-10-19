[**lfi**](../readme.md) • **Docs**

---

[lfi](../globals.md) / flatMap

# Function: flatMap()

Returns an iterable containing the values of the iterables returned from
applying `fn` to each value of `iterable` in iteration order.

Like `Array.prototype.flatMap`, but for iterables.

## Example

```js
console.log(
  pipe(
    [`sloth`, `more sloth`, `even more sloth`],
    flatMap(string => [string, string.length]),
    reduce(toArray()),
  ),
)
//=> [ 'sloth', 5, 'more sloth', 10, 'even more sloth', 15 ]
```

## flatMap(fn)

> **flatMap**\<`From`, `To`\>(`fn`): (`iterable`) => `Iterable`\<`To`, `any`,
> `any`\>

Returns an iterable containing the values of the iterables returned from
applying `fn` to each value of `iterable` in iteration order.

Like `Array.prototype.flatMap`, but for iterables.

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
    flatMap(string => [string, string.length]),
    reduce(toArray()),
  ),
)
//=> [ 'sloth', 5, 'more sloth', 10, 'even more sloth', 15 ]
```

### Defined in

[transform.d.ts:104](https://github.com/TomerAberbach/lfi/blob/c9ef1bf4d1040d7f49c52b70b358c019e55f524d/src/operations/transform.d.ts#L104)

## flatMap(fn, iterable)

> **flatMap**\<`From`, `To`\>(`fn`, `iterable`): `Iterable`\<`To`, `any`,
> `any`\>

Returns an iterable containing the values of the iterables returned from
applying `fn` to each value of `iterable` in iteration order.

Like `Array.prototype.flatMap`, but for iterables.

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
    flatMap(string => [string, string.length]),
    reduce(toArray()),
  ),
)
//=> [ 'sloth', 5, 'more sloth', 10, 'even more sloth', 15 ]
```

### Defined in

[transform.d.ts:107](https://github.com/TomerAberbach/lfi/blob/c9ef1bf4d1040d7f49c52b70b358c019e55f524d/src/operations/transform.d.ts#L107)
