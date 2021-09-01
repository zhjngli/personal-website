import { graphql, Link } from 'gatsby';
import React from 'react';
import { Helmet } from 'react-helmet';
import rehypeReact from 'rehype-react';

import Layout from '../../components/layout';
import styles from './style';

const renderAst = new rehypeReact({
  createElement: React.createElement
}).Compiler;

export default function BlogPost({ data, pageContext }) {
  const { markdownRemark: post } = data;
  let tags;
  let tagsSection;
  if (post.fields.tagSlugs) {
    const tagsArray = post.fields.tagSlugs;
    tags = tagsArray.map((tag, i) => {
      const divider = i < tagsArray.length - 1 && <span>{`, `}</span>;
      return (
        <span key={tag}>
          <Link to={tag} {...styles.minorLink}>
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
      <Helmet title={`${post.frontmatter.title}`} />
      <h1>{post.frontmatter.title}</h1>
      <p {...styles.tagsContainer}>&middot; {tagsSection}</p>
      <hr />
      {renderAst(post.htmlAst)}
      <hr />
      <div {...styles.postNavigation}>
        {pageContext.prev && (
          <Link to={pageContext.prev.fields.slug} {...styles.minorLink} {...styles.prevPost}>
            &#8592; {pageContext.prev.frontmatter.title}
          </Link>
        )}
        {pageContext.next && (
          <Link to={pageContext.next.fields.slug} {...styles.minorLink} {...styles.nextPost}>
            {pageContext.next.frontmatter.title} &#8594;
          </Link>
        )}
      </div>
    </Layout>
  );
}

export const pageQuery = graphql`
  query ($slug: String!) {
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
