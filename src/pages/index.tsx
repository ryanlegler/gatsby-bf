/** @jsx jsx */
import React from "react";
import { Box, jsx } from "theme-ui";
import { graphql } from "gatsby";

import Carousel from "nuka-carousel";
import Layout from "../components/Layout";
import { MobileNavContext } from "../components/Provider";

export const query = graphql`
  {
    allContentfulCategory {
      edges {
        node {
          name
        }
      }
    }
    allContentfulHomePage {
      nodes {
        id
        seo {
          id
          title
          description
          keywords
        }
        logo {
          file {
            url
          }
        }
        images {
          id
          file {
            url
            details {
              image {
                height
                width
              }
            }
          }
        }
      }
    }
  }
`;

const IndexPage = ({ data }) => {
  const { allContentfulCategory, allContentfulHomePage } = data;
  const { edges: categories } = allContentfulCategory;
  const { images, logo, seo } = allContentfulHomePage.nodes[0];

  const mobileNavContext = React.useContext(MobileNavContext) || {};
  const { open: navOpen } = mobileNavContext;

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
        easing="easeCubicInOut"
        speed={1000}
        heightMode="current"
        wrapAround
        autoplay
        // pauseOnHover
      >
        {images.map((image, index) => (
          <div key={index} style={{ flex: "0 0 100%", height: "100%" }}>
            <Box as={"img"}
              sx={{
                objectFit: "cover",
                width: "100%",
                height: ['calc(100vh - 78px)', "100%"],
              }}
              src={image.file.url}
            />
          </div>
        ))}
      </Carousel>
    </Layout>
  );
};

export default IndexPage;

// <Box sx={{
//     justifyContent: "center",
//     display: "flex",
//     width: "100%"
// }}>
//   <Box sx={{
//     maxWidth: "1600px",
//     width: "100%",
//     display: "flex",
//     flexDirection: "column",
//     position: "relative",
// }}>
