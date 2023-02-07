import quoteMinifier from "../src/minifiers/quote-minifier";
import { SerializedQuoteNode } from "@lexical/rich-text";
import { create, oneOf } from "./utils";

describe("quote-minifier", () => {
  it("should minify and unminify data correctly", async () => {
    const serialized: SerializedQuoteNode = {
      children: [],
      type: "quote",
      direction: "rtl",
      format: "start",
      indent: 0,
      version: 1,
    };
    const minified = quoteMinifier.minify(serialized);

    expect(minified).toEqual({
      c: [],
      d: 2,
      f: 6,
      t: "q",
      v: 1,
    });

    const outputData = quoteMinifier.unminify(minified);

    expect(outputData).toEqual(serialized);
  });

  it("should minify and unminify different quote nodes", () => {
    const quotes = create<SerializedQuoteNode>({
      children: [],
      direction: oneOf("ltr", "rtl", null),
      format: oneOf("left", "start", "center", "right", "end", "justify", ""),
      indent: 4,
      type: "quote",
      version: 1,
    });
    quotes.forEach((q) => {
      const minified = quoteMinifier.minify(q);
      const unminified = quoteMinifier.unminify(minified);
      expect(unminified).toEqual(q);
    });
  });
});
