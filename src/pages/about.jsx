import React from 'react';

import Layout from '../components/layout';
import SEO from '../components/seo';

export default function About() {
  return (
    <Layout>
      <SEO title="about" path="/about" />
      <p>
        Hey, I&apos;m Zhijiang! I believe that we&apos;re made to create. As a{' '}
        <a href="https://www.linkedin.com/in/zhjngli" target="_blank" rel="noopener noreferrer">
          software engineer
        </a>
        , I aim to express that creativity by finding elegant technical solutions without forfeiting beautiful
        experiences.
      </p>
      <hr />
      <p>
        <a href="https://github.com/zhjngli" target="_blank" rel="noopener noreferrer">
          Github
        </a>
      </p>
      <p>
        <a href="https://www.linkedin.com/in/zhjngli" target="_blank" rel="noopener noreferrer">
          LinkedIn
        </a>
      </p>
      <p>
        <a href="https://zhjngli.com" target="_blank" rel="noopener noreferrer">
          Photography
        </a>
      </p>
    </Layout>
  );
}
