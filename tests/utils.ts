type Shape<T> = {
  [key in keyof T]: any;
};

function isGenerator(obj: any): obj is Generator {
  return (
    !Array.isArray(obj) &&
    typeof obj === "object" &&
    typeof obj[Symbol.iterator] === "function"
  );
}

/**
 * Generates the next value in a sequence of values passed as arguments.
 *
 * @param args - Values to generate a sequence from.
 * @returns A generator that yields each value in `args` or returns the last value if the sequence has ended.
 */
export function* oneOf(...args: any[]) {
  let index = 0;
  while (index < args.length) {
    if (index < args.length - 1) {
      yield args[index];
    } else {
      return args[index];
    }
    index++;
  }
}

/**
 * Generates an array of objects based on a given shape.
 *
 * @param shape - A shape that defines the structure and values of the objects to generate.
 * @returns An array of objects generated from the `shape`.
 */
export function create<T>(shape: Shape<T>): T[] {
  const values: T[] = [];
  let shouldContinue = true;
  let item: any = {};

  while (shouldContinue) {
    shouldContinue = false;

    Object.entries(shape).forEach(([key, def]: [string, any]) => {
      if (isGenerator(def)) {
        const { value, done } = def.next();
        if (done === false) {
          shouldContinue = true;
          item[key] = value;
        } else if (typeof value !== "undefined") {
          item[key] = value;
        }
      } else {
        item[key] = def;
      }
    });
    values.push(<T>{ ...item });
  }

  return values;
}
