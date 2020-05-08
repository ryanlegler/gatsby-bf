
/** @jsx jsx */
import { jsx } from "theme-ui"

import React from "react";
import { Flex } from 'jank-ui'
import { Link, graphql, useStaticQuery } from "gatsby"
import Header from "../components/header";


// const query2 = graphql`
//   query($id: ID) {
//     graphCMS {
//       categories {
//         name
//         id
//         projects {
//           title
//         }
//       }
//       project(where: { id: $id }) {
//         title
//         images {
//           url
//         }
//       }
//     }
//   }
// `

const Project = (props) => {
    console.log('props',props);
    const { categories, contentfulCategory, project } = props.pageContext;
    const { projects, name } = contentfulCategory
    const { images, title } = project;

    console.log('images',images);



    return (
        <div>
            <Header items={categories} />

            <div>
                <h1>{title}</h1>
                <div>
                    {images &&
                        images.map((item, index) => (
                            <Link
                                key={index}
                                to="/"
                                style={{
                                    color: `white`,
                                    textDecoration: `none`,
                                }}
                            >
                                <Flex vAlignment="evenly" hAlignment="center" style={{
                                    outline: '1px solid #bada55',
                                    height: '300px',
                                    width: '300px',
                                    color: '#bada55'
                                }}>
                                    {item.url}
                                </Flex>
                            </Link>
                        ))}
                </div>
            </div>
        </div>
    )


}

export default Project
