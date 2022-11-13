export const bgImageSx = {
    backgroundPosition: "center center",
    backgroundSize: "contain",
    backgroundRepeat: "no-repeat",
};
export const fullbleedSx = {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
};

export const flexCenterMiddle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
};

export const iconSx = {
    cursor: "pointer",
    transition: "all 300ms",
    borderRadius: "50%",
    fill: "highlight",
    ":hover": {
        backgroundColor: "lightest",
        "*": {
            fill: "hard",
        },
    },
};
