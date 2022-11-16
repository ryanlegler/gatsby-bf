import React, { useCallback } from "react";
import { Global, css } from "@emotion/core";
import { ThemeProvider } from "@emotion/react";
import theme from "../gatsby-plugin-theme-ui";

export const MobileNavContext = React.createContext(undefined);

export default ({ children }) => {
    const [isOpen, setIsOpen] = React.useState(false);

    const handleToggleOpen = useCallback(() => {
        setIsOpen((prev) => !prev);
    }, [setIsOpen]);

    return (
        <MobileNavContext.Provider value={{ open: isOpen, toggleOpen: handleToggleOpen }}>
            <ThemeProvider theme={theme}>
                {children}
                <Global
                    styles={{
                        body: {
                            background: `${theme.colors.white}`,
                            fontFamily: `${theme.fonts.body}`,
                        },
                    }}
                />
            </ThemeProvider>
        </MobileNavContext.Provider>
    );
};
