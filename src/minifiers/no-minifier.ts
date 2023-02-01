import type { SerializedLexicalNode } from "lexical";

const minify = (data: SerializedLexicalNode) => {
  console.info(
    `No minifiers are registered for type:"${data.type}", version:${data.version}. Keeping original value.`,
  );
  return data;
};
const unminify = (data: SerializedLexicalNode) => {
  console.info(
    `No minifiers are registered for type:"${data.type}", version:${data.version}. Keeping original value.`,
  );
  return data;
};

export default { minify, unminify };
