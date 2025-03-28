import React from 'react';
import { Helmet } from 'react-helmet';
import Layout from "../../../components/Layout";
import LazyLoadingWrapper from '../../../components/utilities/LazyLoadingWrapper';
import RenderProduct from '../../../components/_Master/_Product';


const Product = () => {
  return (
    <>
      <Helmet>
        <title>VCare Admin | Product Master</title>
      </Helmet>
      <Layout>
        <LazyLoadingWrapper>
          <RenderProduct />
        </LazyLoadingWrapper>
      </Layout>
    </>
  );
};

export default Product; 