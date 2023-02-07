import tableMinifier from "../src/minifiers/table-minifier";
import { SerializedTableNode } from "@lexical/table";
import { create, oneOf } from "./utils";

describe("table-minifier", () => {
  it("should minify and unminify data correctly", async () => {
    const serialized: SerializedTableNode = {
      children: [],
      type: "table",
      direction: "rtl",
      format: "start",
      indent: 0,
      version: 1,
    };
    const minified = tableMinifier.minify(serialized);

    expect(minified).toEqual({
      c: [],
      d: 2,
      f: 6,
      t: "b",
      v: 1,
    });

    const outputData = tableMinifier.unminify(minified);

    expect(outputData).toEqual(serialized);
  });

  it("should minify and unminify different table nodes", () => {
    const tables = create<SerializedTableNode>({
      children: [],
      direction: oneOf("ltr", "rtl", null),
      format: oneOf("left", "start", "center", "right", "end", "justify", ""),
      indent: oneOf(0, 1, 2),
      type: "table",
      version: 1,
    });
    tables.forEach((p) => {
      const minified = tableMinifier.minify(p);
      const unminified = tableMinifier.unminify(minified);
      expect(unminified).toEqual(p);
    });
  });
});
