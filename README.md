![npm](https://img.shields.io/npm/v/lexical-minifier) 
![npm bundle size](https://img.shields.io/bundlephobia/minzip/lexical-minifier?color=green)

# Lexical Minifier

Exporting the state of the [lexical editor](https://github.com/facebook/lexical) can result in a large and unoptimized JSON structure. This package offers a solution by minifying and unminifying the code produced by the lexical editor, reducing the time it takes to obtain or send the serialized state in a request and freeing up valuable storage space. 


### How does the package work?

Its philosophy is to create a simple and secure minification through the use of these strategies:

- Mapping all known values to numerical values
- Shortening property length to one character
- Removing default values
- Providing complete reversibility to the original state.

### Testing 

Unit testing has been conducted to ensure the functionality and reliability of the code. The test-coverage also checks all the minifiers included in the package to guarantee that every aspect has been thoroughly tested and optimized for optimal performance. 

### Example

If you serialize the content "Here are some text formats: `code`, **bold**, _italic_ and so on" in lexical, you will get something like:


```js
{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Here are some text formats: ","type
":"text","version":1},{"detail":0,"format":16,"mode":"normal","style":"","text":"code","type":"text","version":1},{"det
ail":0,"format":0,"mode":"normal","style":"","text":", ","type":"text","version":1},{"detail":0,"format":1,"mode":"norm
al","style":"","text":"bold","type":"text","version":1},{"detail":0,"format":0,"mode":"normal","style":"","text":", ","
type":"text","version":1},{"detail":0,"format":2,"mode":"normal","style":"","text":"italic","type":"text","version":1},
{"detail":0,"format":0,"mode":"normal","style":"","text":" and so on.","type":"text","version":1}],"direction":null,"fo
rmat":"","indent":0,"type":"paragraph","version":1}],"direction":null,"format":"","indent":0,"type":"root","version":1}
```

This package lets you minify the nodes, resulting in this:

```js
{"c":[{"c":[{"x":"Here are some text formats: ","t":"t","v":1},{"f":16,"x":"code","t":"t","v":1},{"x":", ","t":"t","v":
1},{"f":1,"x":"bold","t":"t","v":1},{"x":", ","t":"t","v":1},{"f":2,"x":"italic","t":"t","v":1},{"x":" and so on.","t":
"t","v":1}],"t":"p","v":1}],"t":"r","v":1}
```

And transform the nodes to array pack to further reduce the size:

```js
[[["p",[["t",{"x":"Here are some text formats: "}],["t",{"f":16,"x":"code"}],["t",{"x":", "}],["t",{"f":1,"x":"bold"}],
["t",{"x":", "}],["t",{"f":2,"x":"italic"}],["t",{"x":" and so on."}]]]]]
```

### Installation

```shell
yarn add lexical-minifier
```

or

```shell
npm install lexical-minifier --save
```

### Usage

The following code snippet demonstrates the usage of this package. You can also see a demo and usage examples in this [sandbox](https://codesandbox.io/s/lexical-minifier-pqwwg7?file=/src/plugins/MinifierPlugin.js).

```js
editor.update(() => {
  // get the minified state, to persist it or do what is necessary
  const minified = minify($getRoot());
  //
  // ...
  //
  // get the serialized nodes, to import them back into lexical
  const serialized = unminify(minified);

  const editorState = editor.parseEditorState({ root: serialized });
  editor.setEditorState(editorState);
});
```

### Built-in minifiers

This package aims to minify all the nodes included in the lexical package and its official modules. 
Below is a list of nodes that are supported by default. If you have created a custom node, you can easily write your minifier. If there is an existing node that you think should be included in this package, please open an [issue](https://github.com/fedemartinm/lexical-minifier/issues) and we'll check it.

`root`, `text`, `link`, `code`, `mark`, `table`, `quote`, `list`, `heading`, `listitem`, `overflow`, `autolink`, `tablerow`, `tablecell`, `linebreak`, `paragraph`

### Writing a custom minifier

Below is a basic example of how to write a custom minifier. You can see the complete API documentation [here](https://github.com/fedemartinm/lexical-minifier/tree/main/docs).

```js

// as a pre-requisite, your node must implement the exportJSON() method. 
// the first step is to define a minifier for your node:
const videoMinifier = buildMinifier(
  {
    type: "video",
    minifiedType: "v",
    version: 1,
  },
  (serialized: SerializedVideoNode, config) => ({
    // here you must write the logic to minify the serialized object
    // this package provide some tools like lookup-table and removeDefault
    a: serialized.autoplay,
    // these fields are required
    t: config.minifiedType,
    v: config.version,
  }),
  (minified, config) => ({
    autoplay: minified.a,
    // these fields are required
    type: config.type,
    version: config.version,
  })
);

// then you must create an instance of the lexical minifier class and register the new node minifier
const lexicalMinifier = new LexicalMinifier();
lexicalMinifier.register("video", videoMinifier);

// now you can minify and un-minify your state by passing the lexical minifier class as an argument
const minifiedData = minify(state, lexicalMinifier);
const serializedData = unminify(minifiedData, lexicalMinifier)
```

### Arraypack

The package is designed to use the result of the `minify()` and `unminify()` functions. Nevertheless, if you need a higher minification ratio, you can try using the array-pack format, which is a way of representing minified nodes using arrays.

In the Arraypack format, each node has the following structure:

```js
[
    "t", // A string representing the node name. If it is not present, it is assumed to be 'r'.
     1 , // A number representing the node version. If it is not present, it is assumed to be 1.
    [ ], // An optional array with child nodes.
    { }, // An optional object with node properties.
]
```

A simple paragraph would look like this:

```js
[[["p",[["t",{"x":"Hello World"}]]]]]
```

