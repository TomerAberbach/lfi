[**lfi**](../readme.md) • **Docs**

***

[lfi](../globals.md) / toMultiple

# Function: toMultiple()

Returns a [Reducer](../type-aliases/Reducer.md) or [OptionalReducer](../type-aliases/OptionalReducer.md) that reduces values to
an object or array of the same shape as `reducers` using all of the reducers
in `reducers`.

Returns an [OptionalReducer](../type-aliases/OptionalReducer.md) if at least one of the input reducers is
an [OptionalReducer](../type-aliases/OptionalReducer.md). Otherwise, returns a [Reducer](../type-aliases/Reducer.md).

## Example

```js
console.log(
  pipe(
    [`sloth`, `some sloth`, `sleep`, `more sloth`, `even more sloth`],
    map(string => string.length),
    reduce(toMultiple([toSet(), toCount(), toJoin(`,`)])),
  ),
)
//=> [ Set(3) { 5, 10, 15 }, 5, '5,10,5,10,15' ]

console.log(
  pipe(
    [`sloth`, `some sloth`, `sleep`, `more sloth`, `even more sloth`],
    map(string => string.length),
    reduce(
      toMultiple({
        set: toSet(),
        count: toCount(),
        string: toJoin(`,`),
      }),
    ),
  ),
)
//=> { set: Set(3) { 5, 10, 15 }, count: 5, string: '5,10,5,10,15' }
```

## toMultiple(reducers)

> **toMultiple**\<`Value`, `Reducers`\>(`reducers`): [`Reducer`](../type-aliases/Reducer.md)\<`Value`, \{ -readonly \[Key in string \| number \| symbol\]: Reducers\[Key\] extends RawReducerWithoutFinish\<Value, Acc\> ? Acc : never \}, \{ -readonly \[Key in string \| number \| symbol\]: Reducers\[Key\] extends RawReducerWithFinish\<Value, any, Finished\> ? Finished : Reducers\[Key\] extends RawReducerWithoutFinish\<Value, Acc\> ? Acc : never \}\>

Returns a [Reducer](../type-aliases/Reducer.md) or [OptionalReducer](../type-aliases/OptionalReducer.md) that reduces values to
an object or array of the same shape as `reducers` using all of the reducers
in `reducers`.

Returns an [OptionalReducer](../type-aliases/OptionalReducer.md) if at least one of the input reducers is
an [OptionalReducer](../type-aliases/OptionalReducer.md). Otherwise, returns a [Reducer](../type-aliases/Reducer.md).

### Type Parameters

• **Value**

• **Reducers** *extends* readonly [[`RawReducerWithoutFinish`](../type-aliases/RawReducerWithoutFinish.md)\<`Value`, `any`\>] \| readonly [`RawReducerWithoutFinish`](../type-aliases/RawReducerWithoutFinish.md)\<`Value`, `any`\>[] \| `Readonly`\<`Record`\<`string` \| `number` \| `symbol`, [`RawReducerWithoutFinish`](../type-aliases/RawReducerWithoutFinish.md)\<`Value`, `any`\>\>\>

### Parameters

• **reducers**: `Reducers`

### Returns

[`Reducer`](../type-aliases/Reducer.md)\<`Value`, \{ -readonly \[Key in string \| number \| symbol\]: Reducers\[Key\] extends RawReducerWithoutFinish\<Value, Acc\> ? Acc : never \}, \{ -readonly \[Key in string \| number \| symbol\]: Reducers\[Key\] extends RawReducerWithFinish\<Value, any, Finished\> ? Finished : Reducers\[Key\] extends RawReducerWithoutFinish\<Value, Acc\> ? Acc : never \}\>

### Example

```js
console.log(
  pipe(
    [`sloth`, `some sloth`, `sleep`, `more sloth`, `even more sloth`],
    map(string => string.length),
    reduce(toMultiple([toSet(), toCount(), toJoin(`,`)])),
  ),
)
//=> [ Set(3) { 5, 10, 15 }, 5, '5,10,5,10,15' ]

console.log(
  pipe(
    [`sloth`, `some sloth`, `sleep`, `more sloth`, `even more sloth`],
    map(string => string.length),
    reduce(
      toMultiple({
        set: toSet(),
        count: toCount(),
        string: toJoin(`,`),
      }),
    ),
  ),
)
//=> { set: Set(3) { 5, 10, 15 }, count: 5, string: '5,10,5,10,15' }
```

