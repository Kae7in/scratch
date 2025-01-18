/** @type {import("prettier").Config} */
module.exports = {
  endOfLine: "lf",
  semi: true,
  singleQuote: false,
  tabWidth: 2,
  trailingComma: "es5",

  importOrder: [
    "<THIRD_PARTY_MODULES>",
    "",
    "^@tryrecess/(.*)$",
    "^@/types/(.*)$",
    "^@/plugins/(.*)$",
    "^@/routes/(.*)$",
    "",
    "^[./]",
  ],

  importOrderParserPlugins: ["typescript", "decorators-legacy"],
  plugins: ["@ianvs/prettier-plugin-sort-imports"],
};
