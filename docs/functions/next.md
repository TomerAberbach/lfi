[**lfi**](../readme.md) • **Docs**

---

[lfi](../globals.md) / next

# Function: next()

> **next**\<`Value`\>(`iterable`):
> [[`Optional`](../type-aliases/Optional.md)\<`Value`\>, `Iterable`\<`Value`,
> `any`, `any`\>]

Returns a pair of iterables. If `iterable` is empty, then both of the returned
iterables are empty. Otherwise, the first iterable contains the first value of
`iterable` and the second iterable contains the rest of the values of
`iterable`. The second iterable can only be iterated once.

## Type Parameters

• **Value**

## Parameters

• **iterable**: `Iterable`\<`Value`, `any`, `any`\>

## Returns

[[`Optional`](../type-aliases/Optional.md)\<`Value`\>, `Iterable`\<`Value`,
`any`, `any`\>]

## Example

```js
const slothActivities = [`sleeping`, `yawning`, `eating`]
const [first, rest] = next(slothActivities)

console.log(get(first))
//=> sleeping

console.log([...rest])
//=> [ 'yawning', 'eating' ]

const badThingsAboutSloths = []
const [first2, rest2] = next(badThingsAboutSloths)

console.log(count(first2))
//=> 0

console.log(count(rest2))
//=> 0
```

## Defined in

[optional.d.ts:207](https://github.com/TomerAberbach/lfi/blob/dd796c78d3ff68ae7bf4a0272b3cbeca688438e7/src/operations/optional.d.ts#L207)
