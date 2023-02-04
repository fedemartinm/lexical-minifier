import tablerowMinifier from "../src/minifiers/table-row-minifier";
import { SerializedTableRowNode } from "@lexical/table";
import { create, oneOf } from "./utils";

describe("table-row-minifier", () => {
  it("should minify and unminify data correctly", async () => {
    const serialized: SerializedTableRowNode = {
      height: 50,
      children: [],
      type: "tablerow",
      direction: "rtl",
      format: "start",
      indent: 0,
      version: 1,
    };
    const minified = tablerowMinifier.minify(serialized);

    expect(minified).toEqual({
      h: 50,
      c: [],
      d: 2,
      f: 6,
      i: 0,
      t: "3",
      v: 1,
    });

    const outputData = tablerowMinifier.unminify(minified);

    expect(outputData).toEqual(serialized);
  });

  it("should minify and unminify different table-row nodes", () => {
    const rowNodes = create<SerializedTableRowNode>({
      height: 50,
      children: [],
      direction: oneOf("ltr", "rtl", null),
      format: oneOf("left", "start", "center", "right", "end", "justify", ""),
      indent: oneOf(0, 1, 2),
      type: "tablerow",
      version: 1,
    });
    rowNodes.forEach((p) => {
      const minified = tablerowMinifier.minify(p);
      const unminified = tablerowMinifier.unminify(minified);
      expect(unminified).toEqual(p);
    });
  });
});
