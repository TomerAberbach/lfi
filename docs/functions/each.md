[**lfi**](../readme.md) • **Docs**

***

[lfi](../globals.md) / each

# Function: each()

Returns an iterable equivalent to `iterable` that applies `fn` to each value
of `iterable` as it is iterated.

## Example

```js
const sloths = [`carl`, `frank`, `phil`]

console.log([...each(console.log, sloths)])
//=> carl
//=> frank
//=> phil
//=> [ 'carl', 'frank', 'phil' ]
```

## each(fn)

> **each**\<`From`, `To`\>(`fn`): (`iterable`) => `Iterable`\<`To`, `any`, `any`\>

Returns an iterable equivalent to `iterable` that applies `fn` to each value
of `iterable` as it is iterated.

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
const sloths = [`carl`, `frank`, `phil`]

console.log([...each(console.log, sloths)])
//=> carl
//=> frank
//=> phil
//=> [ 'carl', 'frank', 'phil' ]
```

### Defined in

side-effects.d.ts:20

## each(fn, iterable)

> **each**\<`From`, `To`\>(`fn`, `iterable`): `Iterable`\<`To`, `any`, `any`\>

Returns an iterable equivalent to `iterable` that applies `fn` to each value
of `iterable` as it is iterated.

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
const sloths = [`carl`, `frank`, `phil`]

console.log([...each(console.log, sloths)])
//=> carl
//=> frank
//=> phil
//=> [ 'carl', 'frank', 'phil' ]
```

### Defined in

side-effects.d.ts:23

## each(fn)

> **each**\<`Value`\>(`fn`): (`iterable`) => `Iterable`\<`Value`, `any`, `any`\>

Returns an iterable equivalent to `iterable` that applies `fn` to each value
of `iterable` as it is iterated.

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
const sloths = [`carl`, `frank`, `phil`]

console.log([...each(console.log, sloths)])
//=> carl
//=> frank
//=> phil
//=> [ 'carl', 'frank', 'phil' ]
```

### Defined in

side-effects.d.ts:28

## each(fn, iterable)

> **each**\<`Value`\>(`fn`, `iterable`): `Iterable`\<`Value`, `any`, `any`\>

Returns an iterable equivalent to `iterable` that applies `fn` to each value
of `iterable` as it is iterated.

### Type Parameters

• **Value**

### Parameters

• **fn**

• **iterable**: `Iterable`\<`Value`, `any`, `any`\>

### Returns

`Iterable`\<`Value`, `any`, `any`\>

### Example

```js
const sloths = [`carl`, `frank`, `phil`]

console.log([...each(console.log, sloths)])
//=> carl
//=> frank
//=> phil
//=> [ 'carl', 'frank', 'phil' ]
```

### Defined in

side-effects.d.ts:31
