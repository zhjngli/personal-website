import React from 'react';
import { Helmet } from 'react-helmet';

import Form from '../components/form';
import Layout from '../components/layout';

export default class Contact extends React.Component {
  render() {
    return (
      <Layout>
        <Helmet title={`contact`} />
        <p>Let&apos;s create something!</p>
        <p>Please fill out the form below for any inquiries.</p>
        <Form />
      </Layout>
    );
  }
}
