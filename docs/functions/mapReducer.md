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

[reducers.d.ts:255](https://github.com/TomerAberbach/lfi/blob/a3eb3a94b2928b5200a7bcd0a14fdc70f0cb5947/src/operations/reducers.d.ts#L255)

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

[reducers.d.ts:259](https://github.com/TomerAberbach/lfi/blob/a3eb3a94b2928b5200a7bcd0a14fdc70f0cb5947/src/operations/reducers.d.ts#L259)

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

[reducers.d.ts:265](https://github.com/TomerAberbach/lfi/blob/a3eb3a94b2928b5200a7bcd0a14fdc70f0cb5947/src/operations/reducers.d.ts#L265)

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

[reducers.d.ts:269](https://github.com/TomerAberbach/lfi/blob/a3eb3a94b2928b5200a7bcd0a14fdc70f0cb5947/src/operations/reducers.d.ts#L269)

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

[reducers.d.ts:275](https://github.com/TomerAberbach/lfi/blob/a3eb3a94b2928b5200a7bcd0a14fdc70f0cb5947/src/operations/reducers.d.ts#L275)

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

[reducers.d.ts:279](https://github.com/TomerAberbach/lfi/blob/a3eb3a94b2928b5200a7bcd0a14fdc70f0cb5947/src/operations/reducers.d.ts#L279)

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

[reducers.d.ts:285](https://github.com/TomerAberbach/lfi/blob/a3eb3a94b2928b5200a7bcd0a14fdc70f0cb5947/src/operations/reducers.d.ts#L285)

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

[reducers.d.ts:289](https://github.com/TomerAberbach/lfi/blob/a3eb3a94b2928b5200a7bcd0a14fdc70f0cb5947/src/operations/reducers.d.ts#L289)

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

[reducers.d.ts:295](https://github.com/TomerAberbach/lfi/blob/a3eb3a94b2928b5200a7bcd0a14fdc70f0cb5947/src/operations/reducers.d.ts#L295)

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

[reducers.d.ts:299](https://github.com/TomerAberbach/lfi/blob/a3eb3a94b2928b5200a7bcd0a14fdc70f0cb5947/src/operations/reducers.d.ts#L299)
