[Lexical Minifier API](../README.md) / ArrayPackNode

# Interface: ArrayPackNode

ArrayPackNode type represents a node tree in a minimal way using arrays.

```js
[
    "t", // A string representing the node name. If it is not present, it is assumed to be 'r'.
     1 ,   // A number representing the node version. If it is not present, it is assumed to be 1.
    [ ], // An optional array with child nodes.
    { }, // An optional object with node properties.
]
```

## Hierarchy

- `Array`<`undefined` \| `string` \| `number` \| `object` \| [`ArrayPackNode`](ArrayPackNode.md)[]\>

  ↳ **`ArrayPackNode`**
