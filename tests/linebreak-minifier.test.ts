import lineBreakMinifier from "../src/minifiers/linebreak-minifier";
import { SerializedLineBreakNode } from "lexical";

describe("linebreak-minifier", () => {
  it("should minify and unminify data correctly", async () => {
    const serialized: SerializedLineBreakNode = {
      type: "linebreak",
      version: 1,
    };
    const minified = lineBreakMinifier.minify(serialized);

    expect(minified).toEqual({
      t: "b",
      v: 1,
    });

    const outputData = lineBreakMinifier.unminify(minified);

    expect(outputData).toEqual(serialized);
  });
});
