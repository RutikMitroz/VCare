import React from 'react';
import { Helmet } from 'react-helmet';
import Layout from "../../components/Layout";
import LazyLoadingWrapper from '../../components/utilities/LazyLoadingWrapper';
import RenderClient from '../../components/_Client';

const Client = () => {
  return (
    <>
      <Helmet>
        <title>VCare Admin | Client Master</title>
      </Helmet>
      <Layout>
        <LazyLoadingWrapper>
          <RenderClient />
        </LazyLoadingWrapper>
      </Layout>
    </>
  );
};

export default Client; 