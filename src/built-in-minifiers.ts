import linkMinifier from "./minifiers/link-minifier";
import rootMinifier from "./minifiers/root-minifier";
import textMinifier from "./minifiers/text-minifier";
import codeMinifier from "./minifiers/code-minifier";
import markMinifier from "./minifiers/mark-minifier";
import quoteMinifier from "./minifiers/quote-minifier";
import headingMinifier from "./minifiers/heading-minifier";
import overflowMinifier from "./minifiers/overflow-minifier";
import autoLinkMinifier from "./minifiers/auto-link-minifier";
import lineBreakMinifier from "./minifiers/linebreak-minifier";
import paragraphMinifier from "./minifiers/paragraph-minifier";
import listItemMinifier from "./minifiers/list-item-minifier";
import listNodeMinifier from "./minifiers/list-node-minifier";
import tableMinifier from "./minifiers/table-minifier";
import tableRowMinifier from "./minifiers/table-row-minifier";
import tableCellMinifier from "./minifiers/table-cell-minifier";

export const DEFAULT_MINIFIERS = {
  root: rootMinifier,
  text: textMinifier,
  link: linkMinifier,
  code: codeMinifier,
  mark: markMinifier,
  table: tableMinifier,
  quote: quoteMinifier,
  list: listNodeMinifier,
  heading: headingMinifier,
  listitem: listItemMinifier,
  overflow: overflowMinifier,
  autolink: autoLinkMinifier,
  tablerow: tableRowMinifier,
  tablecell: tableCellMinifier,
  linebreak: lineBreakMinifier,
  paragraph: paragraphMinifier,
};

export type DefaultMinifiersType = keyof typeof DEFAULT_MINIFIERS;