### Defined in

[collect.d.ts:261](https://github.com/TomerAberbach/lfi/blob/fd6e1ff9d7b7d249090f89ead6d0a30e26aba2e4/src/operations/collect.d.ts#L261)

## toMultiple(reducers)

> **toMultiple**\<`Value`, `Reducers`\>(`reducers`): [`OptionalReducer`](../type-aliases/OptionalReducer.md)\<`Value`, \{ -readonly \[Key in string \| number \| symbol\]: Reducers\[Key\] extends RawReducerWithFinish\<Value, any, Finished\> ? Finished : Reducers\[Key\] extends RawOptionalReducerWithFinish\<Value, Finished\> ? Finished : Value \}\>

Returns a [Reducer](../type-aliases/Reducer.md) or [OptionalReducer](../type-aliases/OptionalReducer.md) that reduces values to
an object or array of the same shape as `reducers` using all of the reducers
in `reducers`.

Returns an [OptionalReducer](../type-aliases/OptionalReducer.md) if at least one of the input reducers is
an [OptionalReducer](../type-aliases/OptionalReducer.md). Otherwise, returns a [Reducer](../type-aliases/Reducer.md).

### Type Parameters

• **Value**

• **Reducers** *extends* readonly [[`RawReducerWithoutFinish`](../type-aliases/RawReducerWithoutFinish.md)\<`Value`, `any`\> \| [`RawOptionalReducerWithoutFinish`](../type-aliases/RawOptionalReducerWithoutFinish.md)\<`Value`\> \| [`FunctionReducer`](../type-aliases/FunctionReducer.md)\<`Value`\>] \| readonly ([`RawReducerWithoutFinish`](../type-aliases/RawReducerWithoutFinish.md)\<`Value`, `any`\> \| [`RawOptionalReducerWithoutFinish`](../type-aliases/RawOptionalReducerWithoutFinish.md)\<`Value`\> \| [`FunctionReducer`](../type-aliases/FunctionReducer.md)\<`Value`\>)[] \| `Readonly`\<`Record`\<`string` \| `number` \| `symbol`, [`RawReducerWithoutFinish`](../type-aliases/RawReducerWithoutFinish.md)\<`Value`, `any`\> \| [`RawOptionalReducerWithoutFinish`](../type-aliases/RawOptionalReducerWithoutFinish.md)\<`Value`\> \| [`FunctionReducer`](../type-aliases/FunctionReducer.md)\<`Value`\>\>\>

### Parameters

• **reducers**: `Reducers`

### Returns

[`OptionalReducer`](../type-aliases/OptionalReducer.md)\<`Value`, \{ -readonly \[Key in string \| number \| symbol\]: Reducers\[Key\] extends RawReducerWithFinish\<Value, any, Finished\> ? Finished : Reducers\[Key\] extends RawOptionalReducerWithFinish\<Value, Finished\> ? Finished : Value \}\>

### Example

```js
console.log(
  pipe(
    [`sloth`, `some sloth`, `sleep`, `more sloth`, `even more sloth`],
    map(string => string.length),
    reduce(toMultiple([toSet(), toCount(), toJoin(`,`)])),
  ),
)
//=> [ Set(3) { 5, 10, 15 }, 5, '5,10,5,10,15' ]

console.log(
  pipe(
    [`sloth`, `some sloth`, `sleep`, `more sloth`, `even more sloth`],
    map(string => string.length),
    reduce(
      toMultiple({
        set: toSet(),
        count: toCount(),
        string: toJoin(`,`),
      }),
    ),
  ),
)
//=> { set: Set(3) { 5, 10, 15 }, count: 5, string: '5,10,5,10,15' }
```

### Defined in

[collect.d.ts:292](https://github.com/TomerAberbach/lfi/blob/fd6e1ff9d7b7d249090f89ead6d0a30e26aba2e4/src/operations/collect.d.ts#L292)
