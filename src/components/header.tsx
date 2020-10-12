
/** @jsx jsx */
import React from "react"
import { jsx } from "theme-ui"
import { Link } from "gatsby"
import styled from "@emotion/styled";
import { Flex } from 'jank-ui'
import { fontFamily } from "styled-system";
import css from '@styled-system/css';

const slug = require('slug')

const StyledLogo = styled.div<any>`
  background-position: center center;
  background-size: contain;
  background-repeat: no-repeat;
  text-indent: -99999px;
  font-size: .01;
  flex: 0 0 auto;

`

const StyledHeader = styled.header<any>`
    max-width: 1200px;
    flex: 1 1 auto
    ;
    height: 100px;
    margin-top: 20px;
    ${css({
        p: 2,
    })}
`
const StyledLink = styled(Link)<any>`
    text-decoration: none;
    ${css({
        color: 'medium',
        fontFamily: 'body',
        '&:hover, &.active_link': {
          color: 'darkest',
        }
    })}
`
const Header = ({ items, url = '' }) => (
  <Flex  hAlignment="center">
  <StyledHeader>
    <Flex vAlignment="middle" hAlignment="between">

      <Link
        to="/"
      >
        <StyledLogo sx={{
          height: '24px',
          width: '190px',
          backgroundImage: `url(${url})`
        }}>
          {url}
        </StyledLogo>
      </Link>



      <Flex vAlignment="middle" hAlignment="right" gap="medium">
        {items &&
          items.map(item => (
            
              <StyledLink
                activeClassName="active_link"
                key={item.node.name}
                to={`/${item.node.name}`}
              >
                {slug(item.node.name)}
              </StyledLink>
            
          ))}
      
      </Flex>
    </Flex>
  </StyledHeader>
  </Flex>
)

export default Header
