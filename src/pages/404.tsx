import React from "react";
import { Box } from "theme-ui";
import Layout from "../components/Layout";

import SEO from "../components/seo";

const NotFoundPage = () => (
    <Layout containerSx={{ minHeight: "500px" }}>
        <SEO title="404: Not found" />
        <Box
            sx={{
                alignItems: "center",
                justifyContent: "center",
                display: "flex",
                height: "100%",
                bg: "#eaeaea",
            }}
        >
            <h1>PAGE NOT FOUND</h1>
        </Box>
    </Layout>
);

export default NotFoundPage;
