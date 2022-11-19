/** @jsx jsx */
import { Grid, jsx } from "theme-ui";
import { Link } from "gatsby";
import ProjectThumb from "../components/projectThumb";
import Layout from "../components/Layout";
const slug = require("slug");

const Category = (props) => {
    const { location, pageContext } = props;
    const { categories, projects } = pageContext;

    return (
        <Layout>
            <Grid
                sx={{
                    maxWidth: [9, 9, 9],
                    margin: " 0 auto",
                    width: "100%",
                    gridGap: [0, 0, 0],
                    gridTemplateColumns: [
                        "repeat(auto-fill, minmax(200px, 2fr))",
                        "repeat(auto-fill, minmax(250px, 3fr))",
                    ],
                }}
            >
                {categories?.map((item, index) => {
                    return (
                        <Link
                            key={index}
                            to={`${location.pathname}${slug(item?.slug || "")}`}
                            style={{
                                color: `white`,
                                textDecoration: `none`,
                                position: `relative`,
                            }}
                        >
                            <ProjectThumb
                                url={
                                    item && item.thumbnail && item.thumbnail.file.url
                                        ? item.thumbnail.file.url
                                        : ""
                                }
                                title={item.name}
                            />
                        </Link>
                    );
                })}
                {projects?.map((item, index) => {
                    return (
                        <Link
                            key={index}
                            to={`${location.pathname}${slug(item.slug)}`}
                            style={{
                                color: `white`,
                                textDecoration: `none`,
                                position: `relative`,
                            }}
                        >
                            <ProjectThumb
                                url={
                                    item && item.thumbnail && item.thumbnail.file.url
                                        ? item.thumbnail.file.url
                                        : ""
                                }
                                title={item.name}
                            />
                        </Link>
                    );
                })}
            </Grid>
        </Layout>
    );
};

export default Category;
