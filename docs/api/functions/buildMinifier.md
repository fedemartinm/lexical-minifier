[Lexical Minifier API](../API.md) / [Exports](../modules.md) / buildMinifier

# Function: buildMinifier

▸ **buildMinifier**<`K`, `U`, `X`, `Y`, `Z`\>(`config`, `minifyFunc`, `unminifyFunc`): [`Minifier`](../interfaces/Minifier.md)<`K`, `U`, `X`, `Y`, `Z`\>

The `buildMinifier` function creates and returns an object that contains the necessary methods
and information for performing minification and unminification on serialized lexical nodes.

The function takes in three arguments: a `MinifierConfig` object that contains information needed
for minification and unminification, a `minifyFunc` function that performs the actual minification,
and an `unminifyFunc` function that performs the actual unminification.

The minify and unminify methods perform version and type checking on the data to ensure compatibility
with the MinifierConfig before applying the corresponding minification or unminification function.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends [`SerializedLexicalNode`]( https://lexical.dev/docs/concepts/serialization ) |
| `U` | extends [`MinifiedLexicalNode`](../interfaces/MinifiedLexicalNode.md) |
| `X` | extends `string` |
| `Y` | extends `string` |
| `Z` | extends `number` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `config` | `Readonly`<[`MinifierConfig`](../interfaces/MinifierConfig.md)<`X`, `Y`, `Z`\>\> |
| `minifyFunc` | (`data`: `K`, `metadata`: [`MinifierConfig`](../interfaces/MinifierConfig.md)<`X`, `Y`, `Z`\>) => `U` |
| `unminifyFunc` | (`data`: `U`, `metadata`: [`MinifierConfig`](../interfaces/MinifierConfig.md)<`X`, `Y`, `Z`\>) => `K` |

#### Returns

[`Minifier`](../interfaces/Minifier.md)<`K`, `U`, `X`, `Y`, `Z`\>

#### Defined in

[builder.ts:15](https://github.com/fedemartinm/lexical-minifier/blob/0ba7251/src/builder.ts#L15)
