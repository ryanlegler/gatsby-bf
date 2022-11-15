/** @jsx jsx */
import React from "react";
import { jsx } from "theme-ui";
import { graphql } from "gatsby";

import Layout from "../components/Layout";

export const query = graphql`
    {
        contentfulVersion(name: { eq: "Production Version Number" }) {
            number
        }
    }
`;

const IndexPage = ({ data }) => {
    return <Layout>Version: {data?.contentfulVersion?.number}</Layout>;
};

export default IndexPage;
