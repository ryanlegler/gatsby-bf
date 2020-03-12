
/** @jsx jsx */
import React from "react"
import { jsx } from "theme-ui"
import { Link } from "gatsby"
const slug = require('slug')

const Header = ({ items }) => (
  <header
    style={{
      background: `rebeccapurple`,
      marginBottom: `1.45rem`,
    }}
  >
    <div
      style={{
        margin: `0 auto`,
        maxWidth: 960,
        padding: `1.45rem 1.0875rem`,
      }}
    >
      {items &&
        items.map(item => (
          
            <Link
              key={item.name}
              to={`/${item.name}`}
              style={{
                color: `white`,
                textDecoration: `none`,
              }}
            >
              {slug(item.name)}
            </Link>
          
        ))}
    </div>
  </header>
)

export default Header
