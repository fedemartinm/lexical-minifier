import { SerializedAutoLinkNode } from "@lexical/link";
import autoLinkMinifier from "../src/minifiers/auto-link-minifier";
import { create, oneOf } from "./utils";

describe("autolink-minifier", () => {
  it("should minify and unminify data correctly", async () => {
    const serialized: SerializedAutoLinkNode = {
      children: [],
      direction: null,
      format: "",
      indent: 0,
      rel: "external",
      target: "_blank",
      url: "https://google.com/",
      type: "autolink",
      version: 1,
    };
    const minified = autoLinkMinifier.minify(serialized);

    expect(minified).toEqual({
      c: [],
      r: "external",
      x: "_blank",
      u: "https://google.com/",
      t: "u",
      v: 1,
    });

    const outputData = autoLinkMinifier.unminify(minified);

    expect(outputData).toEqual(serialized);
  });

  it("should minify and unminify autolink nodes with different properties", () => {
    const autolinks = create<SerializedAutoLinkNode>({
      children: [],
      direction: oneOf("ltr", "rtl", null),
      format: oneOf("left", "start", "center", "right", "end", "justify", ""),
      indent: oneOf(0, 1, 2),
      rel: oneOf(null, "external", "apple-touch-icon-precomposed"),
      target: oneOf(null, "_blank", "_self"),
      url: oneOf("https://github.com/", "https://google.com/"),
      type: "autolink",
      version: 1,
    });
    autolinks.forEach((l) => {
      const minified = autoLinkMinifier.minify(l);
      const unminified = autoLinkMinifier.unminify(minified);
      expect(unminified).toEqual(l);
    });
  });
});
