/** @jsx jsx */
import React from "react";
import { jsx } from "theme-ui";
import { documentToPlainTextString } from "@contentful/rich-text-plain-text-renderer";
import Layout from "../components/Layout";
import { ProjectInner } from "../components/project/projectInner";
import SEO from "../components/seo";

const Page = (props) => {
    const { description, descriptionLinkImage, descriptionLink, images, name } = props.pageContext;

    const [slideIndex, setSlideIndex] = React.useState(0);
    const innerProps = {
        images,
        slideIndex,
        setSlideIndex,
        description,
        descriptionLink,
        descriptionLinkImage,
        name,
    };

    const resolvedDescription =
        description?.raw && documentToPlainTextString(JSON.parse(description?.raw));

    return (
        <Layout>
            <ProjectInner {...innerProps} />
            <SEO description={resolvedDescription} />
        </Layout>
    );
};

export default Page;
