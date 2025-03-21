import { Helmet } from "react-helmet";
import Layout from "../../components/Layout";
import LazyLoadingWrapper from "../../components/utilities/LazyLoadingWrapper";
import { lazy } from "react";

const RenderEnquiryDetails = lazy(() => import("../../components/_EnquiryDetails"));
const EnquiryDetails = () => {
  return (
    <>
      <Helmet>
        <title>VCare Admin | Enquiry</title>
      </Helmet>

      <Layout>
        <LazyLoadingWrapper rootStyles={{ minHeight: "calc(100vh - 8rem)" }}>
          <RenderEnquiryDetails />
        </LazyLoadingWrapper>
      </Layout>

    </>
  )
};

export default EnquiryDetails;
