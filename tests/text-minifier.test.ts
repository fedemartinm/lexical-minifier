import { SerializedTextNode } from "lexical";
import textMinifier from "../src/minifiers/text-minifier";
import { create, oneOf } from "./utils";

describe("text-minifier", () => {
  it("should minify and unminify data correctly", async () => {
    const serialized: SerializedTextNode = {
      detail: 0,
      format: 0,
      mode: "normal",
      style: "",
      text: "text node",
      type: "text",
      version: 1,
    };
    const minified = textMinifier.minify(serialized);

    expect(minified).toEqual({
      x: "text node",
      t: "t",
      v: 1,
    });

    const outputData = textMinifier.unminify(minified);

    expect(outputData).toEqual(serialized);
  });

  it("should minify and unminify text nodes with different properties", () => {
    const textNodes = create<SerializedTextNode>({
      detail: oneOf(0, 1),
      format: oneOf(0, 1),
      mode: oneOf("normal", "token", "segmented"),
      style: "style",
      text: "text node",
      type: "text",
      version: 1,
    });
    textNodes.forEach((t) => {
      const minified = textMinifier.minify(t);
      const unminified = textMinifier.unminify(minified);
      expect(unminified).toEqual(t);
    });
  });
});
