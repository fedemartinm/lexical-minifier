import {
  $createHeadingNode,
  $createQuoteNode,
  HeadingNode,
  QuoteNode,
} from "@lexical/rich-text";
import {
  $createListItemNode,
  $createListNode,
  ListItemNode,
  ListNode,
} from "@lexical/list";
import {
  $createParagraphNode,
  $createTextNode,
  $getRoot,
  NodeKey,
  SerializedTextNode,
  TextNode,
} from "lexical";
import { $createLinkNode, LinkNode, AutoLinkNode } from "@lexical/link";
import { CodeNode, CodeHighlightNode } from "@lexical/code";
import { TableNode, TableRowNode, TableCellNode } from "@lexical/table";

import { createHeadlessEditor } from "@lexical/headless";
import { fromArrayPack, minify, toArrayPack, unminify } from "../src/utils";

export class ColoredNode extends TextNode {
  __color: string;

  constructor(text: string, color: string, key?: NodeKey) {
    super(text, key);
    this.__color = color;
  }

  static getType(): string {
    return "colored-node";
  }

  exportJSON() {
    return {
      type: "colored-node",
      version: 1,
      color: this.__color,
    } as unknown as SerializedTextNode;
  }
}

function $createColoredNode(text: string, color: string) {
  return new ColoredNode(text, color);
}

const REGISTERED_NODES = [
  ColoredNode,
  HeadingNode,
  ListNode,
  ListItemNode,
  QuoteNode,
  CodeNode,
  CodeHighlightNode,
  TableNode,
  TableCellNode,
  TableRowNode,
  AutoLinkNode,
  LinkNode,
];

function prepopulatedTextWithCustomNode() {
  const root = $getRoot();

  const heading = $createHeadingNode("h1");
  heading.append($createTextNode("Welcome to the Markdown example"));
  root.append(heading);

  const paragraph = $createParagraphNode();
  const customNode = $createColoredNode("This is a custom node", "red");

  paragraph.append(customNode);
  root.append(paragraph);
}

export default function prepopulatedText() {
  const root = $getRoot();

  const heading = $createHeadingNode("h1");
  heading.append($createTextNode("Welcome to the Markdown example"));
  root.append(heading);
  const quote = $createQuoteNode();
  quote.append($createTextNode("This is a quote node."));

  root.append(quote);
  const paragraph = $createParagraphNode();
  paragraph.append(
    $createTextNode("Here are some text formats: "),
    $createTextNode("code").toggleFormat("code"),
    $createTextNode(", "),
    $createTextNode("bold").toggleFormat("bold"),
    $createTextNode(", "),
    $createTextNode("italic").toggleFormat("italic"),
    $createTextNode(" and so on."),
  );
  root.append(paragraph);

  const paragraph2 = $createParagraphNode();
  paragraph2.append($createTextNode(`Here is a list example:`));
  root.append(paragraph2);
  const list = $createListNode("bullet");
  list.append(
    $createListItemNode().append(
      $createTextNode(`These are links (e.g., `),
      $createLinkNode("https://lexical.dev/").append(
        $createTextNode("Lexical website"),
      ),
      $createTextNode(`).`),
    ),
    $createListItemNode().append(
      $createTextNode(`Press twice on the link to see and edit the URL.`),
    ),
  );
  root.append(list);
  const paragraph3 = $createParagraphNode();
  paragraph3.append(
    $createTextNode(
      `Press the bottom right button to switch to Markdown & vice versa.`,
    ),
  );
  root.append(paragraph3);
}
const consoleInfoSpy = jest.spyOn(console, "info").mockImplementation(() => {});
const consoleWarnSpy = jest.spyOn(console, "warn").mockImplementation(() => {});

describe("text-minifier-utils", () => {
  it("should minify and unminify editor data correctly", async () => {
    const editor = createHeadlessEditor({
      nodes: REGISTERED_NODES,
    });
    await editor.update(prepopulatedText);
    const editorState = editor.getEditorState().toJSON();

    return new Promise<void>(async (done) => {
      await editor.update(() => {
        const minified = minify($getRoot());
        const serialized = unminify(minified);
        const arrayPack = toArrayPack(minified);

        expect(minified).toEqual(fromArrayPack(arrayPack));
        expect(serialized).toEqual(editorState.root);
        done();
      });
    });
  });

  it("should skip unregistered node types", async () => {
    const editor = createHeadlessEditor({
      nodes: REGISTERED_NODES,
    });
    await editor.update(prepopulatedTextWithCustomNode);
    const editorState = editor.getEditorState().toJSON();

    return new Promise<void>(async (done) => {
      await editor.update(() => {
        const minified = minify($getRoot());
        const serialized = unminify(minified);
        const arrayPack = toArrayPack(minified);

        expect(minified).toEqual(fromArrayPack(arrayPack));
        expect(serialized).toEqual(editorState.root);
        expect(consoleInfoSpy).toHaveBeenCalledWith(
          'No minifiers are registered for type:"colored-node", version:1. Keeping original value.',
        );
        expect(consoleWarnSpy).toHaveBeenCalledWith(
          "No minifier was found for type colored-node.",
        );

        done();
      });
    });
  });
});
