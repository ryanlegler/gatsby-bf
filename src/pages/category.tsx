/** @jsx jsx */
import { Grid, jsx } from "theme-ui";
import { Link } from "gatsby";
import ProjectThumb from "../components/projectThumb";
import Layout from "../components/Layout";
import SEO from "../components/seo";
const slug = require("slug");

const Category = (props) => {
    const { location, pageContext } = props;
    const { categories, projects, category } = pageContext;

    return (
        <Layout>
            <Grid
                sx={{
                    maxWidth: [9, 9, 9],
                    margin: " 0 auto",
                    width: "100%",
                    gridGap: [0, 0, 0],
                    gridTemplateColumns: ["repeat(2, 1fr)", "repeat(3, 1fr)"],
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
                                showNameInDefaultState={item.showNameInDefaultState}
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
                                showNameInDefaultState={item.showNameInDefaultState}
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
            <SEO />
        </Layout>
    );
};

export default Category;
