[**lfi**](../readme.md) • **Docs**

---

[lfi](../globals.md) / curry

# Function: curry()

> **curry**\<`Parameters`, `Return`\>(`fn`): `Curried`\<`Parameters`, `Return`\>

Returns a curried version of `fn`.

## Type Parameters

• **Parameters** _extends_ readonly `any`[]

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

[fn.d.ts:50](https://github.com/TomerAberbach/lfi/blob/dd796c78d3ff68ae7bf4a0272b3cbeca688438e7/src/operations/fn.d.ts#L50)
