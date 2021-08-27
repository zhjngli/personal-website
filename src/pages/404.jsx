import { Link } from 'gatsby';
import React from 'react';
import { Helmet } from 'react-helmet';

import Layout from '../components/layout';

export default function NotFoundPage() {
  return (
    <Layout>
      <Helmet title={`404 | zli`} />
      <p>
        Sorry, content not found! Go to <Link to="/">home</Link>.
      </p>
    </Layout>
  );
}
