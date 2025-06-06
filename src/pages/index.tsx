/** @jsx jsx */
import React, { useMemo } from "react";
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
  const autoplayInterval = 5000;
  const { allContentfulHomePage } = data;
  const { images } = allContentfulHomePage.nodes?.[0] || {};

  const isClient = typeof window !== "undefined";

  const getNumberBetween = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  const start = useMemo(
    () => isClient && getNumberBetween(0, images.length - 1),
    []
  );

  const resolvedImages = useMemo(
    () =>
      start
        ? [...images.slice(start, images.length), ...images.slice(0, start)]
        : [],
    [start]
  );

  return (
    <Layout
      containerSx={{
        ".slider-control-bottomcenter": {
          display: "none"
        },
        ".slider-list": {
          transition: "height 300ms"
        },
        ".slider-control-bottomcenter li": {
          position: "relative",
          top: "32px"
        },
        ".slider-control-centerleft, .slider-control-centerright": {
          display: "none"
        }
      }}
    >
      <Carousel
        slideWidth="100%"
        cellSpacing={0}
        wrapAround
        autoplay
        // slideIndex={start}
        autoplayInterval={autoplayInterval}
      >
        {resolvedImages.map((image, index) => (
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
                height: ["100vh", "650px"]
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
