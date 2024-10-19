[**lfi**](../readme.md) • **Docs**

---

[lfi](../globals.md) / cacheConcur

# Function: cacheConcur()

> **cacheConcur**\<`Value`\>(`concurIterable`):
> [`ConcurIterable`](../type-aliases/ConcurIterable.md)\<`Value`\>

Returns a concur iterable equivalent to `concurIterable` that iterates over
`concurIterable` at most once.

## Type Parameters

• **Value**

## Parameters

• **concurIterable**:
[`ConcurIterable`](../type-aliases/ConcurIterable.md)\<`Value`\>

## Returns

[`ConcurIterable`](../type-aliases/ConcurIterable.md)\<`Value`\>

## Example

```js
const concurIterable = asConcur([`sloth`, `more sloth`, `even more sloth`])
const concurIterableWithEffects = eachConcur(console.log, concurIterable)

const cachedConcurIterable = cacheConcur(concurIterableWithEffects)

console.log(await pipe(cachedConcurIterable, reduceConcur(toArray())))
//=> sloth
//=> more sloth
//=> even more sloth
//=> [ 'sloth', 'more sloth', 'even more sloth' ]

console.log(await pipe(cachedConcurIterable, reduceConcur(toArray())))
//=> [ 'sloth', 'more sloth', 'even more sloth' ]
```

## Defined in

[cache.d.ts:72](https://github.com/TomerAberbach/lfi/blob/85d6360ac7d8f71c70f308d2ace5bc2aa99ab03d/src/operations/cache.d.ts#L72)
