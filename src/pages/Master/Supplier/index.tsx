import React from 'react';
import { Helmet } from 'react-helmet';
import Layout from "../../../components/Layout";
import LazyLoadingWrapper from '../../../components/utilities/LazyLoadingWrapper';
import RenderSupplier from '../../../components/_Master/_Supplier';


const Supplier = () => {
  return (
    <>
      <Helmet>
        <title>VCare Admin | Supplier Master</title>
      </Helmet>
      <Layout>
        <LazyLoadingWrapper>
          <RenderSupplier />
        </LazyLoadingWrapper>
      </Layout>
    </>
  );
};

export default Supplier; 