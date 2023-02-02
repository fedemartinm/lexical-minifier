/**
 * The LookupTable class is a generic data structure used to map between a set of values `V` and an index `number`.
 * It provides two methods, `fromKey` and `toKey`, to perform the mapping between an index and a value and vice versa.
 *
 * @template V - Represents the type of values that will be mapped in the LookupTable
 */
export class LookupTable<V> {
  private readonly kToV: Map<number, V>;
  private readonly vToK: Map<V, number>;

  /**
   * Constructor for initializing the LookupTable
   * @param elements - an array of type V, representing the values to be mapped
   */
  constructor(elements: Array<V>) {
    this.kToV = new Map(elements.map((v, i) => [i, v]));
    this.vToK = new Map(elements.map((v, i) => [v, i]));
  }

  /**
   * Public method for mapping from index to value
   * @param index - the index to map from
   * @returns The value associated with the given index, of type V
   */
  public fromKey(index: number): V {
    return <V>this.kToV.get(index);
  }

  /**
   * Public method for mapping from value to index
   * @param value - the value to map from
   * @returns The index associated with the given value, of type number
   */
  public toKey(value: V) {
    return <number>this.vToK.get(value);
  }
}
