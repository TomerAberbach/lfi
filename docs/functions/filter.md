[**lfi**](../readme.md) • **Docs**

***

[lfi](../globals.md) / filter

# Function: filter()

Returns an iterable that contains the values of `iterable` in iteration order
excluding the values for which `fn` returns a falsy value.

Like `Array.prototype.filter`, but for iterables.

## Example

```js
console.log(
  pipe(
    [`sloth party`, `building`, `sloths in trees`, `city`],
    filter(string => string.includes(`sloth`)),
    reduce(toArray()),
  ),
)
//=> [ 'sloth party', 'sloths in trees' ]
```

## filter(fn)

> **filter**\<`From`, `To`\>(`fn`): (`iterable`) => `Iterable`\<`To`, `any`, `any`\>

Returns an iterable that contains the values of `iterable` in iteration order
excluding the values for which `fn` returns a falsy value.

Like `Array.prototype.filter`, but for iterables.

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
    [`sloth party`, `building`, `sloths in trees`, `city`],
    filter(string => string.includes(`sloth`)),
    reduce(toArray()),
  ),
)
//=> [ 'sloth party', 'sloths in trees' ]
```

### Defined in

filters.d.ts:24

## filter(fn, iterable)

> **filter**\<`From`, `To`\>(`fn`, `iterable`): `Iterable`\<`To`, `any`, `any`\>

Returns an iterable that contains the values of `iterable` in iteration order
excluding the values for which `fn` returns a falsy value.

Like `Array.prototype.filter`, but for iterables.

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
    [`sloth party`, `building`, `sloths in trees`, `city`],
    filter(string => string.includes(`sloth`)),
    reduce(toArray()),
  ),
)
//=> [ 'sloth party', 'sloths in trees' ]
```

### Defined in

filters.d.ts:27

## filter(fn)

> **filter**\<`Value`\>(`fn`): (`iterable`) => `Iterable`\<`Value`, `any`, `any`\>

Returns an iterable that contains the values of `iterable` in iteration order
excluding the values for which `fn` returns a falsy value.

Like `Array.prototype.filter`, but for iterables.

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
    [`sloth party`, `building`, `sloths in trees`, `city`],
    filter(string => string.includes(`sloth`)),
    reduce(toArray()),
  ),
)
//=> [ 'sloth party', 'sloths in trees' ]
```

### Defined in

filters.d.ts:32

## filter(fn, iterable)

> **filter**\<`Value`\>(`fn`, `iterable`): `Iterable`\<`Value`, `any`, `any`\>

Returns an iterable that contains the values of `iterable` in iteration order
excluding the values for which `fn` returns a falsy value.

Like `Array.prototype.filter`, but for iterables.

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
    [`sloth party`, `building`, `sloths in trees`, `city`],
    filter(string => string.includes(`sloth`)),
    reduce(toArray()),
  ),
)
//=> [ 'sloth party', 'sloths in trees' ]
```

### Defined in

filters.d.ts:35
