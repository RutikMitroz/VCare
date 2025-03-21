import { Helmet } from "react-helmet";
import Layout from "../../components/Layout";
import LazyLoadingWrapper from "../../components/utilities/LazyLoadingWrapper";
import { lazy } from "react";

const RenderOrder = lazy(() => import("../../components/_Order"));
const Order = () => {
  return (
    <>
      <Helmet>
        <title>VCare Admin | Order</title>
      </Helmet>

      <Layout>
        <LazyLoadingWrapper rootStyles={{ minHeight: "calc(100vh - 8rem)" }}>
          <RenderOrder />
        </LazyLoadingWrapper>
      </Layout>

    </>
  )
};

export default Order;
