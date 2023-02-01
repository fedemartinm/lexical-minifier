import type { LexicalNode } from "lexical";
import type { MinifiedLexicalNode } from "./types";
import { LexicalMinifier } from "./lexical-minifier";

/**
 * takes a LexicalNode as an argument and returns a minified version of the serialized node.
 */
export function minify(node: LexicalNode, min?: LexicalMinifier) {
  const minifier = min || new LexicalMinifier();

  const nodeMinifier = minifier.get(node.getType());
  const minified = nodeMinifier.minify(node.exportJSON());

  // $isElementNode replacement
  if (Object.getPrototypeOf(node.constructor).name === "ElementNode") {
    const children = node.getChildren();

    children.forEach((child: any) => {
      const serializedChildNode = minify(child, minifier);
      minified.c.push(serializedChildNode);
    });
  }

  return minified;
}

/**
 * takes a minified LexicalNode as an argument and returns the original, unminified version of the serialized node.
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
