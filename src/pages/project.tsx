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

import { iconSx } from "../sx/utils";

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

  const textSx = {
    color: "medium",
    fontSize: "11px",
    fontWeight: "bold",
    letterSpacing: "1px"
  };
  return (
    <Layout>
      {images && images.length && (
        <Box
          sx={{
            ".slider-control-bottomcenter li": {
              position: "relative",
              top: "32px"
            }
          }}
        >
          <Carousel wrapAround>
            {images.map((image, index) => (
              <div key={index} style={{ flex: "0 0 100%" }}>
                <img
                  style={{ objectFit: "cover", width: "100%", height: "50vh" }}
                  src={image.file.url}
                />
              </div>
            ))}
          </Carousel>
        </Box>
      )}
      <Box sx={{ px: [3, 3, 3] }}>
        <Box sx={{ fontSize: "14px", marginTop: "50px" }}>
          <strong>{projectName}</strong>
        </Box>

        {description && description.json && (
          <Box
            sx={{
              fontSize: "14px",
              lineHeight: "22px",
              color: "medium",
              maxWidth: ["100%", "700px", "600px"]
            }}
          >
            <RichText text={description.json} />
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

        <Flex hAlignment="right" vAlignment="middle">
          {!!nextItemIndex && projects[previousItemIndex] && (
            <Link
              to={`/${category.slug}/${projects[previousItemIndex].slug}`}
              sx={{
                textDecoration: `none`,
                ...textSx
              }}
            >
              <Box sx={iconSx}>
                <IconChevronLeft size="45" />
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
              <Box sx={iconSx}>
                <IconChevronRight size="45" />
              </Box>
            </Link>
          )}
        </Flex>
      </Box>
    </Layout>
  );
};

export default Project;
