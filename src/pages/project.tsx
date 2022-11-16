/** @jsx jsx */
import { jsx } from "theme-ui";
import Layout from "../components/Layout";
import * as React from "react";

import { ProjectInner } from "../components/project/projectInner";

const Project = (props) => {
    const { project = {}, projects, category, autoplay } = props.pageContext;
    const {
        images = [],
        name: projectName = "",
        description,
        descriptionLink,
        descriptionLinkImage,
    } = project;

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
        projectName,
        description,
        descriptionLink,
        descriptionLinkImage,
        category,
    };
    return (
        <Layout>
            <ProjectInner {...innerProps} />
        </Layout>
    );
};

export default Project;
