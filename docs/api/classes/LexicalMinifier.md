[Lexical Minifier API](../API.md) / [Exports](../modules.md) / LexicalMinifier

# Class: LexicalMinifier

The LexicalMinifier class provides a way to manage and access minifiers for lexical nodes.

## Methods

### get

▸ **get**(`type`): [`Minifier`](../interfaces/Minifier.md)<`any`, `any`, `string`, `string`, `number`\>

This method is used to retrieve a minifier for a specific lexical node. If a minifier
for the specified type is registered, the method returns it, otherwise it returns the
default `noop` minifier.

#### Parameters

| Name | Type |
| :------ | :------ |
| `type` | `string` |

#### Returns

[`Minifier`](../interfaces/Minifier.md)<`any`, `any`, `string`, `string`, `number`\>

#### Defined in

[lexical-minifier.ts:57](https://github.com/fedemartinm/lexical-minifier/blob/0ba7251/src/lexical-minifier.ts#L57)

___

### getByMinifiedType

▸ **getByMinifiedType**(`minifiedType`): [`Minifier`](../interfaces/Minifier.md)<`any`, `any`, `string`, `string`, `number`\>

Retrieve the minifier for a given minified type. If a minifier is found, return it.
Otherwise, return the default `noop` minifier.

#### Parameters

| Name | Type |
| :------ | :------ |
| `minifiedType` | `string` |

#### Returns

[`Minifier`](../interfaces/Minifier.md)<`any`, `any`, `string`, `string`, `number`\>

#### Defined in

[lexical-minifier.ts:69](https://github.com/fedemartinm/lexical-minifier/blob/0ba7251/src/lexical-minifier.ts#L69)

___

### register

▸ **register**<`T`\>(`type`, `minifier`): `void`

Use this method to register a new minifier.

Register and replace are essentially the same method, the difference is in the type of the `type` argument.
`register` allows you to add a new minifier and quickly check if the minifier you want to register is already provided by this package.
`replace` intentionally lets you replace a minifier provided by this package.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `string` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `type` | `T` extends ``"text"`` \| ``"link"`` \| ``"root"`` \| ``"linebreak"`` \| ``"paragraph"`` ? `never` : `T` | lexical type |
| `minifier` | `any` | minifier created with buildMinifier method |

#### Returns

`void`

#### Defined in

[lexical-minifier.ts:29](https://github.com/fedemartinm/lexical-minifier/blob/0ba7251/src/lexical-minifier.ts#L29)

___

### replace

▸ **replace**<`T`\>(`type`, `minifier`): `void`

Use this method to replace a base minifier.

Register and replace are essentially the same method, the difference is in the type of the `type` argument.
`register` allows you to add a new minifier and quickly check if the minifier you want to register is already provided by this package.
`replace` intentionally lets you replace a minifier provided by this package.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `string` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `type` | `T` extends ``"text"`` \| ``"link"`` \| ``"root"`` \| ``"linebreak"`` \| ``"paragraph"`` ? `T` : `never` | lexical type |
| `minifier` | `any` | minifier created with buildMinifier method |

#### Returns

`void`

#### Defined in

[lexical-minifier.ts:45](https://github.com/fedemartinm/lexical-minifier/blob/0ba7251/src/lexical-minifier.ts#L45)
