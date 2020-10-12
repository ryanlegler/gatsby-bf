/** @jsx jsx */
import React from "react"
import { Box, jsx } from "theme-ui"
import { graphql } from "gatsby"
import styled from "@emotion/styled";
import Header from "../components/header"
import { Flex } from "jank-ui";


import Carousel from 'nuka-carousel';

export const query = graphql`
{
  allContentfulCategory {
    edges {
      node {
        name
      }
    }
  },
  allContentfulHomePage {
      nodes {
        id,
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
        },
        images {
          id
          file {
            url
          }
        }
      }
  },
}
`

const IndexPage = ({ data }) => {
  const { allContentfulCategory, allContentfulHomePage } = data;
  const {edges:categories} = allContentfulCategory;
  const {images, logo, seo} = allContentfulHomePage.nodes[0];

  console.log('seo',seo);
  return (
    <Box sx={{
      ".slider-control-bottomcenter": {
        display: "none"
      }
      // ".slider-control-bottomcenter li": {
      //   position: "relative",
      //   top: "32px"
      // }
    }}>
      <Header items={categories} url={logo.file.url}/>
      <Carousel wrapAround>
        {images.map((image, index) => <div key={index} style={{ flex: '0 0 100%' }} ><img style={{ objectFit: "cover", width: "100%", height: '80vh' }} src={image.file.url} /></div>)}
      </Carousel>
    </Box>
  )
}

export default IndexPage
