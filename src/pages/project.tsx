/** @jsx jsx */
import * as React from "react";
import { jsx } from "theme-ui";
import Layout from "../components/Layout";
import { ProjectInner } from "../components/project/projectInner";
import SEO from "../components/seo";
import { documentToPlainTextString } from "@contentful/rich-text-plain-text-renderer";
const Project = (props) => {
    const { project = {}, projects, category, autoplay } = props.pageContext;
    const { images = [], name = "", description, descriptionLink, descriptionLinkImage } = project;

    const currentIndex = projects && projects.findIndex((item) => item.slug === project.slug);
    const nextItemIndex = projects && currentIndex < projects.length && currentIndex + 1;

    const [slideIndex, setSlideIndex] = React.useState(0);
    const innerProps = {
        images,
        autoplay,
        slideIndex,
        setSlideIndex,
        nextItemIndex,
        projects,
        name,
        description,
        descriptionLink,
        descriptionLinkImage,
        category,
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

export default Project;
