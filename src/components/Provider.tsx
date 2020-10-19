import React from "react";
import { Global, css } from "@emotion/core";
import { ThemeProvider } from "emotion-theming";
import theme from "../gatsby-plugin-theme-ui";

export const MobileNavContext = React.createContext({ open: isOpen, toggleOpen: () => setIsOpen(!isOpen) });

export default ({ children }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  return (
    <MobileNavContext.Provider
      value={{ open: isOpen, toggleOpen: () => setIsOpen(!isOpen) }}
    >
      <ThemeProvider theme={theme}>
        {children}
        <Global
          styles={{
            body: {
              background: `${theme.colors.white}`,
              fontFamily: `${theme.fonts.body}`
            }
          }}
        />
      </ThemeProvider>
    </MobileNavContext.Provider>
  );
};
