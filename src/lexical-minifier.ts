import type { DefaultMinifiersType } from "./built-in-minifiers";
import { DEFAULT_MINIFIERS } from "./built-in-minifiers";
import noMinifier from "./minifiers/no-minifier";
import { Minifier } from "./types";

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

  private throwIfDuplicatedMinifier(minifier: any) {
    const registered = Object.values(this.minifiers).find(
      (min) => min.config.minifiedType === minifier.config.minifiedType,
    );
    if (registered && registered?.config.type !== minifier.config.type) {
      throw new Error(
        `Minifier with minified type '${minifier.config.minifiedType}' already exists ` +
          `for a different type (${registered?.config.type}).`,
      );
    }
  }

  /**
   * Use this method to register a new minifier.
   *
   * Register and replace are essentially the same method, the difference is in the type of the `type` argument.
   * `register` allows you to add a new minifier and quickly check if the minifier you want to register is already provided by this package.
   * `replace` intentionally lets you replace a minifier provided by this package.
   * @param type lexical type
   * @param minifier minifier created with buildMinifier method
   */
  public register<T extends string>(
    type: T extends DefaultMinifiersType ? never : T,
    minifier: any,
  ) {
    if (__DEV__) {
      /* istanbul ignore next */
      if (type in this.minifiers) {
        console.warn(
          `This package already includes a minifier for type ${type}. ` +
            `If you intentionally want to replace the minifier, use the replace function to avoid this warning.`,
        );
      }
    }
    this.throwIfDuplicatedMinifier(minifier);
    this.minifiers = { ...this.minifiers, [type]: minifier };
  }

  /**
   * Use this method to replace a base minifier.
   *
   * Register and replace are essentially the same method, the difference is in the type of the `type` argument.
   * `register` allows you to add a new minifier and quickly check if the minifier you want to register is already provided by this package.
   * `replace` intentionally lets you replace a minifier provided by this package.
   * @param type lexical type
   * @param minifier minifier created with buildMinifier method
   */
  public replace<T extends string>(
    type: T extends DefaultMinifiersType ? T : never,
    minifier: any,
  ) {
    if (__DEV__) {
      /* istanbul ignore next */
      if (type in this.minifiers === false) {
        console.warn(
          `There are no registered minifiers for ${type}. ` +
            `Check the specified type or use the register method.`,
        );
      }
    }
    this.throwIfDuplicatedMinifier(minifier);
    this.minifiers = { ...this.minifiers, [type]: minifier };
  }

  /**
   * This method is used to retrieve a minifier for a specific lexical node. If a minifier
   * for the specified type is registered, the method returns it, otherwise it returns the
   * default `noop` minifier.
   */
  public get(type: string): Minifier {
    if (this.isRegistered(type)) {
      return this.minifiers[type];
    } else {
      if (__DEV__) {
        console.warn(`No minifier was found for type ${type}.`);
      }
      return <Minifier>noMinifier;
    }
  }

  /**
   * Retrieve the minifier for a given minified type. If a minifier is found, return it.
   * Otherwise, return the default `noop` minifier.
   */
  public getByMinifiedType(minifiedType: string): Minifier {
    const minifier = Object.values(this.minifiers).find((minifier) => {
      if (minifier.config.minifiedType === minifiedType) {
        return minifier;
      }
    });
    if (typeof minifier !== "undefined") {
      return <Minifier>minifier;
    }
    if (__DEV__) {
      console.warn(`No minifier was found for minified-type ${minifiedType}.`);
    }
    return <Minifier>noMinifier;
  }
}
