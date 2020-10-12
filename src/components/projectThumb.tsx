
/** @jsx jsx */
import { jsx } from 'theme-ui';
import styled from "@emotion/styled";
import React from "react";
import { Flex } from 'jank-ui'
import { Link, graphql } from "gatsby"
import { backgroundPosition } from 'styled-system';



const StyledImage = styled.div<any>`
  background-position: center center;
  background-size: cover;
  position: absolute;
  top:0;
  bottom:0;
  left:0;
  right:0;
`


const StyledTextOverlay = styled.div<any>`
  opacity: 0;
  position: absolute;
  background: rgba(0,0,0,.5);
  top:0;
  bottom:0;
  left:0;
  right:0;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: opacity 300ms;
`

const StyledContainer = styled.div<any>`
  position: relative;
  background: rebeccapurple;
  &:hover {
    [data-id="overlay"] {
      opacity: 1;
    }
  }
`


const ProjectThumb = ({ url, title }) => {

  return (
    <StyledContainer sx={{
      width: '100%',
      paddingBottom: '100%',
      height: '0',
    }}>
      <StyledImage sx={{
        backgroundImage: `url(${url})`
      }} />
      
      <StyledTextOverlay data-id="overlay">
        {title}
      </StyledTextOverlay>

    </StyledContainer>

  )
}

export default ProjectThumb
