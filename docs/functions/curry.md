[**lfi**](../readme.md) • **Docs**

***

[lfi](../globals.md) / curry

# Function: curry()

> **curry**\<`Parameters`, `Return`\>(`fn`): `Curried`\<`Parameters`, `Return`\>

Returns a curried version of `fn`.

## Type Parameters

• **Parameters** *extends* readonly `any`[]

• **Return**

## Parameters

• **fn**

## Returns

`Curried`\<`Parameters`, `Return`\>

## Example

```
function slothLog(a, b, c) {
  console.log(`${a} Sloth ${b} Sloth ${c}`)
}

const curriedSlothLog = curry(slothLog)

console.log(curriedSlothLog.name)
//=> slothLog

console.log(curriedSlothLog.length)
//=> 3

curriedSlothLog(`Hello`, `World`, `!`)
curriedSlothLog(`Hello`)(`World`, `!`)
curriedSlothLog(`Hello`, `World`)(`!`)
curriedSlothLog(`Hello`)(`World`)(`!`)
//=> Hello Sloth World Sloth !
//=> Hello Sloth World Sloth !
//=> Hello Sloth World Sloth !
//=> Hello Sloth World Sloth !
```

## Defined in

[fn.d.ts:50](https://github.com/TomerAberbach/lfi/blob/d7a0f90dd72245d6efd6bd97c58a78b3f3028f25/src/operations/fn.d.ts#L50)
