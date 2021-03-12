/** @jsx jsx */
import { Box, jsx } from "theme-ui";
import { Flex } from "jank-ui";
import { Link } from "gatsby";
import RichText from "../components/RichText";
import Carousel from "nuka-carousel";
import styled from "@emotion/styled";
import Layout from "../components/Layout";
import { ChevronRight } from "@emotion-icons/evil/ChevronRight";
import { ChevronLeft } from "@emotion-icons/evil/ChevronLeft";
import { useMeasure } from "react-use";

import { iconSx } from "../sx/utils";
import * as React from "react";

const IconChevronRight = styled(ChevronRight)``;
const IconChevronLeft = styled(ChevronLeft)``;

const Project = props => {
  const { project = {}, logo, projects, category } = props.pageContext;
  const {
    images = [],
    name: projectName = "",
    description,
    descriptionLink,
    descriptionLinkImage
  } = project;

  const currentIndex =
    projects && projects.findIndex(item => item.slug === project.slug);
  const previousItemIndex = projects && currentIndex > 0 && currentIndex - 1;
  const nextItemIndex =
    projects && currentIndex < projects.length && currentIndex + 1;

  const [slideIndex, setSlideIndex] = React.useState(0);

  const textSx = {
    color: "medium",
    fontSize: "11px",
    fontWeight: "bold",
    letterSpacing: "1px"
  };

  const [ref, {  width }] = useMeasure();
  console.log('slideIndex', slideIndex);

  return (
    <Layout>
      {images && !!images.length && (
        <Box
          sx={{
            position: 'relative',
            ".slider-control-bottomcenter": {
              display: 'none'
            }
          }}
        >
          <Carousel
              afterSlide={slideIndex => setSlideIndex(slideIndex )}
              slideIndex={slideIndex}
              wrapAround
              renderCenterRightControls={()=><></>}
              renderCenterLeftControls={()=><></>}
              renderBottomRightControls={({ previousSlide, nextSlide }) => (
                  <>
                  <Box as='button' sx={{
                      position: "relative",
                      top: "32px",
                      left: `-${width}px`

                  }} onClick={previousSlide}>Previous</Box>
                    <Box as='button' sx={{
                      position: "relative",
                      top: "32px",

                    }} onClick={nextSlide}>Next</Box>
                  </>
              )}
          >
            {images.map((image, index) => (
              <Box key={index} style={{ flex: "0 0 100%" }} >
                <img
                  style={{ objectFit: "cover", width: "100%", height: "60vh" }}
                  src={image.file.url}
                />
              </Box>
            ))}
          </Carousel>

         <Box ref={ref} style={{ position: 'absolute', right: '50px', marginTop: '5px', display: "flex", flex: "0 0 100%" }}>
           {images.map((image, index) => (
                <Box as={'img'}
                    sx={{
                      opacity: `${index === slideIndex ? 1 : .6}`
                    }}
                    onClick={()=>setSlideIndex(index)}
                    key={index}
                    style={{ height: "30px", marginLeft: '10px' }}
                    src={image.file.url}
                />
          ))}
           {/*<button onClick={handleNext}>*/}
           {/*  next*/}
           {/*</button>*/}
         </Box>

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
              maxWidth: ["100%", "700px", "600px"]
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



        <Flex hAlignment="right" vAlignment="middle" gap="medium">
          {!!nextItemIndex && projects[previousItemIndex] && (
            <Link
              to={`/${category.slug}/${projects[previousItemIndex].slug}`}
              sx={{
                textDecoration: `none`,
                ...textSx
              }}
            >
              <Box>
                {/*<IconChevronLeft size="45" />*/}
                Previous Project
              </Box>
            </Link>
          )}
          {/*
        {nextItemIndex &&
          projects[previousItemIndex] &&
          projects[nextItemIndex] && (
            <Flex shrink>
              <span sx={textSx}>|</span>
            </Flex>
          )} */}

          {nextItemIndex && projects[nextItemIndex] && (
            <Link
              to={`/${category.slug}/${projects[nextItemIndex].slug}`}
              sx={{
                textDecoration: `none`,
                ...textSx
              }}
            >
              <Box>
                Next Project
                {/*<IconChevronRight size="45" />*/}
              </Box>
            </Link>
          )}
        </Flex>
      </Box>
    </Layout>
  );
};

export default Project;
