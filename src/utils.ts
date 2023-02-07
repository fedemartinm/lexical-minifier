import type { LexicalNode } from "lexical";
import type { ArrayPackNode, MinifiedLexicalNode } from "./types";
import { LexicalMinifier } from "./lexical-minifier";

/**
 * Takes a `LexicalNode` as an argument and returns a minified version of the serialized node.
 */
export function minify(node: LexicalNode, min?: LexicalMinifier) {
  const minifier = min || new LexicalMinifier();

  const nodeMinifier = minifier.get(node.getType());
  const minified = nodeMinifier.minify(node.exportJSON());

  // $isElementNode replacement
  if (
    Object.getPrototypeOf(node.constructor).name === "ElementNode" ||
    typeof node.getChildren === "function"
  ) {
    const children = node.getChildren();
    children.forEach((child: any) => {
      const serializedChildNode = minify(child, minifier);
      minified.c.push(serializedChildNode);
    });
  }

  return minified;
}

/**
 * Takes a minified `LexicalNode` as an argument and returns the original, unminified version of the serialized node.
 */
export function unminify(node: MinifiedLexicalNode, min?: LexicalMinifier) {
  const minifier = min || new LexicalMinifier();

  const nodeMinifier = minifier.getByMinifiedType(node.t);
  const serialized = nodeMinifier.unminify(node);

  if (Array.isArray(serialized.children)) {
    serialized.children = serialized.children.map((child: any) =>
      unminify(child, minifier),
    );
  }
  return serialized;
}

/**
 * Transforms a MinifiedLexicalNode into its minimal representation using arrays.
 * @param node The MinifiedLexicalNode to be transformed.
 * @returns The transformed ArrayPackNode.
 */
export function toArrayPack(node: MinifiedLexicalNode) {
  const pack: ArrayPackNode = [];

  const { t, v, c, ...props } = node;

  if (t !== "r") {
    pack.push(t);
  }

  if (v !== 1) {
    pack.push(v);
  }

  if (Object.keys(props).length > 0) {
    pack.push(props);
  }

  if (Array.isArray(c) && c.length) {
    pack.push(c.map(toArrayPack));
  }
  return pack;
}

/**
 * Transforms an ArrayPackNode into its original MinifiedLexicalNode representation.
 * @param pack The ArrayPackNode to be transformed.
 * @returns The transformed MinifiedLexicalNode.
 */
export function fromArrayPack(pack: ArrayPackNode) {
  let node: MinifiedLexicalNode = {
    t: "r",
    v: 1,
  };

  pack.forEach((element) => {
    if (typeof element === "string") {
      node.t = element;
    } else if (typeof element === "number") {
      node.v = element;
    } else if (Array.isArray(element)) {
      node.c = element.map(fromArrayPack);
    } else if (typeof element === "object") {
      node = { ...node, ...element };
    }
  });
  return node;
}
