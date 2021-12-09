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
import {ArrowLeft} from '@emotion-icons/bootstrap/ArrowLeft'
import {ArrowRight} from '@emotion-icons/bootstrap/ArrowRight'
import { useMeasure } from "react-use";

import { iconSx } from "../sx/utils";
import * as React from "react";





const IconChevronRight = styled(ArrowRight)`
  z-index: 1;
  position: relative;
  width: 25px`;



const IconChevronLeft = styled(ArrowLeft)`
  width: 25px;
  z-index: 1;
  position: relative;;
`;

const NavButton = styled(Box)`
  position: relative;
  
  background: none;
  border: none;
  opacity: .5;
  cursor: pointer;
  &:hover {
    opacity: 1
  }
`;

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
    letterSpacing: "1px",
    mt: "-2px"
  };

  const [ref, {  width }] = useMeasure();


  const offset = 100;
  const thumbsOffset = 45;
  const rightButtonOffset = offset - 15;
  const leftButtonOffset = width - offset + rightButtonOffset + 24;



  return (
    <Layout>
      {images && !!images.length && (
        <Box
          sx={{
            position: 'relative',
            '*': {
             outine: 'none'
            },
            ".slider": {
              paddingBottom: ['5px', '10px']
            },
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
                  <NavButton
                      as='button' sx={{
                      right: `${leftButtonOffset}px`,
                      mr: ['5px', 0],
                      top: ['27px', '29px' ]
                  }} onClick={previousSlide}>
                      <IconChevronLeft />
                  </NavButton>
                    <NavButton as='button' sx={{
                      right: `${rightButtonOffset}px`,
                      top: ['27px', '29px' ],
                    }} onClick={nextSlide}> <IconChevronRight /> </NavButton>
                  </>
              )}
          >
            {images.map((image, index) => (
              <Box key={index} style={{ flex: "0 0 100%" }} >
                <img
                  style={{ objectFit: "cover", width: "100%"}}
                  src={image.file.url}
                />
              </Box>
            ))}
          </Carousel>

         <Box ref={ref} sx={{ zIndex: 0, pointerEvents: 'none', position: 'absolute', right: ['10px', '0'], display: "flex", flex: "0 0 100%" }}>
           <Box sx={{position: 'relative', right:`${thumbsOffset}px`}}>
             {images.map((image, index) => (
                  <Box as={'img'}
                      sx={{
                        opacity: `${index === slideIndex ? 1 : .4}`,
                        height: ['25px', '30px'],
                        pointerEvents: 'initial',
                        cursor: 'pointer'
                      }}
                      onClick={()=>setSlideIndex(index)}
                      key={index}
                      src={image.file.url}
                  />
            ))}
           </Box>

           {nextItemIndex && projects[nextItemIndex] && (
               <Link
                   to={`/${category.slug}/${projects[nextItemIndex].slug}`}
                   sx={{
                     textDecoration: `none`,
                     display: 'flex',
                     alignItems: 'center',
                     pointerEvents: 'initial',
                     ...textSx
                   }}
               >
                 <Box>
                   Next Project
                 </Box>
               </Link>
           )}

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

        {/*<Flex hAlignment="right" vAlignment="middle" gap="medium">*/}
        {/*  {!!nextItemIndex && projects[previousItemIndex] && (*/}
        {/*    <Link*/}
        {/*      to={`/${category.slug}/${projects[previousItemIndex].slug}`}*/}
        {/*      sx={{*/}
        {/*        textDecoration: `none`,*/}
        {/*        ...textSx*/}
        {/*      }}*/}
        {/*    >*/}
        {/*      <Box>*/}
        {/*        /!*<IconChevronLeft size="45" />*!/*/}
        {/*        Previous Project*/}
        {/*      </Box>*/}
        {/*    </Link>*/}
        {/*  )}*/}


        {/*  {nextItemIndex && projects[nextItemIndex] && (*/}
        {/*    <Link*/}
        {/*      to={`/${category.slug}/${projects[nextItemIndex].slug}`}*/}
        {/*      sx={{*/}
        {/*        textDecoration: `none`,*/}
        {/*        ...textSx*/}
        {/*      }}*/}
        {/*    >*/}
        {/*      <Box>*/}
        {/*        Next Project*/}
        {/*        /!*<IconChevronRight size="45" />*!/*/}
        {/*      </Box>*/}
        {/*    </Link>*/}
        {/*  )}*/}
        {/*</Flex>*/}
      </Box>
    </Layout>
  );
};

export default Project;
