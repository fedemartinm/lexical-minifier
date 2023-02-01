import type { DefaultMinifiersType } from "./built-in-minifiers";
import type { GenericMinifier } from "./types";
import { DEFAULT_MINIFIERS } from "./built-in-minifiers";
import noMinifier from "./minifiers/no-minifier";

/**
 * The LexicalMinifier class provides a way to manage and access minifiers for lexical nodes.
 */
export class LexicalMinifier {
  private minifiers;

  constructor() {
    this.minifiers = DEFAULT_MINIFIERS;
  }

  private isRegistered(type: string): type is DefaultMinifiersType {
    return type in this.minifiers;
  }

  /**
   * Use this method to register a new minifier.
   *
   * Register and replace are essentially the same method, the difference is in the type of the 'type' argument.
   * 'register' allows you to add a new minifier and quickly check if the minifier you want to register is already provided by this package.
   * 'replace' intentionally lets you replace a minifier provided by this package.
   * @param type lexical type
   * @param minifier minifier created with buildMinifier method
   */
  public register<T extends string>(
    type: T extends DefaultMinifiersType ? never : T,
    minifier: any,
  ) {
    this.minifiers = { ...this.minifiers, [type]: minifier };
  }

  /**
   * Use this method to replace a base minifier.
   *
   * Register and replace are essentially the same method, the difference is in the type of the 'type' argument.
   * 'register' allows you to add a new minifier and quickly check if the minifier you want to register is already provided by this package.
   * 'replace' intentionally lets you replace a minifier provided by this package.
   * @param type lexical type
   * @param minifier minifier created with buildMinifier method
   */
  public replace<T extends string>(
    type: T extends DefaultMinifiersType ? T : never,
    minifier: any,
  ) {
    this.minifiers = { ...this.minifiers, [type]: minifier };
  }

  /**
   * This method is used to retrieve a minifier for a specific lexical node. If a minifier
   * for the specified type is registered, the method returns it, otherwise it returns the
   * default "noop" minifier.
   */
  public get(type: string): GenericMinifier {
    if (this.isRegistered(type)) {
      return this.minifiers[type];
    } else {
      return <GenericMinifier>noMinifier;
    }
  }

  /**
   * Retrieve the minifier for a given minified type. If a minifier is found, return it.
   * Otherwise, return the default "noop" minifier.
   */
  public getByMinifiedType(minifiedType: string): GenericMinifier {
    const minifier = Object.values(this.minifiers).find((minifier) => {
      if (minifier.config.minifiedType === minifiedType) {
        return minifier;
      }
    });
    if (typeof minifier !== "undefined") {
      return <GenericMinifier>(<unknown>minifier);
    }
    return <GenericMinifier>noMinifier;
  }
}
