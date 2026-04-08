module.exports = [
  {
    files: ["**/*.js"],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "commonjs"
    },
    plugins: {
      import: require("eslint-plugin-import")
    },
    rules: {
      "no-console": "off",
      "import/no-unresolved": "off"
    }
  }
];
