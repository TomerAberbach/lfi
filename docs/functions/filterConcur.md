[**lfi**](../readme.md) • **Docs**

***

[lfi](../globals.md) / filterConcur

# Function: filterConcur()

Returns a concur iterable that contains the values of `concurIterable`
excluding the values for which `fn` returns a value awaitable to a falsy
value.

Like `Array.prototype.filter`, but for concur iterables.

## Example

```js
console.log(
  await pipe(
    asConcur([`sloth party`, `building`, `sloths in trees`, `city`]),
    filterConcur(string => string.includes(`sloth`)),
    reduceConcur(toArray()),
  ),
)
//=> [ 'sloth party', 'sloths in trees' ]
```

## filterConcur(fn)

> **filterConcur**\<`From`, `To`\>(`fn`): (`concurIterable`) => [`ConcurIterable`](../type-aliases/ConcurIterable.md)\<`To`\>

Returns a concur iterable that contains the values of `concurIterable`
excluding the values for which `fn` returns a value awaitable to a falsy
value.

Like `Array.prototype.filter`, but for concur iterables.

### Type Parameters

• **From**

• **To**

### Parameters

• **fn**

### Returns

`Function`

#### Parameters

• **concurIterable**: [`ConcurIterable`](../type-aliases/ConcurIterable.md)\<`From`\>

#### Returns

[`ConcurIterable`](../type-aliases/ConcurIterable.md)\<`To`\>

### Example

```js
console.log(
  await pipe(
    asConcur([`sloth party`, `building`, `sloths in trees`, `city`]),
    filterConcur(string => string.includes(`sloth`)),
    reduceConcur(toArray()),
  ),
)
//=> [ 'sloth party', 'sloths in trees' ]
```

### Defined in

filters.d.ts:98

## filterConcur(fn, concurIterable)

> **filterConcur**\<`From`, `To`\>(`fn`, `concurIterable`): [`ConcurIterable`](../type-aliases/ConcurIterable.md)\<`To`\>

Returns a concur iterable that contains the values of `concurIterable`
excluding the values for which `fn` returns a value awaitable to a falsy
value.

Like `Array.prototype.filter`, but for concur iterables.

### Type Parameters

• **From**

• **To**

### Parameters

• **fn**

• **concurIterable**: [`ConcurIterable`](../type-aliases/ConcurIterable.md)\<`From`\>

### Returns

[`ConcurIterable`](../type-aliases/ConcurIterable.md)\<`To`\>

### Example

```js
console.log(
  await pipe(
    asConcur([`sloth party`, `building`, `sloths in trees`, `city`]),
    filterConcur(string => string.includes(`sloth`)),
    reduceConcur(toArray()),
  ),
)
//=> [ 'sloth party', 'sloths in trees' ]
```

### Defined in

filters.d.ts:101

## filterConcur(fn)

> **filterConcur**\<`Value`\>(`fn`): (`concurIterable`) => [`ConcurIterable`](../type-aliases/ConcurIterable.md)\<`Value`\>

Returns a concur iterable that contains the values of `concurIterable`
excluding the values for which `fn` returns a value awaitable to a falsy
value.

Like `Array.prototype.filter`, but for concur iterables.

### Type Parameters

• **Value**

### Parameters

• **fn**

### Returns

`Function`

#### Parameters

• **concurIterable**: [`ConcurIterable`](../type-aliases/ConcurIterable.md)\<`Value`\>

#### Returns

[`ConcurIterable`](../type-aliases/ConcurIterable.md)\<`Value`\>

### Example

```js
console.log(
  await pipe(
    asConcur([`sloth party`, `building`, `sloths in trees`, `city`]),
    filterConcur(string => string.includes(`sloth`)),
    reduceConcur(toArray()),
  ),
)
//=> [ 'sloth party', 'sloths in trees' ]
```

### Defined in

filters.d.ts:106

## filterConcur(fn, concurIterable)

> **filterConcur**\<`Value`\>(`fn`, `concurIterable`): [`ConcurIterable`](../type-aliases/ConcurIterable.md)\<`Value`\>

Returns a concur iterable that contains the values of `concurIterable`
excluding the values for which `fn` returns a value awaitable to a falsy
value.

Like `Array.prototype.filter`, but for concur iterables.

### Type Parameters

• **Value**

### Parameters

• **fn**

• **concurIterable**: [`ConcurIterable`](../type-aliases/ConcurIterable.md)\<`Value`\>

### Returns

[`ConcurIterable`](../type-aliases/ConcurIterable.md)\<`Value`\>

### Example

```js
console.log(
  await pipe(
    asConcur([`sloth party`, `building`, `sloths in trees`, `city`]),
    filterConcur(string => string.includes(`sloth`)),
    reduceConcur(toArray()),
  ),
)
//=> [ 'sloth party', 'sloths in trees' ]
```

### Defined in

filters.d.ts:109
