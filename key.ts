/* eslint-disable no-unused-vars */
/**
 * 仓库key，每个字段的值要求全局唯一，所以把路径组合作为字段值
 */
const storeKey = {
  Base: {
    file: {
      preplanQuestion: "", // Expect Base.file.preplanQuestion
      preplanQuestionEdit: "",
      questionBank: "",
      questionBankEdit: "",
      preplanBank: "",
      preplanBankEdit: "",
    },
    map: {
      edit: "",
      list: "",
    },
  },
  Case: {
    BaseInfo: "",
  },
};

/**
 * 递归设置对象中的每个值为其访问路径
 * @param obj 对象
 * @param path 路径数组
 */
function recursiveSetValue(obj: any, path: string[]) {
  for (const k in obj) {
    path.push(k);
    if (typeof obj[k] === "object") {
      recursiveSetValue(obj[k], path);
      path.pop();
    }
    if (typeof obj[k] === "string") {
      obj[k] = path.join(".");
      path.pop();
    }
  }
}

recursiveSetValue(storeKey, []);
console.log(storeKey);

export { storeKey };
