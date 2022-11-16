/** @jsx jsx */
import { Box, jsx } from "theme-ui";
import { Link } from "gatsby";
import RichText from "../../components/RichText";
import Carousel from "nuka-carousel";
import styled from "@emotion/styled";
import { ArrowLeft } from "@emotion-icons/bootstrap/ArrowLeft";
import { ArrowRight } from "@emotion-icons/bootstrap/ArrowRight";
import * as React from "react";
import {
    carouselWrapStyles,
    controlsStyles,
    controlsWrapStyles,
    NavButton,
    navButtonStyles,
    textSx,
} from "../../components/project/styles";
import { ProjectInnerProps } from "./types";

const IconChevronRight = styled(ArrowRight)``;

const IconChevronLeft = styled(ArrowLeft)``;

export function ProjectInner({
    images,
    autoplay,
    slideIndex,
    setSlideIndex,
    nextItemIndex,
    projects,
    projectName,
    description,
    descriptionLink,
    descriptionLinkImage,
    category,
}: ProjectInnerProps) {
    return (
        <React.Fragment>
            {images && !!images.length && (
                <Box sx={carouselWrapStyles}>
                    <Carousel
                        autoplay={autoplay}
                        afterSlide={(index) => setSlideIndex(index)}
                        slideIndex={slideIndex}
                        wrapAround
                        renderCenterRightControls={() => <></>}
                        renderCenterLeftControls={() => <></>}
                        renderTopLeftControls={({ previousSlide, nextSlide }) => (
                            <Box sx={controlsWrapStyles}>
                                {images?.length > 1 ? (
                                    <Box sx={controlsStyles}>
                                        <NavButton
                                            as="button"
                                            sx={navButtonStyles}
                                            onClick={previousSlide}
                                        >
                                            <IconChevronLeft />
                                        </NavButton>

                                        <Box>
                                            {images.map((image, index) => (
                                                <Box
                                                    as={"img"}
                                                    sx={{
                                                        opacity: `${
                                                            index === slideIndex ? 1 : 0.4
                                                        }`,
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

                                        {category && nextItemIndex && projects?.[nextItemIndex] && (
                                            <Link
                                                to={`/${category?.slug}/${projects[nextItemIndex].slug}`}
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
                                ) : null}
                            </Box>
                        )}
                    >
                        {images?.map((image, index) => (
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
            <Box sx={{ maxWidth: 9, margin: "0 auto", width: "100%" }}>
                <Box sx={{ fontSize: "14px", marginTop: "50px" }}>
                    {projectName ? <strong>{projectName}</strong> : null}
                </Box>

                {description?.raw && (
                    <Box
                        sx={{
                            fontSize: "14px",
                            lineHeight: "22px",
                            color: "medium",
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
        </React.Fragment>
    );
}
