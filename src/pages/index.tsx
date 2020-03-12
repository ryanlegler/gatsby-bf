/** @jsx jsx */
import React from "react"
import { jsx } from "theme-ui"
import { graphql } from "gatsby"
import styled from "@emotion/styled";
import Header from "../components/header"
import offline from "../offline/data";
import { Flex } from "jank-ui";


import Carousel from 'nuka-carousel';

export const query = graphql`
{
  graphCMS {
    home(where: {id: "ck7n0urb5imm20998sswsxgxp"}) {
      images {
        url
      }
    }
    categories {
      name
      projects {
        title
        images {
          url
        }
        thumbnail {
          url
        }
      }
    }
  }
}
`

const StyledButton = styled("button") <any>`
`

const IndexPage = ({ data }) => {

  const raw = data || offline;
  const { categories, home } = raw.graphCMS;

  console.log('home', home);
  return (
    <div style={{ height: '100vh', background: '#bada55' }}>
      <Header items={categories} />
      <Carousel wrapAround>
        {home.images.map((image, index) => <div key={index} style={{ flex: '0 0 100%' }} ><img style={{ objectFit: "cover", width: "100%", height: '80vh' }} src={image.url} /></div>)}
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
