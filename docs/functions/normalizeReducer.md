[**lfi**](../readme.md) • **Docs**

***

[lfi](../globals.md) / normalizeReducer

# Function: normalizeReducer()

Returns a non-raw version of `reducer`.

## normalizeReducer(reducer)

> **normalizeReducer**\<`Key`, `Value`, `Acc`, `This`\>(`reducer`): [`KeyedReducer`](../type-aliases/KeyedReducer.md)\<`Key`, `Value`, `Acc`\>

Returns a non-raw version of `reducer`.

### Type Parameters

• **Key**

• **Value**

• **Acc**

• **This**

### Parameters

• **reducer**: `Readonly`\<[`RawKeyedReducer`](../type-aliases/RawKeyedReducer.md)\<`Key`, `Value`, `Acc`, `This`\>\>

### Returns

[`KeyedReducer`](../type-aliases/KeyedReducer.md)\<`Key`, `Value`, `Acc`\>

### Defined in

reducers.d.ts:364

## normalizeReducer(reducer)

> **normalizeReducer**\<`Value`, `Acc`, `Finished`, `This`\>(`reducer`): [`Reducer`](../type-aliases/Reducer.md)\<`Value`, `Acc`, `Finished`\>

Returns a non-raw version of `reducer`.

### Type Parameters

• **Value**

• **Acc**

• **Finished**

• **This**

### Parameters

• **reducer**: `Readonly`\<[`RawReducerWithFinish`](../type-aliases/RawReducerWithFinish.md)\<`Value`, `Acc`, `Finished`, `This`\>\>

### Returns

[`Reducer`](../type-aliases/Reducer.md)\<`Value`, `Acc`, `Finished`\>

### Defined in

reducers.d.ts:367

## normalizeReducer(reducer)

> **normalizeReducer**\<`Value`, `Acc`, `This`\>(`reducer`): [`Reducer`](../type-aliases/Reducer.md)\<`Value`, `Acc`, `Acc`\>

Returns a non-raw version of `reducer`.

### Type Parameters

• **Value**

• **Acc**

• **This**

### Parameters

• **reducer**: `Readonly`\<[`RawReducerWithoutFinish`](../type-aliases/RawReducerWithoutFinish.md)\<`Value`, `Acc`, `This`\>\>

### Returns

[`Reducer`](../type-aliases/Reducer.md)\<`Value`, `Acc`, `Acc`\>

### Defined in

reducers.d.ts:370

## normalizeReducer(reducer)

> **normalizeReducer**\<`Value`, `Finished`, `This`\>(`reducer`): [`OptionalReducer`](../type-aliases/OptionalReducer.md)\<`Value`, `Finished`\>

Returns a non-raw version of `reducer`.

### Type Parameters

• **Value**

• **Finished**

• **This**

### Parameters

• **reducer**: `Readonly`\<[`RawOptionalReducerWithFinish`](../type-aliases/RawOptionalReducerWithFinish.md)\<`Value`, `Finished`, `This`\>\>

### Returns

[`OptionalReducer`](../type-aliases/OptionalReducer.md)\<`Value`, `Finished`\>

### Defined in

reducers.d.ts:373

## normalizeReducer(reducer)

> **normalizeReducer**\<`Value`, `This`\>(`reducer`): [`OptionalReducer`](../type-aliases/OptionalReducer.md)\<`Value`, `Value`\>

Returns a non-raw version of `reducer`.

### Type Parameters

• **Value**

• **This**

### Parameters

• **reducer**: `Readonly`\<[`RawOptionalReducerWithoutFinish`](../type-aliases/RawOptionalReducerWithoutFinish.md)\<`Value`, `This`\>\>

### Returns

[`OptionalReducer`](../type-aliases/OptionalReducer.md)\<`Value`, `Value`\>

### Defined in

reducers.d.ts:376

## normalizeReducer(reducer)

> **normalizeReducer**\<`Value`\>(`reducer`): [`OptionalReducer`](../type-aliases/OptionalReducer.md)\<`Value`, `Value`\>

Returns a non-raw version of `reducer`.

### Type Parameters

• **Value**

### Parameters

• **reducer**: [`FunctionReducer`](../type-aliases/FunctionReducer.md)\<`Value`\>

### Returns

[`OptionalReducer`](../type-aliases/OptionalReducer.md)\<`Value`, `Value`\>

### Defined in

reducers.d.ts:379

## normalizeReducer(reducer)

