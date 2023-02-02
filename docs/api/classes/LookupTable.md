[Lexical Minifier API](../API.md) / [Exports](../modules.md) / LookupTable

# Class: LookupTable<V\>

The LookupTable class is a generic data structure used to map between a set of values `V` and an index `number`.
It provides two methods, `fromKey` and `toKey`, to perform the mapping between an index and a value and vice versa.

## Type parameters

| Name |
| :------ |
| `V` |

## Constructors

### constructor

• **new LookupTable**<`V`\>(`elements`)

Constructor for initializing the LookupTable

#### Type parameters

| Name |
| :------ |
| `V` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `elements` | `V`[] | an array of type V, representing the values to be mapped |

#### Defined in

[lookups/lookup-table.ts:13](https://github.com/fedemartinm/lexical-minifier/blob/b9a31d8/src/lookups/lookup-table.ts#L13)

## Methods

### fromKey

▸ **fromKey**(`index`): `V`

Public method for mapping from index to value

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `index` | `number` | the index to map from |

#### Returns

`V`

The value associated with the given index, of type V

#### Defined in

[lookups/lookup-table.ts:23](https://github.com/fedemartinm/lexical-minifier/blob/b9a31d8/src/lookups/lookup-table.ts#L23)

___

### toKey

▸ **toKey**(`value`): `number`

Public method for mapping from value to index

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `V` | the value to map from |

#### Returns

`number`

The index associated with the given value, of type number

#### Defined in

[lookups/lookup-table.ts:32](https://github.com/fedemartinm/lexical-minifier/blob/b9a31d8/src/lookups/lookup-table.ts#L32)
