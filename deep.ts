export type DeepSet<
  T extends any,
  Key extends string,
  Func extends () => any,
> = T extends Function | number | null | string | symbol | undefined
  ? T
  : T extends (infer A)[]
  ? A extends object
    ? DeepSet<A, Key, Func>[]
    : A extends Function | number | null | string | symbol | undefined
    ? A[]
    : [DeepSet<A, Key, Func>]
  : {
      [k in keyof T]: T[k] extends object ? DeepSet<T[k], Key, Func> : T[k];
    } & { [k in Key]: ReturnType<Func> };

/**
 * deep set key to obj
 * @param obj any object
 * @param func get value func
 * @param key key to set
 * @default "_uid"
 * @returns obj with deep set key
 */
export function deepSet<T, V extends () => any, K extends string = "_uid">(
  obj: T,
  func: V,
  key = "_uid" as K,
): DeepSet<T, K, V> {
  if (!func) return obj as any;
  if (typeof obj === "object") {
    if (Array.isArray(obj)) {
      obj.forEach((d) => deepSet(d, func, key));
    } else if (obj !== null) {
      if (!Object.keys(obj).includes(key as string)) {
        (obj as any)[key] = func();
      }
      for (const k in obj) {
        deepSet(obj[k], func, key);
      }
    }
  }
  return obj as any;
}

export type DeepDel<T, Key extends (string | symbol | number)[]> = T extends
  | Function
  | number
  | null
  | string
  | symbol
  | undefined
  ? T
  : T extends (infer A)[]
  ? A extends object
    ? DeepDel<A, Key>[]
    : A extends Function | number | null | string | symbol | undefined
    ? A[]
    : [DeepDel<A, Key>]
  : Pick<
      { [k in keyof T]: T[k] extends object ? DeepDel<T[k], Key> : T[k] },
      Exclude<keyof T, Key[number]>
    >;

/**
 * deep delete key from obj
 * @param obj any obj
 * @param keys keys to delete
 * @default ["_uid"]
 * @returns obj without key
 */
export function deepDel<T, K extends (string | symbol | number)[]>(
  obj: T,
  ...keys: K
): DeepDel<T, K> {
  if (typeof obj === "object") {
    if (Array.isArray(obj)) {
      obj.forEach((d) => deepDel(d, ...keys));
    } else if (obj !== null) {
      keys.forEach((k) => {
        delete (obj as any)[k];
      });
      for (const k in obj) {
        deepDel(obj[k], ...keys);
      }
    }
  }
  return obj as any;
}

// const data = {
//   str: [""],
//   number: 0,
//   arr: [{ child: {}, data: {} }, { child: {} }],
//   test: { id: "" },
//   func: () => {},
// };

// console.log(deepSet(data, () => Date.now()).str);
// console.log(deepDel(data, "test", "str", "arr"));