
/** @jsx jsx */
import { jsx } from "theme-ui"

import React from "react";
import { Flex } from 'jank-ui'
import { Link, graphql, useStaticQuery } from "gatsby"
import Header from "../components/header";
import ProjectThumb from "../components/projectThumb";


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
    
    const { categories, category, project } = props.pageContext;
    const { images, name: projectName = '' } = project;

    return (
        <div>
            <Header items={categories} />

            <div>
                <h1>{projectName}</h1>
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
                                
                                    <ProjectThumb url={item && item.file && item.file.url ? item.file.url : ''} title={item.name} />
                                    
                                
                            </Link>
                        ))}
                </div>
            </div>
        </div>
    )


}

export default Project
