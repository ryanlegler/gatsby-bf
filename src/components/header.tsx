/** @jsx jsx */
import { Box, jsx } from "theme-ui";
import { graphql, Link, useStaticQuery } from "gatsby";
import { bgImageSx } from "../sx/utils";
import React from "react";
import styled from "@emotion/styled";
import { Global } from "@emotion/react";
import { Navicon } from "@emotion-icons/evil/Navicon";
import { Close } from "@emotion-icons/evil/Close";
import { MobileNavContext } from "./Provider";
import { useBreakpointIndex } from "@theme-ui/match-media";

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

    const { open: navOpen, toggleOpen, setIsOpen } = React.useContext(MobileNavContext) || {};

    const isMobile = useBreakpointIndex() <= 2;

    const hamburgerSx = {
        display: ["block", "block", "none"],
        position: "relative",
        zIndex: [1000],
        color: "medium",
    };
    const navSx = {
        display: navOpen ? ["flex", "flex", "flex"] : ["none", "none", "flex"],
        flexDirection: ["column", "column", "row"],
        alignItems: ["center"],
        justifyContent: ["center"],
        position: ["absolute", "absolute", "relative"],
        height: ["100vh", "100vh", "initial"],
        zIndex: [100, 100, "initial"],
        top: [0, 0, "initial"],
        left: [0, 0, "initial"],
        width: ["100%", "100%", "initial"],

        backgroundColor: ["white", "white", "transparent"],
        "a + a": {
            mt: [2, 2, 0],
            ml: [0, 0, 2],
        },
    };

    return (
        <Box
            className="header"
            sx={{
                alignItems: "center",
                display: "flex",
                position: "relative",
                width: "100%",
                // SIZES - HEADER WIDTH
                maxWidth: 9,
                margin: "0 auto",
                px: [21, 0, 0],
            }}
        >
            <Box
                sx={{
                    flex: "1 1 auto",
                    pt: [2, 7],
                    pb: [2, 6],
                }}
            >
                <Box
                    sx={{
                        alignItems: "center",
                        display: "flex",

                        justifyContent: "space-between",
                    }}
                >
                    <Link to="/">
                        <Box
                            sx={{
                                ...bgImageSx,
                                // letterSpacing: "-1000em",
                                textIndent: "-1000em",
                                flex: "0 0 auto",
                                height: "21px",
                                backgroundPosition: "left -1px",
                                width: ["260px", "410px"],
                                backgroundImage: `url(${url})`,
                            }}
                        >
                            {description}
                        </Box>
                    </Link>

                    <Box sx={hamburgerSx} onClick={toggleOpen}>
                        {!navOpen ? <NavIcon size="30" /> : <CloseIcon size="30" />}
                    </Box>

                    <Box sx={navSx} onClick={isMobile ? () => setIsOpen?.(false) : undefined}>
                        {pages &&
                            pages.map((page) => (
                                <Link
                                    partiallyActive
                                    sx={{
                                        textDecoration: "none",
                                        color: "medium",
                                        "&:visited": {
                                            color: "medium",
                                        },
                                        fontSize: ["16px", 0],
                                        lineHeight: ["1.3", 1],
                                        fontFamily: "body",
                                        fontWeight: "bold",
                                        letterSpacing: "1px",
                                        "&:hover, &.active_link": {
                                            color: "darkest",
                                        },
                                    }}
                                    activeClassName="active_link"
                                    key={page.slug}
                                    to={`/${page.slug}`}
                                >
                                    {slug(page.slug)}
                                </Link>
                            ))}
                    </Box>
                </Box>
            </Box>

            <Global
                styles={{
                    body: {
                        overflow: navOpen ? "hidden" : "auto",
                    },
                    ".slider-control-topleft": {
                        width: "100%",
                        height: "100%",
                        display: "flex",
                        justifyContent: "center",
                        pointerEvents: "none !important",
                    },
                }}
            />
        </Box>
    );
};

export default Header;
