import tableCellMinifier from "../src/minifiers/table-cell-minifier";
import { SerializedTableCellNode } from "@lexical/table";
import { create, oneOf } from "./utils";

describe("table-cell-minifier", () => {
  it("should minify and unminify data correctly", async () => {
    const serialized: SerializedTableCellNode = {
      headerState: 0,
      width: 100,
      colSpan: 1,
      children: [],
      type: "tablecell",
      direction: "rtl",
      format: "start",
      indent: 0,
      version: 1,
    };
    const minified = tableCellMinifier.minify(serialized);

    expect(minified).toEqual({
      h: 0,
      w: 100,
      s: 1,
      c: [],
      d: 2,
      f: 6,
      i: 0,
      t: "y",
      v: 1,
    });

    const outputData = tableCellMinifier.unminify(minified);

    expect(outputData).toEqual(serialized);
  });

  it("should minify and unminify different table-cell nodes", () => {
    const cellNodes = create<SerializedTableCellNode>({
      headerState: 0,
      width: oneOf(undefined, 10),
      colSpan: 0,
      children: [],
      direction: oneOf("ltr", "rtl", null),
      format: oneOf("left", "start", "center", "right", "end", "justify", ""),
      indent: oneOf(0, 1, 2),
      type: "tablecell",
      version: 1,
    });
    cellNodes.forEach((p) => {
      const minified = tableCellMinifier.minify(p);
      const unminified = tableCellMinifier.unminify(minified);
      expect(unminified).toEqual(p);
    });
  });
});
