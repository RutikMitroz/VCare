import { Helmet } from "react-helmet";
import Layout from "../../components/Layout";
import LazyLoadingWrapper from "../../components/utilities/LazyLoadingWrapper";
import { lazy } from "react";

const RenderOrderDetail = lazy(() => import("../../components/_OrderDetail"));

const OrderDetail = () => {
  return (
    <>
      <Helmet>
        <title>VCare Admin | OrderDetail</title>
      </Helmet>

      <Layout>
        <LazyLoadingWrapper rootStyles={{ minHeight: "calc(100vh - 8rem)" }}>
          <RenderOrderDetail />
        </LazyLoadingWrapper>
      </Layout>
    </>
  );
};

export default OrderDetail; 