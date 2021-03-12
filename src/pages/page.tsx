/** @jsx jsx */
import { Box, jsx } from "theme-ui";
import { Link } from "gatsby";
import Header from "../components/header";
import ProjectThumb from "../components/projectThumb";
import styled from "@emotion/styled";
import { Flex } from "jank-ui";
import RichText from "../components/RichText";
import Layout from "../components/Layout";
const slug = require("slug");

const Page = props => {
  const { location, pageContext } = props;
  const { categories, category, logo, content, image } = pageContext;

  return (
    <Layout>
      {image && (
        <img
          style={{ objectFit: "cover", width: "100%" }}
          src={image.file.url}
        />
      )}
      {content && content.raw && (
        <Box
          sx={{
            fontSize: "14px",
            lineHeight: "22px",
            color: "medium",
            maxWidth: ["100%", "700px"],
            py: [2],
            px: [3, 3, 3]
            // mx: [0, 3, 3]
          }}
        >
          <RichText text={JSON.parse(content.raw)} />
        </Box>
      )}
    </Layout>
  );
};

export default Page;
