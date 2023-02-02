[Lexical Minifier API](../API.md) / [Exports](../modules.md) / Minifier

# Type alias: Minifier<I, O, X, Y, Z\>

Ƭ **Minifier**<`I`, `O`, `X`, `Y`, `Z`\>: `Object`

Defines the shape of an object for a minifier.

**`Property`**

The configuration object that defines the minified type `X`, original type `Y`, and version `Z` of the minification process

**`Property`**

A function that takes in data of type `I` and returns the minified version of the data `O`

**`Property`**

A function that takes in data of type `O` and returns the original version of the data `I`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `I` | `any` |
| `O` | `any` |
| `X` | extends `string` = `string` |
| `Y` | extends `string` = `string` |
| `Z` | extends `number` = `number` |

#### Type declaration

| Name | Type |
| :------ | :------ |
| `config` | [`MinifierConfig`](MinifierConfig.md)<`X`, `Y`, `Z`\> |
| `minify` | (`data`: `I`) => `O` |
| `unminify` | (`data`: `O`) => `I` |

#### Defined in

[types.ts:39](https://github.com/fedemartinm/lexical-minifier/blob/b9a31d8/src/types.ts#L39)
