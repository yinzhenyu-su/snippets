export type DeepSet<T, Key extends string, Func extends () => any> = T extends
  | Function
  | number
  | null
  | string
  | symbol
  ? T
  : T extends any[]
  ? T extends [infer A, ...infer B]
    ? [DeepSet<A, Key, Func>, ...DeepSet<B, Key, Func>]
    : [DeepSet<T[0], Key, Func>]
  : {
      [k in keyof T]: T[k] extends object ? DeepSet<T[k], Key, Func> : T[k];
    } & { [k in Key]: ReturnType<Func> };

/**
 * deep set key to obj
 * @param obj any object
 * @param key key to set
 * @param func get value func
 * @returns obj with deep set key
 */
export function deepSet<T, K extends string, V extends () => any>(
  obj: T,
  key: K,
  func: V,
): DeepSet<T, K, V> {
  if (!func) return obj as any;
  if (typeof obj === "object") {
    if (Array.isArray(obj)) {
      obj.forEach((d) => deepSet(d, key, func));
    } else if (obj !== null) {
      if (!(key in obj)) {
        (obj as any)[key] = func();
      }
      for (const k in obj) {
        deepSet(obj[k], key, func);
      }
    }
  }
  return obj as any;
}

export type DeepDel<T, Key extends string> = T extends
  | Function
  | number
  | null
  | string
  | symbol
  ? T
  : T extends any[]
  ? T extends [infer A, ...infer B]
    ? [DeepDel<A, Key>, ...DeepDel<B, Key>]
    : [DeepDel<T[0], Key>]
  : Omit<
      {
        [k in keyof T]: T[k] extends object ? DeepDel<T[k], Key> : T[k];
      },
      Key
    >;

/**
 * deep delete key from obj
 * @param obj any obj
 * @param key key to delete
 * @returns obj without key
 */
export function deepDel<T, K extends string>(obj: T, key: K): DeepDel<T, K> {
  if (typeof obj === "object") {
    if (Array.isArray(obj)) {
      obj.forEach((d) => deepDel(d, key));
    } else if (obj !== null) {
      delete (obj as any)[key];
      for (const k in obj) {
        deepDel(obj[k], key);
      }
    }
  }
  return obj as any;
}