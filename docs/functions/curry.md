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

```js
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

[core.d.ts:52](https://github.com/TomerAberbach/lfi/blob/a3eb3a94b2928b5200a7bcd0a14fdc70f0cb5947/src/operations/core.d.ts#L52)
