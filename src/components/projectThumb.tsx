/** @jsx jsx */
import { Box, jsx } from "theme-ui";
import { bgImageSx, flexCenterMiddle, fullbleedSx } from "../sx/utils";

const ProjectThumb = ({ url, title }) => {
    return (
        <Box
            sx={{
                position: "relative",
                width: "100%",
                paddingBottom: "100%",
                height: "0",
                overflow: "hidden",
                "&:hover": {
                    "[data-id='overlay']": {
                        opacity: 1,
                    },
                    "[data-id='img']": {
                        transform: "scale(1.05)",
                    },
                },
            }}
        >
            <Box
                data-id="img"
                sx={{
                    backgroundImage: `url(https://res.cloudinary.com/dyx93rh2p/image/fetch/c_fit,w_325,h_325/f_auto/https:${url})`,
                    ...bgImageSx,
                    ...fullbleedSx,
                    transform: "scale(1)",
                    transition: "transform 300ms",
                }}
            />

            <Box
                data-id="overlay"
                sx={{
                    fontSize: [0, 1],
                    fontWeight: "bold",
                    letterSpacing: "1px",
                    opacity: 0,
                    ...fullbleedSx,
                    ...flexCenterMiddle,
                    backgroundColor: "overlay",
                    transition: "opacity 300ms",
                }}
            >
                {title}
            </Box>
        </Box>
    );
};

export default ProjectThumb;
