import { buildMinifier } from "../src/builder";
import { LexicalMinifier } from "../src/lexical-minifier";

describe("lexical-minifier", () => {
  it("should not have two minifiers for the same type", () => {
    const minifier = new LexicalMinifier();
    const minifiersArray = Object.values(minifier["minifiers"]);

    expect(minifiersArray.length).toBe(new Set(minifiersArray).size);
  });

  it("should throw an exception if there are two minifiers with the same minified-type", () => {
    const minifier = new LexicalMinifier();
    const wrongTestMinifier = buildMinifier(
      {
        type: "custom-paragraph",
        minifiedType: "p",
        version: 1,
      },
      (_, config) => ({
        t: config.minifiedType,
        v: config.version,
      }),
      (_, config) => ({
        type: config.type,
        version: config.version,
      }),
    );

    expect(() =>
      minifier.register("custom-paragraph", wrongTestMinifier),
    ).toThrow();
  });

  it("should register a custom minifier", () => {
    const minifier = new LexicalMinifier();
    const testMinifier = buildMinifier(
      {
        type: "colored-node",
        minifiedType: "cn",
        version: 1,
      },
      (_, config) => ({
        t: config.minifiedType,
        v: config.version,
      }),
      (_, config) => ({
        type: config.type,
        version: config.version,
      }),
    );
    minifier.register("colored-node", testMinifier);

    expect(minifier.get("colored-node")).toBe(testMinifier);
    expect(minifier.getByMinifiedType("cn")).toBe(testMinifier);
  });

  it("should allow replacing a registered minifier", () => {
    const minifier = new LexicalMinifier();
    const nextParagraphMinifer = buildMinifier(
      {
        type: "paragraph",
        minifiedType: "p",
        version: 2,
      },
      (_, config) => ({
        t: config.minifiedType,
        v: config.version,
      }),
      (_, config) => ({
        type: config.type,
        version: config.version,
      }),
    );
    minifier.replace("paragraph", nextParagraphMinifer);
  });

  it("should skip minification and unminification on nodes that don't have a minifier", () => {
    const minifier = new LexicalMinifier();
    const data = {
      url: "url",
      type: "video",
      version: 1,
    };
    const consoleWarnMock = jest.spyOn(console, "warn").mockImplementation();

    expect(minifier.get("video").minify(data)).toBe(data);
    expect(minifier.getByMinifiedType("video").unminify(data)).toBe(data);
    expect(console.warn).toHaveBeenCalledTimes(2);

    consoleWarnMock.mockRestore();
  });
});
