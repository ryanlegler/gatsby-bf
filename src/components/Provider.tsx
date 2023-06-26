import React, { useCallback } from "react";
import { Global, css } from "@emotion/react";
import { ThemeProvider } from "@emotion/react";
import theme from "../gatsby-plugin-theme-ui";

export type MobileNavContextProps = {
    open?: boolean;
    toggleOpen?: () => void;
    setIsOpen?: (open: boolean) => void;
};
export const MobileNavContext = React.createContext<MobileNavContextProps>({});

export default ({ children }) => {
    const [isOpen, setIsOpen] = React.useState(false);

    const handleToggleOpen = useCallback(() => {
        setIsOpen((prev) => !prev);
    }, [setIsOpen]);
    const handleSetIsOpen = useCallback(
        (open: boolean) => {
            setIsOpen(open);
        },
        [setIsOpen]
    );

    return (
        <MobileNavContext.Provider
            value={{ open: isOpen, setIsOpen: handleSetIsOpen, toggleOpen: handleToggleOpen }}
        >
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
