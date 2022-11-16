/** @jsx jsx */
import { jsx } from "theme-ui";
import Layout from "../components/Layout";
import React from "react";
import { ProjectInner } from "../components/project/projectInner";

const Page = (props) => {
    const { description, descriptionLinkImage, descriptionLink, images } = props.pageContext;

    const [slideIndex, setSlideIndex] = React.useState(0);
    const innerProps = {
        images,
        slideIndex,
        setSlideIndex,
        description,
        descriptionLink,
        descriptionLinkImage,
    };

    return (
        <Layout>
            <ProjectInner {...innerProps} />
        </Layout>
    );
};

export default Page;
