import { SerializedLinkNode } from "@lexical/link";
import linkMinifier from "../src/minifiers/link-minifier";
import { create, oneOf } from "./utils";

describe("link-minifier", () => {
  it("should minify and unminify data correctly", async () => {
    const serialized: SerializedLinkNode = {
      children: [],
      direction: "ltr",
      format: "center",
      indent: 0,
      rel: "external",
      target: "_blank",
      url: "https://github.com/",
      type: "link",
      version: 1,
    };
    const minified = linkMinifier.minify(serialized);

    expect(minified).toEqual({
      c: [],
      d: 1,
      f: 1,
      r: "external",
      x: "_blank",
      u: "https://github.com/",
      t: "l",
      v: 1,
    });

    const outputData = linkMinifier.unminify(minified);

    expect(outputData).toEqual(serialized);
  });

  it("should minify and unminify link nodes with different properties", () => {
    const links = create<SerializedLinkNode>({
      children: [],
      direction: oneOf("ltr", "rtl", null),
      format: oneOf("left", "start", "center", "right", "end", "justify", ""),
      indent: oneOf(0, 1, 2),
      rel: oneOf("external", "apple-touch-icon-precomposed"),
      target: oneOf("_blank", "_self"),
      url: oneOf("https://github.com/", "https://google.com/"),
      type: "link",
      version: 1,
    });
    links.forEach((l) => {
      const minified = linkMinifier.minify(l);
      const unminified = linkMinifier.unminify(minified);
      expect(unminified).toEqual(l);
    });
  });
});
