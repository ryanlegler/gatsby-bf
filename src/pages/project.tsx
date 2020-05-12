
/** @jsx jsx */
import { jsx } from "theme-ui"
import React from "react";
import { Flex } from 'jank-ui'
import { Link, graphql, useStaticQuery } from "gatsby"
import Header from "../components/header";
import ProjectThumb from "../components/projectThumb";

const Project = (props) => {
    
    const { categories, project = {}, logo } = props.pageContext;
    const { images = [], name: projectName = '' } = project;
    
    return (
        <div>
            <Header items={categories} url={logo.file.url}/>
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
