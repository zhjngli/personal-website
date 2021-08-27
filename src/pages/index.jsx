import { graphql } from 'gatsby';
import React from 'react';
import { Helmet } from 'react-helmet';

import Layout from '../components/layout';
import Posts from '../components/posts';

export default function Index({ data }) {
  const { edges: posts } = data.allMarkdownRemark;
  return (
    <Layout>
      <Helmet title={`zli`} />
      <Posts posts={posts} />
    </Layout>
  );
}

export const pageQuery = graphql`
  query IndexQuery {
    allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
      edges {
        node {
          excerpt(pruneLength: 250)
          id
          frontmatter {
            title
            date(formatString: "YYYY-MM-DD")
          }
          fields {
            slug
          }
        }
      }
    }
  }
`;
