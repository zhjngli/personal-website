const _ = require(`lodash`);
const path = require('path');

exports.createPages = ({ actions, graphql, reporter }) => {
  const { createPage } = actions;

  return (result = graphql(`
    {
      allMarkdownRemark {
        edges {
          node {
            fields {
              slug
            }
            frontmatter {
              tags
            }
          }
        }
      }
    }
  `).then((result) => {
    if (result.errors) {
      reporter.panicOnBuild(`Error while running GraphQL query.`);
      return;
    }

    // create blog post pages
    result.data.allMarkdownRemark.edges.forEach(({ node }) => {
      createPage({
        path: node.fields.slug,
        component: path.resolve(`src/templates/blog-post/index.jsx`),
        context: {
          slug: node.fields.slug
        }
      });
    });

    // create tag pages
    let tags = [];
    result.data.allMarkdownRemark.edges.forEach((edge) => {
      if (_.get(edge, `node.frontmatter.tags`)) {
        tags = tags.concat(edge.node.frontmatter.tags);
      }
    });
    tags = _.uniq(tags);
    tags.forEach((tag) => {
      const tagPath = `/tags/${_.kebabCase(tag)}/`;
      createPage({
        path: tagPath,
        component: path.resolve(`src/templates/tag-page/index.jsx`),
        context: {
          tag
        }
      });
    });

    // create date sorted pages
  }));
};

// Add custom url pathname for blog posts.
exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;

  if (node.internal.type === `MarkdownRemark`) {
    const fileNode = getNode(node.parent);
    // slug based on post directory name
    const slug = `/${fileNode.relativeDirectory.split('-').join('/')}/`;
    // insert slug to both markdown and file node
    createNodeField({
      node: node,
      name: `slug`,
      value: slug
    });
    createNodeField({
      node: fileNode,
      name: `slug`,
      value: slug
    });

    if (node.frontmatter.tags) {
      const tagSlugs = node.frontmatter.tags.map((tag) => `/tags/${_.kebabCase(tag)}/`);
      createNodeField({ node, name: `tagSlugs`, value: tagSlugs });
    }
  }
};
