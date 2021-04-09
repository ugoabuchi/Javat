const { override, fixBabelImports, addLessLoader } = require("customize-cra");
const { getThemeVariables } = require("antd/dist/theme");

module.exports = override(
  fixBabelImports("import", {
    libraryName: "antd",
    libraryDirectory: "es",
    style: true,
  }),
  addLessLoader({
    lessOptions: {
      javascriptEnabled: true,
      modifyVars: getThemeVariables({}),
    },
  })
);
