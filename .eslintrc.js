module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  plugins: ["prettier"],
  extends: [
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier",
  ],
  rules: {
    "prettier/prettier": 2,
    "no-console": 2,
  },
};
