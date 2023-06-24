/** @jsx jsx */
import { Box, ThemeUIStyleObject, jsx } from "theme-ui";
import Header from "./header";

type LayoutProps = {
    children?: React.ReactNode;
    containerSx?: ThemeUIStyleObject;
};
const Layout = ({ children, containerSx = {} }: LayoutProps) => {
    return (
        <Box
            sx={{
                justifyContent: "center",
                display: "flex",
                width: "100%",
                height: "100vh",
                mb: [0, 4],
                ...containerSx,
            }}
        >
            <Box
                sx={{
                    maxWidth: 10, // SIZES - SlIDE WIDTH
                    px: [0, 3],
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    position: "relative",
                }}
            >
                <Header />
                {children && children}
            </Box>
        </Box>
    );
};

export default Layout;
