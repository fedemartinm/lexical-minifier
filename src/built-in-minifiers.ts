import linkMinifier from "./minifiers/link-minifier";
import rootMinifier from "./minifiers/root-minifier";
import textMinifier from "./minifiers/text-minifier";
import lineBreakMinifier from "./minifiers/linebreak-minifier";
import paragraphMinifier from "./minifiers/paragraph-minifier";

export const DEFAULT_MINIFIERS = {
  root: rootMinifier,
  text: textMinifier,
  link: linkMinifier,
  linebreak: lineBreakMinifier,
  paragraph: paragraphMinifier,
};

export type DefaultMinifiersType = keyof typeof DEFAULT_MINIFIERS;
