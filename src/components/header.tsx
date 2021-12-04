/** @jsx jsx */
import { Box, jsx, SxStyleProp } from "theme-ui";
import { graphql, Link, useStaticQuery } from "gatsby";
import { Flex } from "jank-ui";
import { bgImageSx } from "../sx/utils";
import React from "react";
import styled from "@emotion/styled";
import { Global } from "@emotion/core";
import { Navicon } from "@emotion-icons/evil/Navicon";
import { Close } from "@emotion-icons/evil/Close";
import { MobileNavContext } from "./Provider";

const NavIcon = styled(Navicon)``;
const CloseIcon = styled(Close)``;

const slug = require("slug");

const Header = () => {
  const data = useStaticQuery(
    graphql`
      query {
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
              }
            }
          }
        }
        contentfulNavigationMenu {
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
  );
  const { contentfulNavigationMenu, allContentfulHomePage } = data;

  const { pages } = contentfulNavigationMenu ?? {};
  const { images, logo, seo } = allContentfulHomePage.nodes[0];
  const { url } = logo.file;

  const mobileNavContext = React.useContext(MobileNavContext) || {};
  const { open: navOpen, toggleOpen } = mobileNavContext;

  const hamburgerSx: SxStyleProp = {
    display: ["block", "none"],
    position: "relative",
    zIndex: [1000]
  };
  const navSx: SxStyleProp = {
    display: navOpen ? ["flex", "flex", "flex"] : ["none", "none", "flex"],
    flexDirection: ["column", "column", "row"],
    alignItems: ["center"],
    justifyContent: ["center"],
    position: ["absolute", "absolute", "relative"],
    height: ["100vh", "100vh", "initial"],
    zIndex: [100, 100, "inital"],
    top: [0, 0, "inital"],
    left: [0, 0, "inital"],
    width: ["100%", "100%", "initial"],
    backgroundColor: ["white", "white", "transparent"],
    "a + a": {
      mt: [2, 2, 0],
      ml: [0, 0, 3]
    }
  };

  return (
    <Box
      className="header"
      sx={{
        alignItems: "center",
        display: "flex",
        position: "relative",
        width: "100%",
        maxWidth: "100%",
        px: [21, 0, 0]
      }}
    >
      <Box
        sx={{
          flex: "1 1 auto",
          pt: [2, 4],
          pb: [2, 3],
        }}
      >
        <Flex vAlignment="middle" hAlignment="between">
          <Link to="/">
            <Box
              sx={{
                ...bgImageSx,
                textIndent: "-99999px",
                fontSize: 0.01,
                flex: "0 0 auto",
                height: '26px',
                width: ['300px','410px'],
                backgroundImage: `url(${url})`
              }}
            >
              {url}
            </Box>
          </Link>

          <Box sx={hamburgerSx} onClick={toggleOpen}>
            {!navOpen ? <NavIcon size="30" /> : <CloseIcon size="30" />}
          </Box>

          <Box sx={navSx} onClick={toggleOpen}>
            {pages &&
              pages.map(page => (
                <Link
                  sx={{
                    textDecoration: "none",
                    color: "medium",
                    "&:visited": {
                      color: "medium"
                    },
                    fontSize: "12px",
                    fontFamily: "body",
                    fontWeight: "bold",
                    letterSpacing: "1px",
                    "&:hover, &.active_link": {
                      color: "darkest"
                    }
                  }}
                  activeClassName="active_link"
                  key={page.slug}
                  to={`/${page.slug}`}
                >
                  {slug(page.name)}
                </Link>
              ))}
          </Box>
        </Flex>
      </Box>

      <Global
        styles={{
          body: {
            overflow: navOpen ? "hidden" : "auto"
          }
        }}
      />
    </Box>
  );
};

export default Header;
