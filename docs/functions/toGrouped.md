[**lfi**](../readme.md) • **Docs**

---

[lfi](../globals.md) / toGrouped

# Function: toGrouped()

Returns a [Reducer](../type-aliases/Reducer.md) that reduces key-value pairs
using `outerReducer` and reduces values with the same key using `innerReducer`.

## Example

```js
console.log(
  pipe(
    [`sloth`, `some sloth`, `sleep`, `more sloth`, `even more sloth`],
    map(string => [string.length, string]),
    reduce(toGrouped(toArray(), toMap())),
  ),
)
//=> Map(3) {
//=>   5 => [ 'sloth', 'sleep' ],
//=>   10 => [ 'some sloth', 'more sloth' ],
//=>   15 => [ 'even more sloth' ]
//=> }
```

## toGrouped(innerReducer, outerReducer)

> **toGrouped**\<`Key`, `Value`, `InnerAcc`, `InnerFinished`, `InnerThis`,
> `OuterAcc`, `OuterThis`\>(`innerReducer`, `outerReducer`):
> [`Reducer`](../type-aliases/Reducer.md)\<readonly [`Key`, `Value`], `never`, `OuterAcc`\>

Returns a [Reducer](../type-aliases/Reducer.md) that reduces key-value pairs
using `outerReducer` and reduces values with the same key using `innerReducer`.

### Type Parameters

• **Key**

• **Value**

• **InnerAcc**

• **InnerFinished**

• **InnerThis**

• **OuterAcc**

• **OuterThis**

### Parameters

• **innerReducer**:
`Readonly`\<[`RawReducerWithFinish`](../type-aliases/RawReducerWithFinish.md)\<`Value`,
`InnerAcc`, `InnerFinished`, `InnerThis`\>\>

• **outerReducer**:
`Readonly`\<[`RawKeyedReducer`](../type-aliases/RawKeyedReducer.md)\<`Key`,
`InnerAcc` \| `InnerFinished`, `OuterAcc`, `OuterThis`\>\>

### Returns

[`Reducer`](../type-aliases/Reducer.md)\<readonly [`Key`, `Value`], `never`, `OuterAcc`\>

### Example

```js
console.log(
  pipe(
    [`sloth`, `some sloth`, `sleep`, `more sloth`, `even more sloth`],
    map(string => [string.length, string]),
    reduce(toGrouped(toArray(), toMap())),
  ),
)
//=> Map(3) {
//=>   5 => [ 'sloth', 'sleep' ],
//=>   10 => [ 'some sloth', 'more sloth' ],
//=>   15 => [ 'even more sloth' ]
//=> }
```

### Defined in

