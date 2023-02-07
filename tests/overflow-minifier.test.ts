import overflowMinifier from "../src/minifiers/overflow-minifier";
import { SerializedOverflowNode } from "@lexical/overflow";
import { create, oneOf } from "./utils";

describe("overflow-minifier", () => {
  it("should minify and unminify data correctly", async () => {
    const serialized: SerializedOverflowNode = {
      children: [],
      type: "overflow",
      direction: null,
      format: "",
      indent: 1,
      version: 1,
    };
    const minified = overflowMinifier.minify(serialized);

    expect(minified).toEqual({
      c: [],
      i: 1,
      t: "o",
      v: 1,
    });

    const outputData = overflowMinifier.unminify(minified);

    expect(outputData).toEqual(serialized);
  });

  it("should minify and unminify different overflow nodes", () => {
    const overflows = create<SerializedOverflowNode>({
      children: [],
      direction: oneOf("ltr", "rtl", null),
      format: oneOf("left", "start", "center", "right", "end", "justify", ""),
      indent: oneOf(0, 1, 2),
      type: "overflow",
      version: 1,
    });
    overflows.forEach((o) => {
      const minified = overflowMinifier.minify(o);
      const unminified = overflowMinifier.unminify(minified);
      expect(unminified).toEqual(o);
    });
  });
});
