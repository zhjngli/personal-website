import { graphql, Link } from 'gatsby';
import React from 'react';
import { Helmet } from 'react-helmet';
import rehypeReact from 'rehype-react';

import Layout from '../../components/layout';
import styles from './style';

const renderAst = new rehypeReact({
  createElement: React.createElement
}).Compiler;

export default function BlogPost({ data }) {
  const { markdownRemark: post } = data;
  let tags;
  let tagsSection;
  if (post.fields.tagSlugs) {
    const tagsArray = post.fields.tagSlugs;
    tags = tagsArray.map((tag, i) => {
      const divider = i < tagsArray.length - 1 && <span>{`, `}</span>;
      return (
        <span key={tag}>
          <Link to={tag} {...styles.tagLink}>
            {post.frontmatter.tags[i]}
          </Link>
          {divider}
        </span>
      );
    });
    tagsSection = <span {...styles.tagsSection}>in: {tags}</span>;
  }
  return (
    <Layout>
      <Helmet title={`${post.frontmatter.title} | zli`} />
      <h1>{post.frontmatter.title}</h1>
      <p {...styles.tagsContainer}>&middot; {tagsSection}</p>
      <hr />
      {renderAst(post.htmlAst)}
    </Layout>
  );
}

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      htmlAst
      fields {
        tagSlugs
      }
      frontmatter {
        title
        tags
        date(formatString: "MMMM DD, YYYY")
      }
    }
  }
`;
