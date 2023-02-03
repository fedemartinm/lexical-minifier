import { SerializedRootNode } from "lexical";
import rootMinifier from "../src/minifiers/root-minifier";
import { create, oneOf } from "./utils";

describe("root-minifier", () => {
  it("should minify and unminify data correctly", async () => {
    const serialized: SerializedRootNode = {
      children: [],
      type: "root",
      direction: null,
      format: "",
      indent: 0,
      version: 1,
    };
    const minified = rootMinifier.minify(serialized);

    expect(minified).toEqual({
      c: [],
      d: 0,
      f: 0,
      i: 0,
      t: "r",
      v: 1,
    });

    const outputData = rootMinifier.unminify(minified);

    expect(outputData).toEqual(serialized);
  });

  it("should minify and unminify root nodes with different properties", () => {
    const rootNodes = create<SerializedRootNode>({
      children: [],
      direction: oneOf("ltr", "rtl", null),
      format: oneOf("left", "start", "center", "right", "end", "justify", ""),
      indent: oneOf(0, 1, 2),
      type: "root",
      version: 1,
    });
    rootNodes.forEach((root) => {
      const minified = rootMinifier.minify(root);
      const unminified = rootMinifier.unminify(minified);
      expect(unminified).toEqual(root);
    });
  });
});
