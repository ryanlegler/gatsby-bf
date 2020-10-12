/** @jsx jsx */
import { jsx } from "theme-ui"
import { Link } from "gatsby"
import Header from "../components/header";
import ProjectThumb from "../components/projectThumb";
import styled from "@emotion/styled";
import { Flex } from "jank-ui";
const slug = require('slug')

const StyledGrid = styled.div`
  max-width: 1200px;
  width: 100%;
  display: grid;
  grid-gap: 20px;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
`

const Category = (props) => {
  
  const { location, pageContext } = props;
  const { categories, category, logo } = pageContext;
  const { projects } = category || {}


  return (
    <Flex direction="vertical">
      <Header items={categories} url={logo && logo.file && logo.file.url}/>
      <Flex hAlignment="center">
      <StyledGrid>
        { projects && projects.map((item, index) => {
          
            return (
              <Link
                key={index}
                to={`${location.pathname}/${slug(item.slug)}`}
                style={{
                  color: `white`,
                  textDecoration: `none`,
                  position: `relative`
                }}
              >
              
                <ProjectThumb url={item && item.thumbnail && item.thumbnail.file.url ? item.thumbnail.file.url : ''} title={item.name} />
              
            </Link>
            )
          }
        )}
      </StyledGrid>
      </Flex>
    </Flex>
  )
}

export default Category


