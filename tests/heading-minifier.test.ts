import headingMinifier from "../src/minifiers/heading-minifier";
import { create, oneOf } from "./utils";
import { SerializedHeadingNode } from "@lexical/rich-text";

describe("heading-minifier", () => {
  it("should minify and unminify data correctly", async () => {
    const serialized: SerializedHeadingNode = {
      children: [],
      type: "heading",
      tag: "h1",
      direction: "rtl",
      format: "start",
      indent: 0,
      version: 1,
    };
    const minified = headingMinifier.minify(serialized);

    expect(minified).toEqual({
      c: [],
      h: 0,
      d: 2,
      f: 6,
      i: 0,
      t: "h",
      v: 1,
    });

    const outputData = headingMinifier.unminify(minified);

    expect(outputData).toEqual(serialized);
  });

  it("should minify and unminify different heading nodes", () => {
    const headings = create<SerializedHeadingNode>({
      children: [],
      direction: oneOf("ltr", "rtl", null),
      tag: oneOf("h1", "h2", "h3", "h4", "h5", "h6"),
      format: oneOf("left", "start", "center", "right", "end", "justify", ""),
      indent: oneOf(0, 1, 2),
      type: "heading",
      version: 1,
    });
    headings.forEach((h) => {
      const minified = headingMinifier.minify(h);
      const unminified = headingMinifier.unminify(minified);
      expect(unminified).toEqual(h);
    });
  });
});
