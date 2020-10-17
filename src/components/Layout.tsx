/** @jsx jsx */
import { Box, jsx } from "theme-ui";
import Header from "./header";

type LayoutProps = {
  children?: any;
  containerSx?: any;
};
const Layout = ({ children, containerSx = {} }: LayoutProps) => {
  return (
    <Box
      sx={{
        justifyContent: "center",
        display: "flex",
        width: "100%",
        ...containerSx
      }}
    >
      <Box
        sx={{
          maxWidth: "1600px",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          position: "relative"
        }}
      >
        <Header />
        {children && children}
      </Box>
    </Box>
  );
};

export default Layout;
