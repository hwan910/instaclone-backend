module.exports = {
  root: true,
  extends: "@react-native-community",
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint"],
  overrides: [
    {
      files: ["*.ts", "*.tsx"],
      rules: {
        "prettier/prettier": [
          "error",
          {
            arrowParens: "always",
            bracketSameLine: true,
            jsxBracketSameLine: true,
            bracketSpacing: false,
            singleQuote: true,
            trailingComma: "all",
            printWidth: 140,
            tabWidth: 2,
          },
        ],
        "@typescript-eslint/no-shadow": ["error"],
        "no-shadow": "off",
        "no-undef": "off",
      },
    },
  ],
};
