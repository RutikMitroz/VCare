import { Helmet } from "react-helmet";
import Layout from "../../components/Layout";
import LazyLoadingWrapper from "../../components/utilities/LazyLoadingWrapper";
import { lazy } from "react";

const RenderEnquiry = lazy(() => import("../../components/_Enquiry"));
const Enquiry = () => {
  return (
    <>
      <Helmet>
        <title>VCare Admin | Enquiry</title>
      </Helmet>

      <Layout>
        <LazyLoadingWrapper rootStyles={{ minHeight: "calc(100vh - 8rem)" }}>
          <RenderEnquiry />
        </LazyLoadingWrapper>
      </Layout>

    </>
  )
};

export default Enquiry;
