/** @jsx jsx */
import React from "react";
import { Box, jsx } from "theme-ui";
import { graphql } from "gatsby";

import Carousel, { EasingFunction } from "nuka-carousel";
import Layout from "../components/Layout";
import { getImageUrl } from "../utils/getImageUrl";
import SEO from "../components/seo";

import { Image } from "theme-ui";
export const query = graphql`
    {
        allContentfulHomePage {
            nodes {
                images {
                    file {
                        url
                    }
                }
            }
        }
    }
`;

const IndexPage = ({ data }) => {
    const { allContentfulHomePage } = data;
    const { images } = allContentfulHomePage.nodes?.[0] || {};

    return (
        <Layout
            containerSx={{
                ".slider-control-bottomcenter": {
                    display: "none",
                },
                ".slider-list": {
                    transition: "height 300ms",
                },
                ".slider-control-bottomcenter li": {
                    position: "relative",
                    top: "32px",
                },
                ".slider-control-centerleft, .slider-control-centerright": {
                    display: "none",
                },
            }}
        >
            <Carousel wrapAround autoplay>
                {images.map((image, index) => (
                    <div
                        key={index}
                        style={{
                            aspectRatio: "377 / 219",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <Image
                            sx={{
                                objectFit: "cover",
                                // height: ["100%"],
                                height: ["calc(100vh - 78px)", "100%"],
                            }}
                            src={getImageUrl(image.file.url)}
                            alt={image.description || `Carousel Image ${index + 1}`}
                        />
                    </div>
                ))}
            </Carousel>
            <SEO />
        </Layout>
    );
};

export default IndexPage;
