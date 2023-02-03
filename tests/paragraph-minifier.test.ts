import paragraphMinifier from "../src/minifiers/paragraph-minifier";
import { SerializedParagraphNode } from "lexical";
import { create, oneOf } from "./utils";

describe("paragraph-minifier", () => {
  it("should minify and unminify data correctly", async () => {
    const serialized: SerializedParagraphNode = {
      children: [],
      type: "paragraph",
      direction: "rtl",
      format: "start",
      indent: 0,
      version: 1,
    };
    const minified = paragraphMinifier.minify(serialized);

    expect(minified).toEqual({
      c: [],
      d: 2,
      f: 6,
      i: 0,
      t: "p",
      v: 1,
    });

    const outputData = paragraphMinifier.unminify(minified);

    expect(outputData).toEqual(serialized);
  });

  it("should minify and unminify different paragraph nodes", () => {
    const paragraphs = create<SerializedParagraphNode>({
      children: [],
      direction: oneOf("ltr", "rtl", null),
      format: oneOf("left", "start", "center", "right", "end", "justify", ""),
      indent: oneOf(0, 1, 2),
      type: "paragraph",
      version: 1,
    });
    paragraphs.forEach((p) => {
      const minified = paragraphMinifier.minify(p);
      const unminified = paragraphMinifier.unminify(minified);
      expect(unminified).toEqual(p);
    });
  });
});
