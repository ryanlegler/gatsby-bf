/** @jsx jsx */
import { Box, jsx } from "theme-ui";
import { Flex } from "jank-ui";
import { Link } from "gatsby";
import RichText from "../components/RichText";
import Carousel from "nuka-carousel";
import styled from "@emotion/styled";
import Layout from "../components/Layout";
import { ArrowLeft } from "@emotion-icons/bootstrap/ArrowLeft";
import { ArrowRight } from "@emotion-icons/bootstrap/ArrowRight";
import * as React from "react";

const IconChevronRight = styled(ArrowRight)``;

const IconChevronLeft = styled(ArrowLeft)``;

const NavButton = styled(Box)`
    position: relative;
    background: none;
    border: none;
    cursor: pointer;
    padding: 0;
    > * {
        width: 20px;
        z-index: 1;
        position: relative;
    }
`;

const Project = (props) => {
    const { project = {}, logo, projects, category } = props.pageContext;
    const {
        images = [],
        name: projectName = "",
        description,
        descriptionLink,
        descriptionLinkImage,
    } = project;

    const currentIndex = projects && projects.findIndex((item) => item.slug === project.slug);
    const previousItemIndex = projects && currentIndex > 0 && currentIndex - 1;
    const nextItemIndex = projects && currentIndex < projects.length && currentIndex + 1;

    const [slideIndex, setSlideIndex] = React.useState(0);

    const textSx = {
        color: "medium",
        fontSize: "11px",
        fontWeight: "bold",
        letterSpacing: "1px",
        mt: "-2px",
    };

    return (
        <Layout>
            {images && !!images.length && (
                <Box
                    sx={{
                        position: "relative",
                        "*": {
                            outine: "none",
                        },
                        ".slider": {
                            paddingBottom: ["5px", "10px"],
                        },
                        ".slider-control-bottomcenter": {
                            display: "none",
                        },
                    }}
                >
                    <Carousel
                        afterSlide={(slideIndex) => setSlideIndex(slideIndex)}
                        slideIndex={slideIndex}
                        wrapAround
                        renderCenterRightControls={() => <></>}
                        renderCenterLeftControls={() => <></>}
                        renderBottomRightControls={({ previousSlide, nextSlide }) => (
                            <Box
                                sx={{
                                    // alignItems: "center",
                                    position: "relative",
                                    top: "35px",
                                    display: "flex",
                                    mr: [2, 0],
                                    "> * + *": {
                                        marginLeft: 1,
                                    },
                                }}
                            >
                                <NavButton
                                    as="button"
                                    sx={{
                                        color: "medium",
                                        "&:hover": {
                                            color: "dark",
                                        },
                                    }}
                                    onClick={previousSlide}
                                >
                                    <IconChevronLeft />
                                </NavButton>

                                <Box>
                                    {images.map((image, index) => (
                                        <Box
                                            as={"img"}
                                            sx={{
                                                opacity: `${index === slideIndex ? 1 : 0.4}`,
                                                height: ["25px", "30px"],
                                                pointerEvents: "initial",
                                                cursor: "pointer",
                                            }}
                                            onClick={() => setSlideIndex(index)}
                                            key={index}
                                            src={image.file.url}
                                        />
                                    ))}
                                </Box>

                                <NavButton
                                    as="button"
                                    sx={{
                                        color: "medium",
                                        "&:hover": {
                                            color: "dark",
                                        },
                                    }}
                                    onClick={nextSlide}
                                >
                                    {" "}
                                    <IconChevronRight />{" "}
                                </NavButton>

                                {nextItemIndex && projects[nextItemIndex] && (
                                    <Link
                                        to={`/${category.slug}/${projects[nextItemIndex].slug}`}
                                        sx={{
                                            textDecoration: `none`,
                                            display: "flex",
                                            alignItems: "center",
                                            pointerEvents: "initial",
                                            ml: 3,
                                            ...textSx,
                                        }}
                                    >
                                        <Box>Next Project</Box>
                                    </Link>
                                )}
                            </Box>
                        )}
                    >
                        {images.map((image, index) => (
                            <Box key={index} style={{ flex: "0 0 100%" }}>
                                <img
                                    style={{ objectFit: "cover", width: "100%" }}
                                    src={image.file.url}
                                />
                            </Box>
                        ))}
                    </Carousel>

                    <Box
                        sx={{
                            zIndex: 0,
                            pointerEvents: "none",
                            position: "absolute",
                            right: ["10px", "0"],
                            display: "flex",
                            flex: "0 0 100%",
                        }}
                    ></Box>
                </Box>
            )}
            <Box sx={{ px: [3, 3, 3] }}>
                <Box sx={{ fontSize: "14px", marginTop: "50px" }}>
                    <strong>{projectName}</strong>
                </Box>

                {description && description.raw && (
                    <Box
                        sx={{
                            fontSize: "14px",
                            lineHeight: "22px",
                            color: "medium",
                            maxWidth: ["100%", "700px", "600px"],
                        }}
                    >
                        <RichText text={JSON.parse(description.raw)} />
                    </Box>
                )}

                {descriptionLink && descriptionLinkImage && (
                    <a href={descriptionLink} target="_blank" rel="noopener noreferrer">
                        <img
                            style={{ objectFit: "cover", height: "50px" }}
                            src={descriptionLinkImage.file.url}
                        />
                    </a>
                )}
            </Box>
        </Layout>
    );
};

export default Project;
