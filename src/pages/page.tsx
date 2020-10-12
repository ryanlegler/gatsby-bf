/** @jsx jsx */
import { Box, jsx } from "theme-ui"
import { Link } from "gatsby"
import Header from "../components/header";
import ProjectThumb from "../components/projectThumb";
import styled from "@emotion/styled";
import { Flex } from "jank-ui";
import RichText from "../components/RichText";
const slug = require('slug')


const Page = (props) => {

    const { location, pageContext } = props;
    const { categories, category, logo, content, image } = pageContext;
    console.log('image',image);

    return (
        <Flex direction="vertical">
            <Header url={logo && logo.file && logo.file.url} />
            <Flex hAlignment="center">

                <Box sx={{maxWidth: "1200px", width: "100%"}}>
                    {image && <img style={{ objectFit: "cover", width: "100%" }} src={image.file.url} />   }

                    {content && content.json &&
                        <Box sx={{ fontSize: "14px", lineHeight: "22px", color: "medium", maxWidth: ["100%", "700px", "600px"] }}>
                            <RichText text={content.json} />
                        </Box>
                    }
                </Box>

            </Flex>
        </Flex>
    )
}

export default Page


