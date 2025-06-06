/** @jsx jsx */
import { Box, jsx, Badge } from "theme-ui";
import { graphql, Link, useStaticQuery } from "gatsby";
import { bgImageSx } from "../sx/utils";
import React from "react";
import styled from "@emotion/styled";
import { Global } from "@emotion/react";
import { Navicon } from "@emotion-icons/evil/Navicon";
import { Close } from "@emotion-icons/evil/Close";
import { MobileNavContext } from "./Provider";
import { useBreakpointIndex } from "@theme-ui/match-media";
import { useLocation } from "@reach/router";
import type { ThemeUICSSObject } from "theme-ui";

const NavIcon = styled(Navicon)``;
const CloseIcon = styled(Close)``;

const slug = require("slug");

const Header = () => {
  const data = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            author
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

  const { contentfulNavigationMenu, allContentfulHomePage, site } = data || {};
  const { description } = site?.siteMetadata || {};
  const { pages } = contentfulNavigationMenu || {};
  const { logo } = allContentfulHomePage.nodes?.[0] || {};

  const { url } = logo.file;

  const { open: navOpen, toggleOpen, setIsOpen } =
    React.useContext(MobileNavContext) || {};

  const isMobile = useBreakpointIndex() === 0;

const hamburgerSx: ThemeUICSSObject = {
  display: "block",
  position: "relative",
  zIndex: 1000,
  color: "medium"
};



  const blackIcon = {
    width: "30px",
    height: "30px",
    borderRadius: "50%",
    backgroundColor: "black",
    display: "inline-block"
  };

    const whiteIcon = {
    width: "30px",
    height: "30px",
    borderRadius: "50%",
    backgroundColor: "white",
    display: "inline-block",
    border: "1px solid #aca79e"
  };

      const transparentIcon = {
    width: "30px",
    height: "30px",
    borderRadius: "50%",
    backgroundColor: "transparent",
    display: "inline-block",
    border: "1px solid #aca79e"
  };

const navSx: ThemeUICSSObject = {
  display: ["flex", "flex", "flex"],
  flexDirection: ["column", "row", "row"],
  alignItems: ["center", "center", "center"],
  justifyContent: ["center", "center", "center"],
  position: ["absolute", "relative", "relative"],
  height: ["100vh", "initial", "initial"],
  zIndex: [100, "initial", "initial"],
  top: [0, "initial", "initial"],
  left: [0, "initial", "initial"],
  width: ["100%", "initial", "initial"],
  backgroundColor: ["white", "transparent", "transparent"],
  "a + a": {
    mt: [2, 0, 0],
    ml: [0, 2, 2]
  }
};


  const location = useLocation();
  const isHomePage = location.pathname === "/";


  return (
    <Box
      className="header"
      sx={{
        alignItems: "center",
        display: "flex",
        position: isMobile && isHomePage ? "absolute" : "relative",
        width: "100%",
        maxWidth: "650px",
        margin: "0 auto",
        px: [21, 0, 0]
      }}
    >
      {isMobile ? (
        // Mobile Header
        <Box
          sx={{
            display: "flex",
            flex: "1 1 auto",
            alignItems: "center",
            justifyContent: isHomePage ? "flex-end" : "space-between",
            height: "100px",
            width: "100%"
          }}
        >
          {!isHomePage ? (
            <Link to="/">
              <Box
                sx={{
                  ...bgImageSx,
                  textIndent: "-1000em",
                  flex: "0 0 auto",
                  height: "21px",
                  backgroundPosition: "left -1px",
                  width: "260px",
                  backgroundImage: `url(${url})`
                }}
              >
                {description}
              </Box>
            </Link>
          ) : null}

   <Box sx={hamburgerSx} onClick={toggleOpen}>
  {!navOpen ? (
    isHomePage ? (
      <Badge sx={whiteIcon} />
    ) : (
      <Badge sx={transparentIcon} />
    )
  ) : (
    <Badge sx={blackIcon} />
  )}
</Box>

          {navOpen && (
            <Box sx={navSx} onClick={() => setIsOpen?.(false)}>
              {pages?.map(page => (
                <Link
                  key={page.slug}
                  to={`/${page.slug}`}
                  sx={{
                    textDecoration: "none",
                    color: "medium",
                    fontWeight: "bold",
                    "&:hover, &.active_link": {
                      color: "darkest"
                    }
                  }}
                  activeClassName="active_link"
                >
                  {slug(page.slug)}
                </Link>
              ))}
            </Box>
          )}
        </Box>
      ) : (
        // Desktop Header
        <Box
          sx={{
            display: "flex",
            flex: "1 1 auto",
            alignItems: "center",
            justifyContent: "space-between",
            height: "165px",
            width: "100%"
          }}
        >
          <Link to="/" style={{ width: "50%" }}>
            <Box
              sx={{
                ...bgImageSx,
                textIndent: "-1000em",
                flex: "0 0 auto",
                height: "21px",
                backgroundPosition: "left -1px",
                width: "310px",
                backgroundImage: `url(${url})`,
              }}
            >
              {description}
            </Box>
          </Link>

          <Box sx={navSx}>
            {pages?.map(page => (
              <Link
                key={page.slug}
                to={`/${page.slug}`}
                sx={{
                  textDecoration: "none",
                  color: "medium",
                  fontSize: "14px",
                  fontWeight: "bold",
                  "&:hover, &.active_link": {
                    color: "darkest"
                  }
                }}
                activeClassName="active_link"
              >
                {slug(page.slug)}
              </Link>
            ))}
          </Box>
        </Box>
      )}

      <Global
        styles={{
          body: {
            overflow: navOpen ? "hidden" : "auto"
          },
          ".slider-control-topleft": {
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            pointerEvents: "none"
          }
        }}
      />
    </Box>
  );
};

export default Header;
