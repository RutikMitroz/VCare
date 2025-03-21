import { Helmet } from "react-helmet";
import Layout from "../../components/Layout";
import LazyLoadingWrapper from "../../components/utilities/LazyLoadingWrapper";
import { lazy } from "react";

const RenderPayments = lazy(() => import("../../components/_Payments"));

const Payments = () => {
  return (
    <>
      <Helmet>
        <title>VCare Admin | Payments</title>
      </Helmet>

      <Layout>
        <LazyLoadingWrapper rootStyles={{ minHeight: "calc(100vh - 8rem)" }}>
          <RenderPayments />
        </LazyLoadingWrapper>
      </Layout>
    </>
  );
};

export default Payments; 