> **normalizeReducer**\<`Key`, `Value`, `Acc`, `This`\>(`reducer`): [`AsyncKeyedReducer`](../type-aliases/AsyncKeyedReducer.md)\<`Key`, `Value`, `Acc`\>

Returns a non-raw version of `reducer`.

### Type Parameters

• **Key**

• **Value**

• **Acc**

• **This**

### Parameters

• **reducer**: `Readonly`\<[`RawAsyncKeyedReducer`](../type-aliases/RawAsyncKeyedReducer.md)\<`Key`, `Value`, `Acc`, `This`\>\>

### Returns

[`AsyncKeyedReducer`](../type-aliases/AsyncKeyedReducer.md)\<`Key`, `Value`, `Acc`\>

### Defined in

reducers.d.ts:381

## normalizeReducer(reducer)

> **normalizeReducer**\<`Value`, `Acc`, `Finished`, `This`\>(`reducer`): [`AsyncReducer`](../type-aliases/AsyncReducer.md)\<`Value`, `Acc`, `Finished`\>

Returns a non-raw version of `reducer`.

### Type Parameters

• **Value**

• **Acc**

• **Finished**

• **This**

### Parameters

• **reducer**: `Readonly`\<[`RawAsyncReducerWithFinish`](../type-aliases/RawAsyncReducerWithFinish.md)\<`Value`, `Acc`, `Finished`, `This`\>\>

### Returns

[`AsyncReducer`](../type-aliases/AsyncReducer.md)\<`Value`, `Acc`, `Finished`\>

### Defined in

reducers.d.ts:384

## normalizeReducer(reducer)

> **normalizeReducer**\<`Value`, `Acc`, `This`\>(`reducer`): [`AsyncReducer`](../type-aliases/AsyncReducer.md)\<`Value`, `Acc`, `Acc`\>

Returns a non-raw version of `reducer`.

### Type Parameters

• **Value**

• **Acc**

• **This**

### Parameters

• **reducer**: `Readonly`\<[`RawAsyncReducerWithoutFinish`](../type-aliases/RawAsyncReducerWithoutFinish.md)\<`Value`, `Acc`, `This`\>\>

### Returns

[`AsyncReducer`](../type-aliases/AsyncReducer.md)\<`Value`, `Acc`, `Acc`\>

### Defined in

reducers.d.ts:387

## normalizeReducer(reducer)

> **normalizeReducer**\<`Value`, `Finished`, `This`\>(`reducer`): [`AsyncOptionalReducer`](../type-aliases/AsyncOptionalReducer.md)\<`Value`, `Finished`\>

Returns a non-raw version of `reducer`.

### Type Parameters

• **Value**

• **Finished**

• **This**

### Parameters

• **reducer**: `Readonly`\<[`RawAsyncOptionalReducerWithFinish`](../type-aliases/RawAsyncOptionalReducerWithFinish.md)\<`Value`, `Finished`, `This`\>\>

### Returns

[`AsyncOptionalReducer`](../type-aliases/AsyncOptionalReducer.md)\<`Value`, `Finished`\>

### Defined in

reducers.d.ts:390

## normalizeReducer(reducer)

> **normalizeReducer**\<`Value`, `This`\>(`reducer`): [`AsyncOptionalReducer`](../type-aliases/AsyncOptionalReducer.md)\<`Value`, `Value`\>

Returns a non-raw version of `reducer`.

### Type Parameters

• **Value**

• **This**

### Parameters

• **reducer**: `Readonly`\<[`RawAsyncOptionalReducerWithoutFinish`](../type-aliases/RawAsyncOptionalReducerWithoutFinish.md)\<`Value`, `This`\>\>

### Returns

[`AsyncOptionalReducer`](../type-aliases/AsyncOptionalReducer.md)\<`Value`, `Value`\>

### Defined in

reducers.d.ts:393

## normalizeReducer(reducer)

> **normalizeReducer**\<`Value`\>(`reducer`): [`AsyncOptionalReducer`](../type-aliases/AsyncOptionalReducer.md)\<`Value`, `Value`\>

Returns a non-raw version of `reducer`.

### Type Parameters

• **Value**

### Parameters

• **reducer**: [`AsyncFunctionReducer`](../type-aliases/AsyncFunctionReducer.md)\<`Value`\>

### Returns

[`AsyncOptionalReducer`](../type-aliases/AsyncOptionalReducer.md)\<`Value`, `Value`\>

### Defined in

reducers.d.ts:396
