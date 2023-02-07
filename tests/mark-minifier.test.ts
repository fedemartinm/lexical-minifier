import markMinifier from "../src/minifiers/mark-minifier";
import { SerializedMarkNode } from "@lexical/mark";
import { create, oneOf } from "./utils";

describe("mark-minifier", () => {
  it("should minify and unminify data correctly", async () => {
    const serialized: SerializedMarkNode = {
      ids: ["a", "b", "c"],
      children: [],
      type: "mark",
      direction: null,
      format: "",
      indent: 0,
      version: 1,
    };
    const minified = markMinifier.minify(serialized);

    expect(minified).toEqual({
      y: ["a", "b", "c"],
      c: [],
      t: "m",
      v: 1,
    });

    const outputData = markMinifier.unminify(minified);

    expect(outputData).toEqual(serialized);
  });

  it("should minify and unminify different mark nodes", () => {
    const marks = create<SerializedMarkNode>({
      ids: oneOf([], ["a", "b", "c"]),
      children: [],
      direction: "ltr",
      format: "",
      indent: 0,
      type: "mark",
      version: 1,
    });
    marks.forEach((q) => {
      const minified = markMinifier.minify(q);
      const unminified = markMinifier.unminify(minified);
      expect(unminified).toEqual(q);
    });
  });
});
