
import React from "react";
import { Global, css } from "@emotion/core";
import { ThemeProvider } from 'emotion-theming'
import theme from '../gatsby-plugin-theme-ui'

export default ({ children }) => (
    <ThemeProvider theme={theme}>
      {children}
      <Global
        styles={{
            'body': {
                background: `${theme.colors.white}`,
                fontFamily: `${theme.fonts.body}`
            }
        }}
      
    />
    </ThemeProvider>
  );
  