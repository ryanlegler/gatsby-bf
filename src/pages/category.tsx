/** @jsx jsx */
import { jsx } from "theme-ui"
import { Link } from "gatsby"
import Header from "../components/header";
import ProjectThumb from "../components/projectThumb";
const slug = require('slug')

const Category = (props) => {
  
  const { location, pageContext } = props;
  const { categories, category, logo } = pageContext;
  const { projects, name } = category || {}


  return (
    <div>
      <Header items={categories} url={logo?.file?.url}/>

      {name && <h1>{name}</h1>}
      <div>
        { projects && projects.map((item, index) => {
          
            return (
              <Link
                key={index}
                to={`${location.pathname}/${slug(item.name)}`}
                style={{
                  color: `white`,
                  textDecoration: `none`,
                }}
              >
              
                <ProjectThumb url={item && item.thumbnail && item.thumbnail.file.url ? item.thumbnail.file.url : ''} title={item.name} />
              
            </Link>
            )
          }
        )}
      </div>
    </div>
  )
}

export default Category


