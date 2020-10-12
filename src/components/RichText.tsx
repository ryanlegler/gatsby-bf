/** @jsx jsx */
import React from "react"
import { jsx, } from "theme-ui"
import { BLOCKS, MARKS, Document } from "@contentful/rich-text-types"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import { Fragment } from "react"

const Bold = ({ children }) => (
  <strong>{children}</strong>
)


const options = {
  renderMark: {
    [MARKS.BOLD]: text => <Bold>{text}</Bold>,
  },
  renderText: text =>
    text
      .split("\n")
      .flatMap((text, i) => [i > 0 && <br key={`br-${text}`} />, text]),
  renderNode: {
    [BLOCKS.PARAGRAPH]: (node, children) => <p>{children}</p>,
    [BLOCKS.HEADING_1]: (node, children) => <h1>{children}</h1>,
    [BLOCKS.HEADING_2]: (node, children) => <h2>{children}</h2>,
    [BLOCKS.HEADING_3]: (node, children) => <h3>{children}</h3>,
    [BLOCKS.HEADING_4]: (node, children) => <h4>{children}</h4>,
    [BLOCKS.HEADING_5]: (node, children) => <h5>{children}</h5>,
    [BLOCKS.HEADING_6]: (node, children) => <h6>{children}</h6>,
    [BLOCKS.UL_LIST]: (node, children) => <ul>{children}</ul>,
    [BLOCKS.LIST_ITEM]: (node, children) => <li>{children}</li>,
    [BLOCKS.OL_LIST]: (node, children) => <ol>{children}</ol>,
    [BLOCKS.QUOTE]: (node, children) => (
      <blockquote>{children}</blockquote>
    ),
  },
}

type RichTextProps = {
  text: Document
}

const RichText: React.FC<RichTextProps> = ({ text }) => {
  if (!text || typeof text !== "object") {
    return null
  }
  return <Fragment>{documentToReactComponents(text, options)}</Fragment>
}

export default RichText
