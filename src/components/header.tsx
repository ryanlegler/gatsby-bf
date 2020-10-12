
/** @jsx jsx */
import React from "react"
import { jsx } from "theme-ui"
import { graphql, Link, useStaticQuery } from "gatsby"
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

const Header = ({ url = '' }) => {

  const {contentfulNavigationMenu : {pages}}  = useStaticQuery(
    graphql`
      query {
        contentfulNavigationMenu(id: {eq: "c4965efd-540d-59bb-8870-351f3cdcf04a"}) {
          pages {
            ... on ContentfulPage {
              slug
              name
            }
            ... on ContentfulCategory {
              slug
              name
            }
          }
        }
      }
    `
  )
  console.log('pages',pages);
  
  return (
    <Flex hAlignment="center">
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
            {pages &&
              pages.map(page => (

                <Link
                  sx={{
                    textDecoration: 'none',
                    color: 'medium',
                    fontFamily: 'body',
                    fontSize: "12px",
                    fontWeight: "bold",
                    letterSpacing: "1px",
                    '&:hover, &.active_link': {
                      color: 'darkest',
                    }
                  }}
                  activeClassName="active_link"
                  key={page.slug}
                  to={`/${page.slug}`}
                >
                  {slug(page.name)}
                </Link>

              ))}

          </Flex>
        </Flex>
      </StyledHeader>
    </Flex>)
}

export default Header
