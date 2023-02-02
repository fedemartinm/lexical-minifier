[Lexical Minifier API](../API.md) / [Exports](../modules.md) / Minifier

# Interface: Minifier<I, O, X, Y, Z\>

Defines the shape of an object for a minifier.

**`Property`**

The configuration object that defines the minified type `X`, original type `Y`, and version `Z` of the minification process

**`Property`**

A function that takes in data of type `I` and returns the minified version of the data `O`

**`Property`**

A function that takes in data of type `O` and returns the original version of the data `I`

## Type parameters

| Name | Type |
| :------ | :------ |
| `I` | `any` |
| `O` | `any` |
| `X` | extends `string` = `string` |
| `Y` | extends `string` = `string` |
| `Z` | extends `number` = `number` |
