[**lfi**](../readme.md) • **Docs**

---

[lfi](../globals.md) / each

# Function: each()

Returns an iterable equivalent to `iterable` that applies `fn` to each value of
`iterable` as it is iterated.

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

> **each**\<`From`, `To`\>(`fn`): (`iterable`) => `Iterable`\<`To`, `any`,
> `any`\>

Returns an iterable equivalent to `iterable` that applies `fn` to each value of
`iterable` as it is iterated.

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

[iterate.d.ts:20](https://github.com/TomerAberbach/lfi/blob/85d6360ac7d8f71c70f308d2ace5bc2aa99ab03d/src/operations/iterate.d.ts#L20)

## each(fn, iterable)

> **each**\<`From`, `To`\>(`fn`, `iterable`): `Iterable`\<`To`, `any`, `any`\>

Returns an iterable equivalent to `iterable` that applies `fn` to each value of
`iterable` as it is iterated.

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

[iterate.d.ts:23](https://github.com/TomerAberbach/lfi/blob/85d6360ac7d8f71c70f308d2ace5bc2aa99ab03d/src/operations/iterate.d.ts#L23)

## each(fn)

> **each**\<`Value`\>(`fn`): (`iterable`) => `Iterable`\<`Value`, `any`, `any`\>

Returns an iterable equivalent to `iterable` that applies `fn` to each value of
`iterable` as it is iterated.

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

[iterate.d.ts:28](https://github.com/TomerAberbach/lfi/blob/85d6360ac7d8f71c70f308d2ace5bc2aa99ab03d/src/operations/iterate.d.ts#L28)

## each(fn, iterable)

> **each**\<`Value`\>(`fn`, `iterable`): `Iterable`\<`Value`, `any`, `any`\>

Returns an iterable equivalent to `iterable` that applies `fn` to each value of
`iterable` as it is iterated.

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

[iterate.d.ts:31](https://github.com/TomerAberbach/lfi/blob/85d6360ac7d8f71c70f308d2ace5bc2aa99ab03d/src/operations/iterate.d.ts#L31)
