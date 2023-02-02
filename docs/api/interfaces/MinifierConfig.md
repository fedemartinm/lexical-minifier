[Lexical Minifier API](../API.md) / [Exports](../modules.md) / MinifierConfig

# Interface: MinifierConfig<X, Y, Z\>

Defines the shape of an object for configuration of a minifier.

By using `X extends string` and `Y extends number`, we limit `X` and `Y` to specific string
and number literals respectively, allowing for more precise type inferences in TypeScript.

**`Property`**

The string representing the minified type (X)

**`Property`**

The string representing the original type (Y)

**`Property`**

The number representing the version of the minification process (Z)

## Type parameters

| Name | Type |
| :------ | :------ |
| `X` | extends `string` |
| `Y` | extends `string` |
| `Z` | extends `number` |
