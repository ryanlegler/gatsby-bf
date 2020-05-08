/** @jsx jsx */
import React from "react"
import { jsx } from "theme-ui"
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
  allContentfulHome {
    edges {
      node {
        id
        images {
          id
          file {
            url
          }
        }
      }
    }
  }
}
`

const StyledButton = styled("button") <any>`
`

const IndexPage = ({ data }) => {
  // console.log('data',data);
  const { allContentfulCategory, allContentfulHome } = data;
console.log('allContentfulHome',allContentfulHome);
  // console.log('home', home);
  const {edges:categories} = allContentfulCategory;
  const {edges:images} = allContentfulHome;
  console.log('edges',);
  console.log('images',images);
  return (
    <div style={{ height: '100vh', background: '#bada55' }}>
      <Header items={categories} />
      <Carousel wrapAround>
        {images[0].node.images.map((image, index) => <div key={index} style={{ flex: '0 0 100%' }} ><img style={{ objectFit: "cover", width: "100%", height: '80vh' }} src={image.file.url} /></div>)}
      </Carousel>
    </div>


  )
}

export default IndexPage


        // import VStack from "../components/VStack";
        // <VStack shrink={[true, true, true]} gap="s" grow={true} yAlign="top" >
        //   <StyledButton>
        //     thing
        //   </StyledButton>
        //   <StyledButton>
        //     thing
        //   </StyledButton>
        //   <StyledButton>
        //     thing
        //   </StyledButton>
        // </VStack>