[collect.d.ts:158](https://github.com/TomerAberbach/lfi/blob/c9ef1bf4d1040d7f49c52b70b358c019e55f524d/src/operations/collect.d.ts#L158)

## toGrouped(innerReducer)

> **toGrouped**\<`Value`, `InnerAcc`, `InnerFinished`,
> `InnerThis`\>(`innerReducer`): \<`Key`, `OuterAcc`,
> `OuterThis`\>(`outerReducer`) =>
> [`Reducer`](../type-aliases/Reducer.md)\<readonly [`Key`, `Value`], `never`, `OuterAcc`\>

Returns a [Reducer](../type-aliases/Reducer.md) that reduces key-value pairs
using `outerReducer` and reduces values with the same key using `innerReducer`.

### Type Parameters

• **Value**

• **InnerAcc**

• **InnerFinished**

• **InnerThis**

### Parameters

• **innerReducer**:
`Readonly`\<[`RawReducerWithFinish`](../type-aliases/RawReducerWithFinish.md)\<`Value`,
`InnerAcc`, `InnerFinished`, `InnerThis`\>\>

### Returns

`Function`

#### Type Parameters

• **Key**

• **OuterAcc**

• **OuterThis**

#### Parameters

• **outerReducer**:
`Readonly`\<[`RawKeyedReducer`](../type-aliases/RawKeyedReducer.md)\<`Key`,
`InnerAcc` \| `InnerFinished`, `OuterAcc`, `OuterThis`\>\>

#### Returns

[`Reducer`](../type-aliases/Reducer.md)\<readonly [`Key`, `Value`], `never`, `OuterAcc`\>

### Example

```js
console.log(
  pipe(
    [`sloth`, `some sloth`, `sleep`, `more sloth`, `even more sloth`],
    map(string => [string.length, string]),
    reduce(toGrouped(toArray(), toMap())),
  ),
)
//=> Map(3) {
//=>   5 => [ 'sloth', 'sleep' ],
//=>   10 => [ 'some sloth', 'more sloth' ],
//=>   15 => [ 'even more sloth' ]
//=> }
```

### Defined in

[collect.d.ts:166](https://github.com/TomerAberbach/lfi/blob/c9ef1bf4d1040d7f49c52b70b358c019e55f524d/src/operations/collect.d.ts#L166)

## toGrouped(innerReducer, outerReducer)

> **toGrouped**\<`Key`, `Value`, `InnerAcc`, `InnerThis`, `OuterAcc`,
> `OuterThis`\>(`innerReducer`, `outerReducer`):
> [`Reducer`](../type-aliases/Reducer.md)\<readonly [`Key`, `Value`], `never`, `OuterAcc`\>

Returns a [Reducer](../type-aliases/Reducer.md) that reduces key-value pairs
using `outerReducer` and reduces values with the same key using `innerReducer`.

### Type Parameters

• **Key**

• **Value**

• **InnerAcc**

• **InnerThis**

• **OuterAcc**

• **OuterThis**

### Parameters

• **innerReducer**:
`Readonly`\<[`RawReducerWithoutFinish`](../type-aliases/RawReducerWithoutFinish.md)\<`Value`,
`InnerAcc`, `InnerThis`\>\>

• **outerReducer**:
`Readonly`\<[`RawKeyedReducer`](../type-aliases/RawKeyedReducer.md)\<`Key`,
`InnerAcc`, `OuterAcc`, `OuterThis`\>\>

### Returns

[`Reducer`](../type-aliases/Reducer.md)\<readonly [`Key`, `Value`], `never`, `OuterAcc`\>

### Example

```js
console.log(
  pipe(
    [`sloth`, `some sloth`, `sleep`, `more sloth`, `even more sloth`],
    map(string => [string.length, string]),
    reduce(toGrouped(toArray(), toMap())),
  ),
)
//=> Map(3) {
//=>   5 => [ 'sloth', 'sleep' ],
//=>   10 => [ 'some sloth', 'more sloth' ],
//=>   15 => [ 'even more sloth' ]
//=> }
```

### Defined in

[collect.d.ts:176](https://github.com/TomerAberbach/lfi/blob/c9ef1bf4d1040d7f49c52b70b358c019e55f524d/src/operations/collect.d.ts#L176)

## toGrouped(innerReducer)

> **toGrouped**\<`Value`, `InnerAcc`, `InnerThis`\>(`innerReducer`): \<`Key`,
> `OuterAcc`, `OuterThis`\>(`outerReducer`) =>
> [`Reducer`](../type-aliases/Reducer.md)\<readonly [`Key`, `Value`], `never`, `OuterAcc`\>

Returns a [Reducer](../type-aliases/Reducer.md) that reduces key-value pairs
using `outerReducer` and reduces values with the same key using `innerReducer`.

### Type Parameters

• **Value**

• **InnerAcc**

• **InnerThis**

### Parameters

• **innerReducer**:
`Readonly`\<[`RawReducerWithoutFinish`](../type-aliases/RawReducerWithoutFinish.md)\<`Value`,
`InnerAcc`, `InnerThis`\>\>

### Returns

`Function`

#### Type Parameters

• **Key**

• **OuterAcc**

• **OuterThis**

#### Parameters

• **outerReducer**:
`Readonly`\<[`RawKeyedReducer`](../type-aliases/RawKeyedReducer.md)\<`Key`,
`InnerAcc`, `OuterAcc`, `OuterThis`\>\>

#### Returns

[`Reducer`](../type-aliases/Reducer.md)\<readonly [`Key`, `Value`], `never`, `OuterAcc`\>

### Example

```js
console.log(
  pipe(
    [`sloth`, `some sloth`, `sleep`, `more sloth`, `even more sloth`],
    map(string => [string.length, string]),
    reduce(toGrouped(toArray(), toMap())),
  ),
)
//=> Map(3) {
//=>   5 => [ 'sloth', 'sleep' ],
//=>   10 => [ 'some sloth', 'more sloth' ],
//=>   15 => [ 'even more sloth' ]
//=> }
```

### Defined in

[collect.d.ts:180](https://github.com/TomerAberbach/lfi/blob/c9ef1bf4d1040d7f49c52b70b358c019e55f524d/src/operations/collect.d.ts#L180)

## toGrouped(innerReducer, outerReducer)

> **toGrouped**\<`Key`, `Value`, `InnerFinished`, `InnerThis`, `OuterAcc`,
> `OuterThis`\>(`innerReducer`, `outerReducer`):
> [`Reducer`](../type-aliases/Reducer.md)\<readonly [`Key`, `Value`], `never`, `OuterAcc`\>

Returns a [Reducer](../type-aliases/Reducer.md) that reduces key-value pairs
using `outerReducer` and reduces values with the same key using `innerReducer`.

### Type Parameters

• **Key**

• **Value**

• **InnerFinished**

• **InnerThis**

• **OuterAcc**

• **OuterThis**

### Parameters

• **innerReducer**:
`Readonly`\<[`RawOptionalReducerWithFinish`](../type-aliases/RawOptionalReducerWithFinish.md)\<`Value`,
`InnerFinished`, `InnerThis`\>\>

• **outerReducer**:
`Readonly`\<[`RawKeyedReducer`](../type-aliases/RawKeyedReducer.md)\<`Key`,
`Value` \| `InnerFinished`, `OuterAcc`, `OuterThis`\>\>

### Returns

[`Reducer`](../type-aliases/Reducer.md)\<readonly [`Key`, `Value`], `never`, `OuterAcc`\>

### Example

```js
console.log(
  pipe(
    [`sloth`, `some sloth`, `sleep`, `more sloth`, `even more sloth`],
    map(string => [string.length, string]),
    reduce(toGrouped(toArray(), toMap())),
  ),
)
//=> Map(3) {
//=>   5 => [ 'sloth', 'sleep' ],
//=>   10 => [ 'some sloth', 'more sloth' ],
//=>   15 => [ 'even more sloth' ]
//=> }
```

### Defined in

[collect.d.ts:186](https://github.com/TomerAberbach/lfi/blob/c9ef1bf4d1040d7f49c52b70b358c019e55f524d/src/operations/collect.d.ts#L186)

## toGrouped(innerReducer)

> **toGrouped**\<`Value`, `InnerFinished`, `InnerThis`\>(`innerReducer`):
> \<`Key`, `OuterAcc`, `OuterThis`\>(`outerReducer`) =>
> [`Reducer`](../type-aliases/Reducer.md)\<readonly [`Key`, `Value`], `never`, `OuterAcc`\>

Returns a [Reducer](../type-aliases/Reducer.md) that reduces key-value pairs
using `outerReducer` and reduces values with the same key using `innerReducer`.

### Type Parameters

• **Value**

• **InnerFinished**

• **InnerThis**

### Parameters

• **innerReducer**:
`Readonly`\<[`RawOptionalReducerWithFinish`](../type-aliases/RawOptionalReducerWithFinish.md)\<`Value`,
`InnerFinished`, `InnerThis`\>\>

### Returns

`Function`

#### Type Parameters

• **Key**

• **OuterAcc**

• **OuterThis**

#### Parameters

• **outerReducer**:
`Readonly`\<[`RawKeyedReducer`](../type-aliases/RawKeyedReducer.md)\<`Key`,
`Value` \| `InnerFinished`, `OuterAcc`, `OuterThis`\>\>

#### Returns

[`Reducer`](../type-aliases/Reducer.md)\<readonly [`Key`, `Value`], `never`, `OuterAcc`\>

### Example

```js
console.log(
  pipe(
    [`sloth`, `some sloth`, `sleep`, `more sloth`, `even more sloth`],
    map(string => [string.length, string]),
    reduce(toGrouped(toArray(), toMap())),
  ),
)
//=> Map(3) {
//=>   5 => [ 'sloth', 'sleep' ],
//=>   10 => [ 'some sloth', 'more sloth' ],
//=>   15 => [ 'even more sloth' ]
//=> }
```

### Defined in

[collect.d.ts:194](https://github.com/TomerAberbach/lfi/blob/c9ef1bf4d1040d7f49c52b70b358c019e55f524d/src/operations/collect.d.ts#L194)

## toGrouped(innerReducer, outerReducer)

> **toGrouped**\<`Key`, `Value`, `InnerThis`, `OuterAcc`,
> `OuterThis`\>(`innerReducer`, `outerReducer`):
> [`Reducer`](../type-aliases/Reducer.md)\<readonly [`Key`, `Value`], `never`, `OuterAcc`\>

Returns a [Reducer](../type-aliases/Reducer.md) that reduces key-value pairs
using `outerReducer` and reduces values with the same key using `innerReducer`.

### Type Parameters

• **Key**

• **Value**

• **InnerThis**

• **OuterAcc**

• **OuterThis**

### Parameters

• **innerReducer**:
`Readonly`\<[`RawOptionalReducerWithoutFinish`](../type-aliases/RawOptionalReducerWithoutFinish.md)\<`Value`,
`InnerThis`\>\>

• **outerReducer**:
`Readonly`\<[`RawKeyedReducer`](../type-aliases/RawKeyedReducer.md)\<`Key`,
`Value`, `OuterAcc`, `OuterThis`\>\>

### Returns

[`Reducer`](../type-aliases/Reducer.md)\<readonly [`Key`, `Value`], `never`, `OuterAcc`\>

### Example

```js
console.log(
  pipe(
    [`sloth`, `some sloth`, `sleep`, `more sloth`, `even more sloth`],
    map(string => [string.length, string]),
    reduce(toGrouped(toArray(), toMap())),
  ),
)
//=> Map(3) {
//=>   5 => [ 'sloth', 'sleep' ],
//=>   10 => [ 'some sloth', 'more sloth' ],
//=>   15 => [ 'even more sloth' ]
//=> }
```

### Defined in

[collect.d.ts:204](https://github.com/TomerAberbach/lfi/blob/c9ef1bf4d1040d7f49c52b70b358c019e55f524d/src/operations/collect.d.ts#L204)

## toGrouped(innerReducer)

> **toGrouped**\<`Value`, `InnerThis`\>(`innerReducer`): \<`Key`, `OuterAcc`,
> `OuterThis`\>(`outerReducer`) =>
> [`Reducer`](../type-aliases/Reducer.md)\<readonly [`Key`, `Value`], `never`, `OuterAcc`\>

Returns a [Reducer](../type-aliases/Reducer.md) that reduces key-value pairs
using `outerReducer` and reduces values with the same key using `innerReducer`.

### Type Parameters

• **Value**

• **InnerThis**

### Parameters

• **innerReducer**:
`Readonly`\<[`RawOptionalReducerWithoutFinish`](../type-aliases/RawOptionalReducerWithoutFinish.md)\<`Value`,
`InnerThis`\>\>

### Returns

`Function`

#### Type Parameters

• **Key**

• **OuterAcc**

• **OuterThis**

#### Parameters

• **outerReducer**:
`Readonly`\<[`RawKeyedReducer`](../type-aliases/RawKeyedReducer.md)\<`Key`,
`Value`, `OuterAcc`, `OuterThis`\>\>

#### Returns

[`Reducer`](../type-aliases/Reducer.md)\<readonly [`Key`, `Value`], `never`, `OuterAcc`\>

### Example

```js
console.log(
  pipe(
    [`sloth`, `some sloth`, `sleep`, `more sloth`, `even more sloth`],
    map(string => [string.length, string]),
    reduce(toGrouped(toArray(), toMap())),
  ),
)
//=> Map(3) {
//=>   5 => [ 'sloth', 'sleep' ],
//=>   10 => [ 'some sloth', 'more sloth' ],
//=>   15 => [ 'even more sloth' ]
//=> }
```

### Defined in

[collect.d.ts:208](https://github.com/TomerAberbach/lfi/blob/c9ef1bf4d1040d7f49c52b70b358c019e55f524d/src/operations/collect.d.ts#L208)

## toGrouped(innerReducer, outerReducer)

> **toGrouped**\<`Key`, `Value`, `OuterAcc`, `OuterThis`\>(`innerReducer`,
> `outerReducer`): [`Reducer`](../type-aliases/Reducer.md)\<readonly [`Key`,
> > `Value`], `never`, `OuterAcc`\>

Returns a [Reducer](../type-aliases/Reducer.md) that reduces key-value pairs
using `outerReducer` and reduces values with the same key using `innerReducer`.

### Type Parameters

• **Key**

• **Value**

• **OuterAcc**

• **OuterThis**

### Parameters

• **innerReducer**:
[`FunctionReducer`](../type-aliases/FunctionReducer.md)\<`Value`\>

• **outerReducer**:
`Readonly`\<[`RawKeyedReducer`](../type-aliases/RawKeyedReducer.md)\<`Key`,
`Value`, `OuterAcc`, `OuterThis`\>\>

### Returns

[`Reducer`](../type-aliases/Reducer.md)\<readonly [`Key`, `Value`], `never`, `OuterAcc`\>

### Example

```js
console.log(
  pipe(
    [`sloth`, `some sloth`, `sleep`, `more sloth`, `even more sloth`],
    map(string => [string.length, string]),
    reduce(toGrouped(toArray(), toMap())),
  ),
)
//=> Map(3) {
//=>   5 => [ 'sloth', 'sleep' ],
//=>   10 => [ 'some sloth', 'more sloth' ],
//=>   15 => [ 'even more sloth' ]
//=> }
```

### Defined in

[collect.d.ts:214](https://github.com/TomerAberbach/lfi/blob/c9ef1bf4d1040d7f49c52b70b358c019e55f524d/src/operations/collect.d.ts#L214)

## toGrouped(innerReducer)

> **toGrouped**\<`Value`\>(`innerReducer`): \<`Key`, `OuterAcc`,
> `OuterThis`\>(`outerReducer`) =>
> [`Reducer`](../type-aliases/Reducer.md)\<readonly [`Key`, `Value`], `never`, `OuterAcc`\>

Returns a [Reducer](../type-aliases/Reducer.md) that reduces key-value pairs
using `outerReducer` and reduces values with the same key using `innerReducer`.

### Type Parameters

• **Value**

### Parameters

• **innerReducer**:
[`FunctionReducer`](../type-aliases/FunctionReducer.md)\<`Value`\>

### Returns

`Function`

#### Type Parameters

• **Key**

• **OuterAcc**

• **OuterThis**

#### Parameters

• **outerReducer**:
`Readonly`\<[`RawKeyedReducer`](../type-aliases/RawKeyedReducer.md)\<`Key`,
`Value`, `OuterAcc`, `OuterThis`\>\>

#### Returns

[`Reducer`](../type-aliases/Reducer.md)\<readonly [`Key`, `Value`], `never`, `OuterAcc`\>

### Example

```js
console.log(
  pipe(
    [`sloth`, `some sloth`, `sleep`, `more sloth`, `even more sloth`],
    map(string => [string.length, string]),
    reduce(toGrouped(toArray(), toMap())),
  ),
)
//=> Map(3) {
//=>   5 => [ 'sloth', 'sleep' ],
//=>   10 => [ 'some sloth', 'more sloth' ],
//=>   15 => [ 'even more sloth' ]
//=> }
```

### Defined in

[collect.d.ts:218](https://github.com/TomerAberbach/lfi/blob/c9ef1bf4d1040d7f49c52b70b358c019e55f524d/src/operations/collect.d.ts#L218)
