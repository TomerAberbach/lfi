[**lfi**](../readme.md) • **Docs**

---

[lfi](../globals.md) / cache

# Function: cache()

> **cache**\<`Value`\>(`iterable`): `Iterable`\<`Value`, `any`, `any`\>

Returns an iterable equivalent to `iterable` that iterates over `iterable` at
most once.

## Type Parameters

• **Value**

## Parameters

• **iterable**: `Iterable`\<`Value`, `any`, `any`\>

## Returns

`Iterable`\<`Value`, `any`, `any`\>

## Example

```js
const iterable = [`sloth`, `more sloth`, `even more sloth`]
const iterableWithEffects = each(console.log, iterable)

const cachedIterable = cache(iterableWithEffects)

console.log([...cachedIterable])
//=> sloth
//=> more sloth
//=> even more sloth
//=> [ 'sloth', 'more sloth', 'even more sloth' ]

console.log([...cachedIterable])
//=> [ 'sloth', 'more sloth', 'even more sloth' ]
```

## Defined in

[cache.d.ts:24](https://github.com/TomerAberbach/lfi/blob/85d6360ac7d8f71c70f308d2ace5bc2aa99ab03d/src/operations/cache.d.ts#L24)
