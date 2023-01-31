export namespace CommonRegex {
  /**
   * 匹配圆括号内的内容
   */
  export const parentheses = /[(]+(.*?)[)]+/gm;

  export const htmlTag = /(<([^>]+)>)/gim;

  export const htmlTagWithoutNameMatch = /(<.*?>)/gm;
}
