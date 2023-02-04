import listItemMinifier from "../src/minifiers/list-item-minifier";
import { SerializedListItemNode } from "@lexical/list";
import { create, oneOf } from "./utils";

describe("list-item-minifier", () => {
  it("should minify and unminify data correctly", async () => {
    const serialized: SerializedListItemNode = {
      checked: true,
      value: 0,
      children: [],
      type: "listitem",
      direction: "rtl",
      format: "start",
      indent: 0,
      version: 1,
    };
    const minified = listItemMinifier.minify(serialized);

    expect(minified).toEqual({
      k: 1,
      w: 0,
      c: [],
      d: 2,
      f: 6,
      i: 0,
      t: "i",
      v: 1,
    });

    const outputData = listItemMinifier.unminify(minified);

    expect(outputData).toEqual(serialized);
  });

  it("should minify and unminify different list-item nodes", () => {
    const items = create<SerializedListItemNode>({
      children: [],
      checked: oneOf(true, false, undefined),
      value: oneOf(0, 1),
      direction: oneOf("ltr", "rtl", null),
      format: oneOf("left", "start", "center", "right", "end", "justify", ""),
      indent: oneOf(0, 1, 2),
      type: "listitem",
      version: 1,
    });
    items.forEach((item) => {
      const minified = listItemMinifier.minify(item);
      const unminified = listItemMinifier.unminify(minified);
      expect(unminified).toEqual(item);
    });
  });
});
