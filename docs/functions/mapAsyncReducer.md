[**lfi**](../readme.md) • **Docs**

---

[lfi](../globals.md) / mapAsyncReducer

# Function: mapAsyncReducer()

Returns an [AsyncReducer](../type-aliases/AsyncReducer.md) equivalent to
`reducer` except its final value is transformed using `fn`.

## mapAsyncReducer(fn, asyncReducer)

> **mapAsyncReducer**\<`Value`, `Acc`, `From`, `To`, `This`\>(`fn`,
> `asyncReducer`): [`AsyncReducer`](../type-aliases/AsyncReducer.md)\<`Value`,
> `Acc`, `To`\>

Returns an [AsyncReducer](../type-aliases/AsyncReducer.md) equivalent to
`reducer` except its final value is transformed using `fn`.

### Type Parameters

• **Value**

• **Acc**

• **From**

• **To**

• **This**

### Parameters

• **fn**

• **asyncReducer**:
`Readonly`\<[`RawAsyncReducerWithFinish`](../type-aliases/RawAsyncReducerWithFinish.md)\<`Value`,
`Acc`, `From`, `This`\>\>

### Returns

[`AsyncReducer`](../type-aliases/AsyncReducer.md)\<`Value`, `Acc`, `To`\>

### Defined in

[reducer.d.ts:307](https://github.com/TomerAberbach/lfi/blob/dd796c78d3ff68ae7bf4a0272b3cbeca688438e7/src/operations/reducer.d.ts#L307)

## mapAsyncReducer(fn)

> **mapAsyncReducer**\<`From`, `To`\>(`fn`): \<`Value`, `Acc`,
> `This`\>(`asyncReducer`) =>
> [`AsyncReducer`](../type-aliases/AsyncReducer.md)\<`Value`, `Acc`, `To`\>

Returns an [AsyncReducer](../type-aliases/AsyncReducer.md) equivalent to
`reducer` except its final value is transformed using `fn`.

### Type Parameters

• **From**

• **To**

### Parameters

• **fn**

### Returns

`Function`

#### Type Parameters

• **Value**

• **Acc**

• **This**

#### Parameters

• **asyncReducer**:
`Readonly`\<[`RawAsyncReducerWithFinish`](../type-aliases/RawAsyncReducerWithFinish.md)\<`Value`,
`Acc`, `From`, `This`\>\>

#### Returns

[`AsyncReducer`](../type-aliases/AsyncReducer.md)\<`Value`, `Acc`, `To`\>

### Defined in

[reducer.d.ts:311](https://github.com/TomerAberbach/lfi/blob/dd796c78d3ff68ae7bf4a0272b3cbeca688438e7/src/operations/reducer.d.ts#L311)

## mapAsyncReducer(fn, asyncReducer)

> **mapAsyncReducer**\<`Value`, `From`, `To`, `This`\>(`fn`, `asyncReducer`):
> [`AsyncReducer`](../type-aliases/AsyncReducer.md)\<`Value`, `To`, `To`\>

Returns an [AsyncReducer](../type-aliases/AsyncReducer.md) equivalent to
`reducer` except its final value is transformed using `fn`.

### Type Parameters

• **Value**

• **From**

• **To**

• **This**

### Parameters

• **fn**

• **asyncReducer**:
`Readonly`\<[`RawAsyncReducerWithoutFinish`](../type-aliases/RawAsyncReducerWithoutFinish.md)\<`Value`,
`From`, `This`\>\>

### Returns

[`AsyncReducer`](../type-aliases/AsyncReducer.md)\<`Value`, `To`, `To`\>

### Defined in

[reducer.d.ts:317](https://github.com/TomerAberbach/lfi/blob/dd796c78d3ff68ae7bf4a0272b3cbeca688438e7/src/operations/reducer.d.ts#L317)

## mapAsyncReducer(fn)

> **mapAsyncReducer**\<`From`, `To`\>(`fn`): \<`Value`, `This`\>(`asyncReducer`)
> => [`AsyncReducer`](../type-aliases/AsyncReducer.md)\<`Value`, `To`, `To`\>

Returns an [AsyncReducer](../type-aliases/AsyncReducer.md) equivalent to
`reducer` except its final value is transformed using `fn`.

### Type Parameters

• **From**

• **To**

### Parameters

• **fn**

### Returns

`Function`

#### Type Parameters

• **Value**

• **This**

#### Parameters

• **asyncReducer**:
`Readonly`\<[`RawAsyncReducerWithoutFinish`](../type-aliases/RawAsyncReducerWithoutFinish.md)\<`Value`,
`From`, `This`\>\>

#### Returns

[`AsyncReducer`](../type-aliases/AsyncReducer.md)\<`Value`, `To`, `To`\>

### Defined in

[reducer.d.ts:321](https://github.com/TomerAberbach/lfi/blob/dd796c78d3ff68ae7bf4a0272b3cbeca688438e7/src/operations/reducer.d.ts#L321)

## mapAsyncReducer(fn, asyncReducer)

> **mapAsyncReducer**\<`Value`, `From`, `To`, `This`\>(`fn`, `asyncReducer`):
> [`AsyncOptionalReducer`](../type-aliases/AsyncOptionalReducer.md)\<`Value`,
> `To`\>

Returns an [AsyncReducer](../type-aliases/AsyncReducer.md) equivalent to
`reducer` except its final value is transformed using `fn`.

### Type Parameters

• **Value**

• **From**

• **To**

• **This**

### Parameters

• **fn**

• **asyncReducer**:
`Readonly`\<[`RawAsyncOptionalReducerWithFinish`](../type-aliases/RawAsyncOptionalReducerWithFinish.md)\<`Value`,
`From`, `This`\>\>

### Returns

[`AsyncOptionalReducer`](../type-aliases/AsyncOptionalReducer.md)\<`Value`,
`To`\>

### Defined in

[reducer.d.ts:327](https://github.com/TomerAberbach/lfi/blob/dd796c78d3ff68ae7bf4a0272b3cbeca688438e7/src/operations/reducer.d.ts#L327)

## mapAsyncReducer(fn)

> **mapAsyncReducer**\<`From`, `To`\>(`fn`): \<`Value`, `This`\>(`asyncReducer`)
> => [`AsyncOptionalReducer`](../type-aliases/AsyncOptionalReducer.md)\<`Value`,
> `To`\>

Returns an [AsyncReducer](../type-aliases/AsyncReducer.md) equivalent to
`reducer` except its final value is transformed using `fn`.

### Type Parameters

• **From**

• **To**

### Parameters

• **fn**

### Returns

`Function`

#### Type Parameters

• **Value**

• **This**

#### Parameters

• **asyncReducer**:
`Readonly`\<[`RawAsyncOptionalReducerWithFinish`](../type-aliases/RawAsyncOptionalReducerWithFinish.md)\<`Value`,
`From`, `This`\>\>

#### Returns

[`AsyncOptionalReducer`](../type-aliases/AsyncOptionalReducer.md)\<`Value`,
`To`\>

### Defined in

[reducer.d.ts:333](https://github.com/TomerAberbach/lfi/blob/dd796c78d3ff68ae7bf4a0272b3cbeca688438e7/src/operations/reducer.d.ts#L333)

## mapAsyncReducer(fn, asyncReducer)

> **mapAsyncReducer**\<`From`, `To`, `This`\>(`fn`, `asyncReducer`):
> [`AsyncOptionalReducer`](../type-aliases/AsyncOptionalReducer.md)\<`To`,
> `To`\>

Returns an [AsyncReducer](../type-aliases/AsyncReducer.md) equivalent to
`reducer` except its final value is transformed using `fn`.

### Type Parameters

• **From**

• **To**

• **This**

### Parameters

• **fn**

• **asyncReducer**:
`Readonly`\<[`RawAsyncOptionalReducerWithoutFinish`](../type-aliases/RawAsyncOptionalReducerWithoutFinish.md)\<`From`,
`This`\>\>

### Returns

[`AsyncOptionalReducer`](../type-aliases/AsyncOptionalReducer.md)\<`To`, `To`\>

### Defined in

[reducer.d.ts:341](https://github.com/TomerAberbach/lfi/blob/dd796c78d3ff68ae7bf4a0272b3cbeca688438e7/src/operations/reducer.d.ts#L341)

## mapAsyncReducer(fn)

> **mapAsyncReducer**\<`From`, `To`\>(`fn`): \<`This`\>(`asyncReducer`) =>
> [`AsyncOptionalReducer`](../type-aliases/AsyncOptionalReducer.md)\<`To`,
> `To`\>

Returns an [AsyncReducer](../type-aliases/AsyncReducer.md) equivalent to
`reducer` except its final value is transformed using `fn`.

### Type Parameters

• **From**

• **To**

### Parameters

• **fn**

### Returns

`Function`

#### Type Parameters

• **This**

#### Parameters

• **asyncReducer**:
`Readonly`\<[`RawAsyncOptionalReducerWithoutFinish`](../type-aliases/RawAsyncOptionalReducerWithoutFinish.md)\<`From`,
`This`\>\>

#### Returns

[`AsyncOptionalReducer`](../type-aliases/AsyncOptionalReducer.md)\<`To`, `To`\>

### Defined in

[reducer.d.ts:345](https://github.com/TomerAberbach/lfi/blob/dd796c78d3ff68ae7bf4a0272b3cbeca688438e7/src/operations/reducer.d.ts#L345)

## mapAsyncReducer(fn, asyncReducer)

> **mapAsyncReducer**\<`From`, `To`\>(`fn`, `asyncReducer`):
> [`AsyncOptionalReducer`](../type-aliases/AsyncOptionalReducer.md)\<`To`,
> `To`\>

Returns an [AsyncReducer](../type-aliases/AsyncReducer.md) equivalent to
`reducer` except its final value is transformed using `fn`.

### Type Parameters

• **From**

• **To**

### Parameters

• **fn**

• **asyncReducer**:
[`AsyncFunctionReducer`](../type-aliases/AsyncFunctionReducer.md)\<`From`\>

### Returns

[`AsyncOptionalReducer`](../type-aliases/AsyncOptionalReducer.md)\<`To`, `To`\>

### Defined in

[reducer.d.ts:351](https://github.com/TomerAberbach/lfi/blob/dd796c78d3ff68ae7bf4a0272b3cbeca688438e7/src/operations/reducer.d.ts#L351)

## mapAsyncReducer(fn)

> **mapAsyncReducer**\<`From`, `To`\>(`fn`): (`asyncReducer`) =>
> [`AsyncOptionalReducer`](../type-aliases/AsyncOptionalReducer.md)\<`To`,
> `To`\>

Returns an [AsyncReducer](../type-aliases/AsyncReducer.md) equivalent to
`reducer` except its final value is transformed using `fn`.

### Type Parameters

• **From**

• **To**

### Parameters

• **fn**

### Returns

`Function`

#### Parameters

• **asyncReducer**:
[`AsyncFunctionReducer`](../type-aliases/AsyncFunctionReducer.md)\<`From`\>

#### Returns

[`AsyncOptionalReducer`](../type-aliases/AsyncOptionalReducer.md)\<`To`, `To`\>

### Defined in

[reducer.d.ts:355](https://github.com/TomerAberbach/lfi/blob/dd796c78d3ff68ae7bf4a0272b3cbeca688438e7/src/operations/reducer.d.ts#L355)
