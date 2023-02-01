/**
 * The LookupTable class is a generic data structure used to map between a set of values (V) and an index (number).
 * It provides two methods, "fromKey" and "toKey", to perform the mapping between an index and a value and vice versa.
 */
export class LookupTable<V> {
  private readonly kToV: Map<number, V>;
  private readonly vToK: Map<V, number>;

  constructor(elements: Array<V>) {
    this.kToV = new Map(elements.map((v, i) => [i, v]));
    this.vToK = new Map(elements.map((v, i) => [v, i]));
  }

  public fromKey(index: number): V {
    return <V>this.kToV.get(index);
  }

  public toKey(value: V) {
    return <number>this.vToK.get(value);
  }
}
