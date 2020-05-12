
/** @jsx jsx */
import { jsx } from 'theme-ui';
import styled from "@emotion/styled";
import React from "react";
import { Flex } from 'jank-ui'
import { Link, graphql } from "gatsby"
import { backgroundPosition } from 'styled-system';


const StyledThumb = styled.div<any>`
  background-position: center center;
  background-size: cover;

  
`





const ProjectThumb = ({ url, title }) => {

  return (
    <StyledThumb sx={{
      size: 6,
      backgroundImage: `url(${url})`
    }}>
      {title}
    </StyledThumb>

  )
}

export default ProjectThumb
