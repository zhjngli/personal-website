const _ = require(`lodash`);
const path = require('path');

const getMonth = (month) => {
  switch (month) {
    case '01':
      return 'January';
    case '02':
      return 'February';
    case '03':
      return 'March';
    case '04':
      return 'April';
    case '05':
      return 'May';
    case '06':
      return 'June';
    case '07':
      return 'July';
    case '08':
      return 'August';
    case '09':
      return 'September';
    case '10':
      return 'October';
    case '11':
      return 'November';
    case '12':
      return 'December';
    default:
      console.log(`Give me a correct month.`);
  }
};

exports.createPages = ({ actions, graphql, reporter }) => {
  const { createPage } = actions;

  const filterDraft = process.env.NODE_ENV === 'development' ? '' : '(filter: { frontmatter: { draft: { ne: true } } })';

  return (result = graphql(`{
    allMarkdownRemark ${filterDraft} {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            tags
            date(formatString: "YYYY-MM-DD")
          }
        }
        next {
          frontmatter {
            title
          }
          fields {
            slug
          }
        }
        previous {
          frontmatter {
            title
          }
          fields {
            slug
          }
        }
      }
    }
  }`).then((result) => {
    if (result.errors) {
      reporter.panicOnBuild(`Error while running GraphQL query.`);
      return;
    }

    // create blog post pages
    result.data.allMarkdownRemark.edges.forEach((edge) => {
      const node = edge.node;
      createPage({
        path: node.fields.slug,
        component: path.resolve(`src/templates/blog-post/index.jsx`),
        context: {
          slug: node.fields.slug,
          next: edge.next,
          prev: edge.previous
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
          tag: tag
        }
      });
    });

    // create pages organized by date
    let dates = {};
    result.data.allMarkdownRemark.edges.forEach(({ node }) => {
      // it would be nice to use Date() for this functionality, but it's too finnicky working with Date
      // It assumes UTC when running, it indexes from 0, and so it leaves too much room for error
      if (_.get(node, `frontmatter.date`)) {
        const postDate = node.frontmatter.date.split('-');
        const y = postDate[0];
        const m = postDate[1];
        const d = postDate[2];
        if (y in dates) {
          if (m in dates[y]) {
              dates[y][m].push(d);
              dates[y][m] = _.uniq(dates[y][m]);
          } else {
            dates[y][m] = {};
            dates[y][m] = [d];
          }
        } else {
          dates[y] = {};
          dates[y][m] = {};
          dates[y][m] = [d];
        }
      }
      for (const [y, ys] of Object.entries(dates)) {
        for (const [m, ms] of Object.entries(ys)) {
          for (const d of ms) {
            createPage({
              path: `/${y}/${m}/${d}`,
              component: path.resolve(`src/templates/date/index.jsx`),
              context: {
                before: `${y}-${m}-${d}`,
                after: `${y}-${m}-${d}`,
                date: `${getMonth(m)} ${d}, ${y}`
              }
            });
          }
          createPage({
            path: `/${y}/${m}`,
            component: path.resolve(`src/templates/date/index.jsx`),
            context: {
              before: `${y}-${m}-31`,
              after: `${y}-${m}-01`,
              date: `${getMonth(m)} ${y}`
            }
          });
        }
        createPage({
          path: `/${y}`,
          component: path.resolve(`src/templates/date/index.jsx`),
          context: {
            before: `${y}-12-31`,
            after: `${y}-01-01`,
            date: y
          }
        });
      }
    });
  }));
};

// Add custom url pathname for blog posts.
exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;

  if (node.internal.type === `MarkdownRemark`) {
    const fileNode = getNode(node.parent);
    // slug based on post directory name
    // It's worth considering using the date in the frontmatter for the slug instead, but either way,
    // the directory name needs to be consistent with the date in the frontmatter. Keeping the date
    // in the directory name is useful for sorting and looking through posts. There's not a great way
    // to keep the date in only one place and avoid errors, aside from using a generating script, but
    // that doesn't seem worthwhile.
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
