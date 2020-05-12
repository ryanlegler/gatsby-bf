
const React = require("react");
const Provider = require ('./src/components/Provider').default;
/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */ 

// You can delete this file if you're not using it

// const { ThemeProvider } = require("./src/designSystem")
// const theme = require("./src/designSystem/theme.tsx")
// const { GlobalStyles } = require("./src/designSystem/utils")

exports.wrapRootElement = ({ element }) => {
  return <Provider> {element} </Provider>
};
