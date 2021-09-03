module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ["plugin:vue/essential", "@vue/standard"],
  parserOptions: {
    parser: "babel-eslint"
  },
  rules: {
    "space-before-blocks": [2, "always"], // 代码块前至少有一个空格
    "space-before-function-paren": [2, "never"], // 函数名称或 function 关键字与开头括号之间不允许有空格
    semi: ["error", "never"], // 禁用 分号
    "max-len": ["error", 150], // 单行代码最大长度
    "no-tabs": "off", // 最后一行为空
    "prefer-const": "off",
    "object-shorthand": 0, // 禁用 禁止对象内使用带引号字符串
    indent: [
      2,2,
      {
        SwitchCase: 1 // case 针对 switch 语句使用 2 个空格缩进
      }
    ],
    // "off",
    // "tab",
    // 强制统一缩进
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off"
  }
};

// module.exports = {
//   root: true,
//   // env: {
//   //     jquery: true,
//   //     browser: true
//   // },
//   extends: ['plugin:vue/essential', 'airbnb-base'],
//   rules: {
//     'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
//     'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
//     semi: ['error', 'never'], // 禁用 分号
//     'no-multiple-empty-lines': ['error'], // 代码空行 数量
//     'linebreak-style': [0, 'error', 'windows'], // 使用windows的换行
//     'comma-dangle': [2, 'never'], //  对象数组最后一个不带逗号
//     'no-trailing-spaces': 0, // 禁用 校验代码末尾带空格
//     'import/no-dynamic-require': 0, // 禁用 动态require
//     'import/no-unresolved': 0,
//     'no-param-reassign': 0, // 声明为函数参数的变量可能会引起误解
//     'max-len': ['error', 150], // 单行代码最大长度
//     'guard-for-in': 0, // 禁用 禁用for in 循环
//     'no-shadow': 0, // 禁用  禁止页面内相容参数名
//     'object-shorthand': 0, // 禁用 禁止对象内使用带引号字符串
//     'no-restricted-syntax': 0,
//     'no-plusplus': 0, // 禁用 ++
//     'consistent-return': 0, // 关闭箭头函数必须要return
//     'no-return-assign': 0, // return 语句中不能有赋值表达式
//     'global-require': 0, // 关闭禁止使用requrie
//     'import/extensions': 0, // 关闭引入vue文件需要带扩展名
//     'prefer-promise-reject-errors': 0 // 这条规则旨在确保承诺只被Error对象拒绝。
//   },
//   parserOptions: {
//     parser: 'babel-eslint'
//   },
//   plugins: [
//     'vue'
//   ]
// }