[**lfi**](../readme.md) • **Docs**

***

[lfi](../globals.md) / mapReducer

# Function: mapReducer()

Returns a [Reducer](../type-aliases/Reducer.md) or [OptionalReducer](../type-aliases/OptionalReducer.md) equivalent to `reducer`
except its final value is transformed using `fn`.

## mapReducer(fn, reducer)

> **mapReducer**\<`Value`, `Acc`, `From`, `To`, `This`\>(`fn`, `reducer`): [`Reducer`](../type-aliases/Reducer.md)\<`Value`, `Acc`, `To`\>

Returns a [Reducer](../type-aliases/Reducer.md) or [OptionalReducer](../type-aliases/OptionalReducer.md) equivalent to `reducer`
except its final value is transformed using `fn`.

### Type Parameters

• **Value**

• **Acc**

• **From**

• **To**

• **This**

### Parameters

• **fn**

• **reducer**: `Readonly`\<[`RawReducerWithFinish`](../type-aliases/RawReducerWithFinish.md)\<`Value`, `Acc`, `From`, `This`\>\>

### Returns

[`Reducer`](../type-aliases/Reducer.md)\<`Value`, `Acc`, `To`\>

### Defined in

[reducer.d.ts:253](https://github.com/TomerAberbach/lfi/blob/d7a0f90dd72245d6efd6bd97c58a78b3f3028f25/src/operations/reducer.d.ts#L253)

## mapReducer(fn)

> **mapReducer**\<`From`, `To`\>(`fn`): \<`Value`, `Acc`, `This`\>(`reducer`) => [`Reducer`](../type-aliases/Reducer.md)\<`Value`, `Acc`, `To`\>

Returns a [Reducer](../type-aliases/Reducer.md) or [OptionalReducer](../type-aliases/OptionalReducer.md) equivalent to `reducer`
except its final value is transformed using `fn`.

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

• **reducer**: `Readonly`\<[`RawReducerWithFinish`](../type-aliases/RawReducerWithFinish.md)\<`Value`, `Acc`, `From`, `This`\>\>

#### Returns

[`Reducer`](../type-aliases/Reducer.md)\<`Value`, `Acc`, `To`\>

### Defined in

[reducer.d.ts:257](https://github.com/TomerAberbach/lfi/blob/d7a0f90dd72245d6efd6bd97c58a78b3f3028f25/src/operations/reducer.d.ts#L257)

## mapReducer(fn, reducer)

> **mapReducer**\<`Value`, `From`, `To`, `This`\>(`fn`, `reducer`): [`Reducer`](../type-aliases/Reducer.md)\<`Value`, `To`, `To`\>

Returns a [Reducer](../type-aliases/Reducer.md) or [OptionalReducer](../type-aliases/OptionalReducer.md) equivalent to `reducer`
except its final value is transformed using `fn`.

### Type Parameters

• **Value**

• **From**

• **To**

• **This**

### Parameters

• **fn**

• **reducer**: `Readonly`\<[`RawReducerWithoutFinish`](../type-aliases/RawReducerWithoutFinish.md)\<`Value`, `From`, `This`\>\>

### Returns

[`Reducer`](../type-aliases/Reducer.md)\<`Value`, `To`, `To`\>

### Defined in

[reducer.d.ts:263](https://github.com/TomerAberbach/lfi/blob/d7a0f90dd72245d6efd6bd97c58a78b3f3028f25/src/operations/reducer.d.ts#L263)

## mapReducer(fn)

> **mapReducer**\<`From`, `To`\>(`fn`): \<`Value`, `This`\>(`reducer`) => [`Reducer`](../type-aliases/Reducer.md)\<`Value`, `To`, `To`\>

Returns a [Reducer](../type-aliases/Reducer.md) or [OptionalReducer](../type-aliases/OptionalReducer.md) equivalent to `reducer`
except its final value is transformed using `fn`.

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

• **reducer**: `Readonly`\<[`RawReducerWithoutFinish`](../type-aliases/RawReducerWithoutFinish.md)\<`Value`, `From`, `This`\>\>

#### Returns

[`Reducer`](../type-aliases/Reducer.md)\<`Value`, `To`, `To`\>

### Defined in

[reducer.d.ts:267](https://github.com/TomerAberbach/lfi/blob/d7a0f90dd72245d6efd6bd97c58a78b3f3028f25/src/operations/reducer.d.ts#L267)

## mapReducer(fn, reducer)

> **mapReducer**\<`Value`, `From`, `To`, `This`\>(`fn`, `reducer`): [`OptionalReducer`](../type-aliases/OptionalReducer.md)\<`Value`, `To`\>

Returns a [Reducer](../type-aliases/Reducer.md) or [OptionalReducer](../type-aliases/OptionalReducer.md) equivalent to `reducer`
except its final value is transformed using `fn`.

### Type Parameters

• **Value**

• **From**

• **To**

• **This**

### Parameters

• **fn**

• **reducer**: `Readonly`\<[`RawOptionalReducerWithFinish`](../type-aliases/RawOptionalReducerWithFinish.md)\<`Value`, `From`, `This`\>\>

### Returns

[`OptionalReducer`](../type-aliases/OptionalReducer.md)\<`Value`, `To`\>

### Defined in

[reducer.d.ts:273](https://github.com/TomerAberbach/lfi/blob/d7a0f90dd72245d6efd6bd97c58a78b3f3028f25/src/operations/reducer.d.ts#L273)

## mapReducer(fn)

> **mapReducer**\<`From`, `To`\>(`fn`): \<`Value`, `This`\>(`reducer`) => [`OptionalReducer`](../type-aliases/OptionalReducer.md)\<`Value`, `To`\>

Returns a [Reducer](../type-aliases/Reducer.md) or [OptionalReducer](../type-aliases/OptionalReducer.md) equivalent to `reducer`
except its final value is transformed using `fn`.

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

• **reducer**: `Readonly`\<[`RawOptionalReducerWithFinish`](../type-aliases/RawOptionalReducerWithFinish.md)\<`Value`, `From`, `This`\>\>

#### Returns

[`OptionalReducer`](../type-aliases/OptionalReducer.md)\<`Value`, `To`\>

### Defined in

[reducer.d.ts:277](https://github.com/TomerAberbach/lfi/blob/d7a0f90dd72245d6efd6bd97c58a78b3f3028f25/src/operations/reducer.d.ts#L277)

## mapReducer(fn, reducer)

> **mapReducer**\<`From`, `To`, `This`\>(`fn`, `reducer`): [`OptionalReducer`](../type-aliases/OptionalReducer.md)\<`To`, `To`\>

Returns a [Reducer](../type-aliases/Reducer.md) or [OptionalReducer](../type-aliases/OptionalReducer.md) equivalent to `reducer`
except its final value is transformed using `fn`.

### Type Parameters

• **From**

• **To**

• **This**

### Parameters

• **fn**

• **reducer**: `Readonly`\<[`RawOptionalReducerWithoutFinish`](../type-aliases/RawOptionalReducerWithoutFinish.md)\<`From`, `This`\>\>

### Returns

[`OptionalReducer`](../type-aliases/OptionalReducer.md)\<`To`, `To`\>

### Defined in

[reducer.d.ts:283](https://github.com/TomerAberbach/lfi/blob/d7a0f90dd72245d6efd6bd97c58a78b3f3028f25/src/operations/reducer.d.ts#L283)

## mapReducer(fn)

> **mapReducer**\<`From`, `To`\>(`fn`): \<`This`\>(`reducer`) => [`OptionalReducer`](../type-aliases/OptionalReducer.md)\<`To`, `To`\>

Returns a [Reducer](../type-aliases/Reducer.md) or [OptionalReducer](../type-aliases/OptionalReducer.md) equivalent to `reducer`
except its final value is transformed using `fn`.

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

• **reducer**: `Readonly`\<[`RawOptionalReducerWithoutFinish`](../type-aliases/RawOptionalReducerWithoutFinish.md)\<`From`, `This`\>\>

#### Returns

[`OptionalReducer`](../type-aliases/OptionalReducer.md)\<`To`, `To`\>

### Defined in

[reducer.d.ts:287](https://github.com/TomerAberbach/lfi/blob/d7a0f90dd72245d6efd6bd97c58a78b3f3028f25/src/operations/reducer.d.ts#L287)

## mapReducer(fn, reducer)

> **mapReducer**\<`From`, `To`\>(`fn`, `reducer`): [`OptionalReducer`](../type-aliases/OptionalReducer.md)\<`To`, `To`\>

Returns a [Reducer](../type-aliases/Reducer.md) or [OptionalReducer](../type-aliases/OptionalReducer.md) equivalent to `reducer`
except its final value is transformed using `fn`.

### Type Parameters

• **From**

• **To**

### Parameters

• **fn**

• **reducer**: [`FunctionReducer`](../type-aliases/FunctionReducer.md)\<`From`\>

### Returns

[`OptionalReducer`](../type-aliases/OptionalReducer.md)\<`To`, `To`\>

### Defined in

[reducer.d.ts:293](https://github.com/TomerAberbach/lfi/blob/d7a0f90dd72245d6efd6bd97c58a78b3f3028f25/src/operations/reducer.d.ts#L293)

## mapReducer(fn)

> **mapReducer**\<`From`, `To`\>(`fn`): (`reducer`) => [`OptionalReducer`](../type-aliases/OptionalReducer.md)\<`To`, `To`\>

Returns a [Reducer](../type-aliases/Reducer.md) or [OptionalReducer](../type-aliases/OptionalReducer.md) equivalent to `reducer`
except its final value is transformed using `fn`.

### Type Parameters

• **From**

• **To**

### Parameters

• **fn**

### Returns

`Function`

#### Parameters

• **reducer**: [`FunctionReducer`](../type-aliases/FunctionReducer.md)\<`From`\>

#### Returns

[`OptionalReducer`](../type-aliases/OptionalReducer.md)\<`To`, `To`\>

### Defined in

[reducer.d.ts:297](https://github.com/TomerAberbach/lfi/blob/d7a0f90dd72245d6efd6bd97c58a78b3f3028f25/src/operations/reducer.d.ts#L297)
