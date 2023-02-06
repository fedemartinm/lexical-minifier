[Lexical Minifier API](../README.md) / LookupTable

# Class: LookupTable<V\>

The LookupTable class is a generic data structure used to map between a set of values `V` and an index `number`.
It provides two methods, `fromKey` and `toKey`, to perform the mapping between an index and a value and vice versa.

## Type parameters

| Name | Description |
| :------ | :------ |
| `V` | Represents the type of values that will be mapped in the LookupTable |

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

[lookups/lookup-table.ts:15](https://github.com/fedemartinm/lexical-minifier/blob/9a17751/src/lookups/lookup-table.ts#L15)

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

[lookups/lookup-table.ts:25](https://github.com/fedemartinm/lexical-minifier/blob/9a17751/src/lookups/lookup-table.ts#L25)

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

[lookups/lookup-table.ts:34](https://github.com/fedemartinm/lexical-minifier/blob/9a17751/src/lookups/lookup-table.ts#L34)
