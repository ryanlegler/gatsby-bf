/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it

const path = require(`path`);
const slug = require('slug')


exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions
  const categoryPage = path.resolve(`src/pages/category.tsx`)
  const pagePage = path.resolve(`src/pages/page.tsx`)
  const projectPage = path.resolve(`src/pages/project.tsx`)
  

  // Query for markdown nodes to use in creating pages.
  // You can query for whatever data you want to create pages for e.g.
  // products, portfolio items, landing pages, etc.
  // Variables can be added as the second function parameter
  return graphql(`
  {
    allContentfulHomePage {
      edges {
        node {
          id,
          logo {
            file {
              url
            }
          }
        }
      }
    }
    allContentfulPage {
      nodes {
        name
        slug
        image {
          title
          file {
            url
          }
        }
        content {
          raw
        }
      }
    }
    allContentfulCategory {
      edges {
        node {
          name,
          slug,
          projects {
            name
            slug,
            description {
              raw
            }
            descriptionLink
            descriptionLinkImage {
              title
              description
              file {
                url
              }
            }
            thumbnail {
              title
              description
              file {
                url
              }
            }
            images {
              title
              file {
                url
              }
            }
          }
        }
      }
    }
  }
  `, { limit: 1000 }).then(result => {
    if (result.errors) {
      throw result.errors
    }

    const {allContentfulCategory, allContentfulHomePage, allContentfulPage} = result.data;
    const {edges:imagesRoot} = allContentfulHomePage;
    const rootNode = imagesRoot[0].node;
    const {logo} = rootNode;
    const {edges:categories} = allContentfulCategory;

    const {nodes:pages} = allContentfulPage;
    
    
    
    pages.forEach(page => {
      createPage({
        path: `${slug(page.slug || '')}`,
        component: pagePage,
        context: {
            id: page.id,
            name: page.name,
            slug: page.slug,
            content: page.content,
            image: page.image,
            categories,
            logo
        },
      })
    })
    categories.forEach(category => {
      createPage({
        path: `${slug(category.node.slug || '')}`,
        component: categoryPage,
        context: {
            category: category.node,
            id: category.node.id,
            categories,
            logo
        },
      })
      category && category.node.projects && category.node.projects.forEach(project => {
        createPage({
          path: `${slug(category.node.slug)}/${slug(project.slug)}`,
          component: projectPage,
          context: {
              id: project.id,
              category: category.node,
              project,
              projects: category.node.projects,
              categories,
              logo
          },
        })
      })

    })
  })
}

// exports.sourceNodes = async ({ actions, tracing }) => {
//   const span = tracing.startSpan(`foo`)
//   // Perform any span operations. E.g. add a tag to your span
//   span.setTag(`bar`, `baz`)
//   // Rest of your plugin code
//   span.finish()
// }


