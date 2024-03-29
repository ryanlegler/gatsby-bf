/** @jsx jsx */
import * as React from "react";
import { Box, jsx } from "theme-ui";

import styled from "@emotion/styled";

export const carouselWrapStyles = {
    "*": {
        outline: "none",
    },
    ".slider": {
        paddingBottom: ["5px", "10px"],
    },
    "&.show_pagination .slider-control-bottomcenter": {
        display: "block",
    },
    ".slider-control-bottomcenter": {
        display: "none",
        bottom: "-75px",
        position: "absolute",
        left: 3,
        "ul > * + *": {
            marginLeft: "8px !important",
        },
        li: {
            button: {
                opacity: "0.3 !important",
                padding: 0,
            },
            "&.active button": {
                opacity: "0.9 !important",
            },
        },
    },
};

export const textSx = {
    color: "medium",
    fontSize: "11px",
    fontWeight: "bold",
    letterSpacing: "1px",
    mt: "-2px",
};

// SIZES - CONTROLS WIDTH
export const controlsWrapStyles = {
    // maxWidth: "975px",
    // maxWidth: "865px",
    // maxWidth: 10,
    maxWidth: 9,
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-end",
    color: "medium",
    fontSize: "11px",
};

export const controlsStyles = {
    marginBottom: "-55px",
    display: "flex",
    justifyContent: "flex-end",
    pointerEvents: "auto !important",
    mr: [2, 0],
    "> * + *": {
        marginLeft: "10px !important",
    },
};

export const footnoteStyles = {
    marginBottom: "-25px",
    display: "flex",
    justifyContent: "flex-start",
    ml: [3, 0],
};

export const navButtonStyles = {
    color: "medium",
    "&:hover": {
        color: "dark",
    },
};

export const NavButton = styled(Box)`
    position: relative;
    background: none;
    border: none;
    cursor: pointer;
    padding: 0;
    > * {
        width: 23px;
        z-index: 1;
        position: relative;
    }
`;
