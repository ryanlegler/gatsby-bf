/** @jsx jsx */
import { jsx } from "theme-ui"
import { Link } from "gatsby"
import Header from "../components/header";
import ProjectThumb from "../components/projectThumb";
const slug = require('slug')

const Category = (props) => {

  const { location, pageContext } = props;
  const { categories, category } = pageContext;
  const { projects, name } = category

  return (
    <div>
      <Header items={categories} />

      {name && <h1>{name}</h1>}
      <div>
        { projects && projects.map((item, index) => {
            return (
              <Link
                key={index}
                to={`${location.pathname}/${slug(item.title)}`}
                style={{
                  color: `white`,
                  textDecoration: `none`,
                }}
              >
              
                <ProjectThumb url={item && item.thumbnail && item.thumbnail.url ? item.thumbnail.url : ''} title={item.title} />
              
            </Link>
            )
          }
        )}
      </div>
    </div>
  )
}

export default Category


