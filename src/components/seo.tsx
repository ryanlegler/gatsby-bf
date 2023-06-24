/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react";
import Helmet from "react-helmet";
import { useStaticQuery, graphql } from "gatsby";
import { useLocation } from "@reach/router";
function SEO(
    props: { title?: string; author?: string; description?: string } = { title: "", author: "" }
) {
    const { site } = useStaticQuery(
        graphql`
            query {
                site {
                    siteMetadata {
                        title
                        description
                        author
                    }
                }
            }
        `
    );

    const { title, author, description } = site?.siteMetadata || {};

    const location = useLocation();

    const resolvedDescription = props?.description
        ? `${description} - ${props?.description}`
        : description;

    const breadcrumbs = location?.pathname
        ?.split("/")
        ?.filter((segment) => segment !== "")
        ?.join(" | ");
    const resolvedTitle = breadcrumbs ? `${title} | ${breadcrumbs}` : title;

    return (
        <Helmet
            htmlAttributes={{
                lang: "en",
            }}
            title={resolvedTitle}
            // titleTemplate={`%s | ${title}`}
            meta={[
                {
                    name: `description`,
                    content: resolvedDescription,
                },
                {
                    property: `og:title`,
                    content: resolvedTitle,
                },
                {
                    property: `og:description`,
                    content: resolvedDescription,
                },
                {
                    property: `og:type`,
                    content: `website`,
                },
                {
                    name: `twitter:card`,
                    content: `summary`,
                },
                {
                    name: `twitter:creator`,
                    content: author,
                },
                {
                    name: `twitter:title`,
                    content: resolvedTitle,
                },
                {
                    name: `twitter:description`,
                    content: resolvedDescription,
                },
            ]}
        />
    );
}

export default SEO;
