import { graphql, Link } from 'gatsby';
import React from 'react';
import { Helmet } from 'react-helmet';

import Layout from '../../components/layout';
import Posts from '../../components/posts';

export default function TagRoute({ data, pageContext }) {
  const posts = data.allMarkdownRemark.edges;

  return (
    <Layout>
      <Helmet title={`${pageContext.tag} | zli`} />
      <h1>
        {data.allMarkdownRemark.totalCount}
        {` `}
        posts tagged with “{pageContext.tag}”
      </h1>
      <Posts posts={posts} />
      <p>
        Or check out <Link to="/tags">all tags</Link>.
      </p>
    </Layout>
  );
}

export const pageQuery = graphql`
  query ($tag: String) {
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { tags: { in: [$tag] } } }
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
