/** @jsx jsx */
import * as React from "react";
import { Box, jsx } from "theme-ui";
import { Link } from "gatsby";
import RichText from "../../components/RichText";
import Carousel from "nuka-carousel";
import styled from "@emotion/styled";
import { ArrowLeft } from "@emotion-icons/bootstrap/ArrowLeft";
import { ArrowRight } from "@emotion-icons/bootstrap/ArrowRight";
import {
    carouselWrapStyles,
    controlsStyles,
    footnoteStyles,
    controlsWrapStyles,
    NavButton,
    navButtonStyles,
    textSx,
} from "../../components/project/styles";
import { ProjectInnerProps } from "./types";
import { getImageUrl } from "../../utils/getImageUrl";
import { Image } from "theme-ui";
import { useBreakpointIndex } from "@theme-ui/match-media";

const IconChevronRight = styled(ArrowRight)``;
const IconChevronLeft = styled(ArrowLeft)``;

export function ProjectInner({
    images,
    autoplay,
    slideIndex,
    setSlideIndex,
    nextItemIndex,
    projects,
    name,
    description,
    descriptionLink,
    descriptionLinkImage,
    category,
}: ProjectInnerProps) {
    const isMobile = useBreakpointIndex() === 0;

    return (
        <React.Fragment>
            {images && !!images.length && (
                <Box sx={carouselWrapStyles} className={`${isMobile ? "isMobile" : ""}`}>
                    <Carousel
                        autoplay={autoplay}
                        slideIndex={slideIndex}
                        wrapAround={images?.length > 1}
                        disableEdgeSwiping={images?.length <= 1}
                        renderCenterRightControls={() => <></>}
                        renderCenterLeftControls={() => <></>}
                        renderTopLeftControls={({ previousSlide, nextSlide, currentSlide }) => {
                            const image = images?.[currentSlide];
                            return (
                                <Box sx={controlsWrapStyles}>
                                    <Box sx={footnoteStyles}>
                                        {image.description && <span>{image.description}</span>}
                                    </Box>

                                    {!isMobile && images?.length > 1 ? (
                                        <Box sx={controlsStyles}>
                                            <NavButton
                                                aria-label="Previous Image"
                                                as="button"
                                                sx={navButtonStyles}
                                                onClick={previousSlide}
                                            >
                                                <IconChevronLeft />
                                            </NavButton>

                                            <Box>
                                                {images.map((image, index) => (
                                                    <Image
                                                        sx={{
                                                            opacity: `${
                                                                index === currentSlide ? 1 : 0.4
                                                            }`,
                                                            height: ["25px", "30px"],
                                                            pointerEvents: "initial",
                                                            cursor: "pointer",
                                                        }}
                                                        onClick={() => setSlideIndex(index)}
                                                        key={index}
                                                        alt={
                                                            image?.description ||
                                                            `${name ||
                                                                ""} project thumbnail ${index + 1}`
                                                        }
                                                        src={getImageUrl(image.file.url)} // should i scale these thumbs?
                                                    />
                                                ))}
                                            </Box>

                                            <NavButton
                                                aria-label="Next Image"
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

                                            {/* {category &&
                                                nextItemIndex &&
                                                projects?.[nextItemIndex] && (
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
                                                )} */}
                                        </Box>
                                    ) : null}
                                </Box>
                            );
                        }}
                    >
                        {images.map((image, index) => (
                            <div
                                key={index}
                                style={{
                                    aspectRatio: "377 / 219",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                }}
                            >
                                <Image
                                    sx={{
                                        objectFit: "cover",
                                        height: "100%",
                                        // height: ["calc(100vh - 78px)", "100%"],
                                    }}
                                    src={getImageUrl(image.file.url)}
                                    alt={
                                        image?.description ||
                                        `${name || ""} project image ${index + 1}`
                                    }
                                />
                            </div>
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
            <Box
                sx={{
                    p: [3, 0],
                    // SIZES - PROJECT DESCRIPTION
                    maxWidth: 9,
                    margin: "0 auto",
                    width: "100%",
                }}
            >
                <Box sx={{ fontSize: 1, marginTop: "75px" }}>
                    {name ? <strong>{name}</strong> : null}
                </Box>

                {description?.raw && (
                    <Box
                        sx={{
                            fontSize: 1,
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
                            alt={
                                descriptionLinkImage?.description ||
                                `${name || ""} Description Link Image`
                            }
                        />
                    </a>
                )}
            </Box>
        </React.Fragment>
    );
}
