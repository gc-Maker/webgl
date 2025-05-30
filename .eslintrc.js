module.exports = {
  // 1. 环境配置
    env: {
        node: true,       // Node.js 全局变量（如 `module`、`require`）
        es2020: true,      // 支持 ES2020 语法
        jest: true,        // 如果使用 Jest 测试框架
        browser: true,     // 如果使用浏览器 API
    },

    // 3. 插件和扩展规则
    plugins: [
        '@typescript-eslint', // TypeScript 规则插件
        'import',            // 导入/导出语法检查
    ],
    extends: [
        'eslint:recommended', // ESLint 内置推荐规则
        'plugin:@typescript-eslint/recommended', // TS 推荐规则
        'plugin:import/recommended', // 导入/导出推荐规则
        'plugin:import/typescript',  // 支持 TS 的导入检查
    ],

  // 4. 自定义规则
    rules: {
        // --- TypeScript 规则 ---
        '@typescript-eslint/no-unused-vars': 'warn', // 未使用的变量警告
        '@typescript-eslint/no-explicit-any': 'warn', // 避免使用 `any` 类型
        '@typescript-eslint/consistent-type-imports': 'error', // 强制类型导入语法

        // --- JavaScript 通用规则 ---
        'no-redeclare': 'error', // 禁止重复声明变量
        'no-console': 'error',    // 避免直接使用 `console`
        'quotes': ['error', 'single'], // 强制单引号
        'semi': ['error', 'always'],   // 强制分号

        // --- 导入/导出规则 ---
        'import/order': ['error', { // 导入顺序分组
            'groups': ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
            'newlines-between': 'always',
        }],
        'import/no-unresolved': 'error', // 确保导入路径有效
    },

  // 5. 针对特定文件的覆盖规则
    overrides: [
        {
            files: ['**/*.test.ts', '**/*.spec.ts'], // 测试文件
            rules: {
                'no-console': 'off', // 测试文件允许 console
            },
        },
        {
            files: ['**/*.ts'],
            parser: '@typescript-eslint/parser',
            parserOptions: {
                project: './tsconfig.json',
                ecmaVersion: 2020,
                sourceType: 'module',
            },
            plugins: ['@typescript-eslint']
        }
    ],

  // 6. 忽略文件（可选）
    ignorePatterns: ['dist/', 'node_modules/'],
};
