[**lfi**](../readme.md) • **Docs**

***

[lfi](../globals.md) / mapAsyncReducer

# Function: mapAsyncReducer()

Returns an [AsyncReducer](../type-aliases/AsyncReducer.md) equivalent to `reducer` except its final
value is transformed using `fn`.

## mapAsyncReducer(fn, asyncReducer)

> **mapAsyncReducer**\<`Value`, `Acc`, `From`, `To`, `This`\>(`fn`, `asyncReducer`): [`AsyncReducer`](../type-aliases/AsyncReducer.md)\<`Value`, `Acc`, `To`\>

Returns an [AsyncReducer](../type-aliases/AsyncReducer.md) equivalent to `reducer` except its final
value is transformed using `fn`.

### Type Parameters

• **Value**

• **Acc**

• **From**

• **To**

• **This**

### Parameters

• **fn**

• **asyncReducer**: `Readonly`\<[`RawAsyncReducerWithFinish`](../type-aliases/RawAsyncReducerWithFinish.md)\<`Value`, `Acc`, `From`, `This`\>\>

### Returns

[`AsyncReducer`](../type-aliases/AsyncReducer.md)\<`Value`, `Acc`, `To`\>

### Defined in

[reducers.d.ts:309](https://github.com/TomerAberbach/lfi/blob/a3eb3a94b2928b5200a7bcd0a14fdc70f0cb5947/src/operations/reducers.d.ts#L309)

## mapAsyncReducer(fn)

> **mapAsyncReducer**\<`From`, `To`\>(`fn`): \<`Value`, `Acc`, `This`\>(`asyncReducer`) => [`AsyncReducer`](../type-aliases/AsyncReducer.md)\<`Value`, `Acc`, `To`\>

Returns an [AsyncReducer](../type-aliases/AsyncReducer.md) equivalent to `reducer` except its final
value is transformed using `fn`.

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

• **asyncReducer**: `Readonly`\<[`RawAsyncReducerWithFinish`](../type-aliases/RawAsyncReducerWithFinish.md)\<`Value`, `Acc`, `From`, `This`\>\>

#### Returns

[`AsyncReducer`](../type-aliases/AsyncReducer.md)\<`Value`, `Acc`, `To`\>

### Defined in

[reducers.d.ts:313](https://github.com/TomerAberbach/lfi/blob/a3eb3a94b2928b5200a7bcd0a14fdc70f0cb5947/src/operations/reducers.d.ts#L313)

## mapAsyncReducer(fn, asyncReducer)

> **mapAsyncReducer**\<`Value`, `From`, `To`, `This`\>(`fn`, `asyncReducer`): [`AsyncReducer`](../type-aliases/AsyncReducer.md)\<`Value`, `To`, `To`\>

Returns an [AsyncReducer](../type-aliases/AsyncReducer.md) equivalent to `reducer` except its final
value is transformed using `fn`.

### Type Parameters

• **Value**

• **From**

• **To**

• **This**

### Parameters

• **fn**

• **asyncReducer**: `Readonly`\<[`RawAsyncReducerWithoutFinish`](../type-aliases/RawAsyncReducerWithoutFinish.md)\<`Value`, `From`, `This`\>\>

### Returns

[`AsyncReducer`](../type-aliases/AsyncReducer.md)\<`Value`, `To`, `To`\>

### Defined in

[reducers.d.ts:319](https://github.com/TomerAberbach/lfi/blob/a3eb3a94b2928b5200a7bcd0a14fdc70f0cb5947/src/operations/reducers.d.ts#L319)

## mapAsyncReducer(fn)

> **mapAsyncReducer**\<`From`, `To`\>(`fn`): \<`Value`, `This`\>(`asyncReducer`) => [`AsyncReducer`](../type-aliases/AsyncReducer.md)\<`Value`, `To`, `To`\>

Returns an [AsyncReducer](../type-aliases/AsyncReducer.md) equivalent to `reducer` except its final
value is transformed using `fn`.

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

• **asyncReducer**: `Readonly`\<[`RawAsyncReducerWithoutFinish`](../type-aliases/RawAsyncReducerWithoutFinish.md)\<`Value`, `From`, `This`\>\>

#### Returns

[`AsyncReducer`](../type-aliases/AsyncReducer.md)\<`Value`, `To`, `To`\>

### Defined in

[reducers.d.ts:323](https://github.com/TomerAberbach/lfi/blob/a3eb3a94b2928b5200a7bcd0a14fdc70f0cb5947/src/operations/reducers.d.ts#L323)

## mapAsyncReducer(fn, asyncReducer)

> **mapAsyncReducer**\<`Value`, `From`, `To`, `This`\>(`fn`, `asyncReducer`): [`AsyncOptionalReducer`](../type-aliases/AsyncOptionalReducer.md)\<`Value`, `To`\>

Returns an [AsyncReducer](../type-aliases/AsyncReducer.md) equivalent to `reducer` except its final
value is transformed using `fn`.

### Type Parameters

• **Value**

• **From**

• **To**

• **This**

### Parameters

• **fn**

• **asyncReducer**: `Readonly`\<[`RawAsyncOptionalReducerWithFinish`](../type-aliases/RawAsyncOptionalReducerWithFinish.md)\<`Value`, `From`, `This`\>\>

### Returns

[`AsyncOptionalReducer`](../type-aliases/AsyncOptionalReducer.md)\<`Value`, `To`\>

### Defined in

[reducers.d.ts:329](https://github.com/TomerAberbach/lfi/blob/a3eb3a94b2928b5200a7bcd0a14fdc70f0cb5947/src/operations/reducers.d.ts#L329)

## mapAsyncReducer(fn)

> **mapAsyncReducer**\<`From`, `To`\>(`fn`): \<`Value`, `This`\>(`asyncReducer`) => [`AsyncOptionalReducer`](../type-aliases/AsyncOptionalReducer.md)\<`Value`, `To`\>

Returns an [AsyncReducer](../type-aliases/AsyncReducer.md) equivalent to `reducer` except its final
value is transformed using `fn`.

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

• **asyncReducer**: `Readonly`\<[`RawAsyncOptionalReducerWithFinish`](../type-aliases/RawAsyncOptionalReducerWithFinish.md)\<`Value`, `From`, `This`\>\>

#### Returns

[`AsyncOptionalReducer`](../type-aliases/AsyncOptionalReducer.md)\<`Value`, `To`\>

### Defined in

[reducers.d.ts:335](https://github.com/TomerAberbach/lfi/blob/a3eb3a94b2928b5200a7bcd0a14fdc70f0cb5947/src/operations/reducers.d.ts#L335)

## mapAsyncReducer(fn, asyncReducer)

> **mapAsyncReducer**\<`From`, `To`, `This`\>(`fn`, `asyncReducer`): [`AsyncOptionalReducer`](../type-aliases/AsyncOptionalReducer.md)\<`To`, `To`\>

Returns an [AsyncReducer](../type-aliases/AsyncReducer.md) equivalent to `reducer` except its final
value is transformed using `fn`.

### Type Parameters

• **From**

• **To**

• **This**

### Parameters

• **fn**

• **asyncReducer**: `Readonly`\<[`RawAsyncOptionalReducerWithoutFinish`](../type-aliases/RawAsyncOptionalReducerWithoutFinish.md)\<`From`, `This`\>\>

### Returns

[`AsyncOptionalReducer`](../type-aliases/AsyncOptionalReducer.md)\<`To`, `To`\>

### Defined in

[reducers.d.ts:343](https://github.com/TomerAberbach/lfi/blob/a3eb3a94b2928b5200a7bcd0a14fdc70f0cb5947/src/operations/reducers.d.ts#L343)

## mapAsyncReducer(fn)

> **mapAsyncReducer**\<`From`, `To`\>(`fn`): \<`This`\>(`asyncReducer`) => [`AsyncOptionalReducer`](../type-aliases/AsyncOptionalReducer.md)\<`To`, `To`\>

Returns an [AsyncReducer](../type-aliases/AsyncReducer.md) equivalent to `reducer` except its final
value is transformed using `fn`.

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

• **asyncReducer**: `Readonly`\<[`RawAsyncOptionalReducerWithoutFinish`](../type-aliases/RawAsyncOptionalReducerWithoutFinish.md)\<`From`, `This`\>\>

#### Returns

[`AsyncOptionalReducer`](../type-aliases/AsyncOptionalReducer.md)\<`To`, `To`\>

### Defined in

[reducers.d.ts:347](https://github.com/TomerAberbach/lfi/blob/a3eb3a94b2928b5200a7bcd0a14fdc70f0cb5947/src/operations/reducers.d.ts#L347)

## mapAsyncReducer(fn, asyncReducer)

> **mapAsyncReducer**\<`From`, `To`\>(`fn`, `asyncReducer`): [`AsyncOptionalReducer`](../type-aliases/AsyncOptionalReducer.md)\<`To`, `To`\>

Returns an [AsyncReducer](../type-aliases/AsyncReducer.md) equivalent to `reducer` except its final
value is transformed using `fn`.

### Type Parameters

• **From**

• **To**

### Parameters

• **fn**

• **asyncReducer**: [`AsyncFunctionReducer`](../type-aliases/AsyncFunctionReducer.md)\<`From`\>

### Returns

[`AsyncOptionalReducer`](../type-aliases/AsyncOptionalReducer.md)\<`To`, `To`\>

### Defined in

[reducers.d.ts:353](https://github.com/TomerAberbach/lfi/blob/a3eb3a94b2928b5200a7bcd0a14fdc70f0cb5947/src/operations/reducers.d.ts#L353)

## mapAsyncReducer(fn)

> **mapAsyncReducer**\<`From`, `To`\>(`fn`): (`asyncReducer`) => [`AsyncOptionalReducer`](../type-aliases/AsyncOptionalReducer.md)\<`To`, `To`\>

Returns an [AsyncReducer](../type-aliases/AsyncReducer.md) equivalent to `reducer` except its final
value is transformed using `fn`.

### Type Parameters

• **From**

• **To**

### Parameters

• **fn**

### Returns

`Function`

#### Parameters

• **asyncReducer**: [`AsyncFunctionReducer`](../type-aliases/AsyncFunctionReducer.md)\<`From`\>

#### Returns

[`AsyncOptionalReducer`](../type-aliases/AsyncOptionalReducer.md)\<`To`, `To`\>

### Defined in

[reducers.d.ts:357](https://github.com/TomerAberbach/lfi/blob/a3eb3a94b2928b5200a7bcd0a14fdc70f0cb5947/src/operations/reducers.d.ts#L357)
