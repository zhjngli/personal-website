import React from 'react';
import { Helmet } from 'react-helmet';

import Layout from '../components/layout';

export default function About() {
  return (
    <Layout>
      <Helmet title={`about`} />
      <div>
        <h1>About me!</h1>
      </div>
    </Layout>
  );
}
