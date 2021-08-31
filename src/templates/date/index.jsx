import { graphql } from 'gatsby';
import React from 'react';
import { Helmet } from 'react-helmet';

import Layout from '../../components/layout';
import Posts from '../../components/posts';

export default function DatePage({ data, pageContext }) {
  const posts = data.allMarkdownRemark.edges;
  const totalCount = data.allMarkdownRemark.totalCount;

  return (
    <Layout>
      <Helmet title={`${pageContext.date} | zli`} />
      <h1>
        {totalCount}
        {` `}
        post{totalCount != 1 && 's'} from {pageContext.date}
      </h1>
      <Posts posts={posts} />
    </Layout>
  );
}

export const pageQuery = graphql`
  query ($before: Date!, $after: Date!) {
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { date: { lte: $before, gte: $after } } }
    ) {
      totalCount
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
            date(formatString: "MMMM DD, YYYY")
          }
        }
      }
    }
  }
`;
