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
    ".slider-control-bottomcenter": {
        display: "none",
    },
};

export const textSx = {
    color: "medium",
    fontSize: "11px",
    fontWeight: "bold",
    letterSpacing: "1px",
    mt: "-2px",
};

export const controlsWrapStyles = {
    maxWidth: "975px",
    width: "100%",
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "flex-end",
};

export const controlsStyles = {
    marginBottom: "-55px",
    display: "flex",
    justifyContent: "flex-end",
    mr: [2, 0],
    "> * + *": {
        marginLeft: "10px !important",
    },
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
