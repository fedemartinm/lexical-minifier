import codeMinifier from "../src/minifiers/code-minifier";
import { SerializedCodeNode } from "@lexical/code";
import { create, oneOf } from "./utils";

describe("code-minifier", () => {
  it("should minify and unminify data correctly", async () => {
    const serialized: SerializedCodeNode = {
      children: [],
      language: "javascript",
      type: "code",
      direction: "rtl",
      format: "start",
      indent: 0,
      version: 1,
    };
    const minified = codeMinifier.minify(serialized);

    expect(minified).toEqual({
      c: [],
      l: "javascript",
      d: 2,
      f: 6,
      t: "c",
      v: 1,
    });

    const outputData = codeMinifier.unminify(minified);

    expect(outputData).toEqual(serialized);
  });

  it("should minify and unminify different code nodes", () => {
    const codes = create<SerializedCodeNode>({
      children: [],
      language: oneOf("javascript", "c", null, undefined),
      direction: oneOf("ltr", "rtl", null),
      format: oneOf("left", "start", "center", "right", "end", "justify", ""),
      indent: 1,
      type: "code",
      version: 1,
    });
    codes.forEach((c) => {
      const minified = codeMinifier.minify(c);
      const unminified = codeMinifier.unminify(minified);
      expect(unminified).toEqual(c);
    });
  });
});
