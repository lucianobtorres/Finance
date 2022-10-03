export interface IDictionary<T> {
  [Key: number]: T;
}

export class Dictionary<T> implements IDictionary<T>{
  [Key: number]: T;

  _keys: number[] = [];
  _values: T[] = [];

  add(key: number, value: T) {
    this[key] = value;
    this._keys.push(key);
    this._values.push(value);
  }

  keys(): number[] {
    return this._keys;
  }

  values(): T[] {
    return this._values;
  }

  containsKey(key: number) {
    if (typeof this[key] === undefined) {
      return false;
    }

    return this._keys.some(x => key == x);
  }
}
