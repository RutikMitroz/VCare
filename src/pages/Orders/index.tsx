import { Helmet } from "react-helmet";
import Layout from "../../components/Layout";
import LazyLoadingWrapper from "../../components/utilities/LazyLoadingWrapper";
import { lazy } from "react";

const RenderOrders = lazy(() => import("../../components/_Orders"));

const Orders = () => {
  return (
    <>
      <Helmet>
        <title>VCare Admin | Orders</title>
      </Helmet>

      <Layout>
        <LazyLoadingWrapper rootStyles={{ minHeight: "calc(100vh - 8rem)" }}>
          <RenderOrders />
        </LazyLoadingWrapper>
      </Layout>
    </>
  );
};

export default Orders; 