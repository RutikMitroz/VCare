import { Helmet } from "react-helmet";
import Layout from "../../components/Layout";
import LazyLoadingWrapper from "../../components/utilities/LazyLoadingWrapper";
import { lazy } from "react";

const RenderComplaintsDetails = lazy(() => import("../../components/_ComplaintsDetails"));
const ComplaintsDetails = () => {
  return (
    <>
      <Helmet>
        <title>VCare Admin | Enquiry</title>
      </Helmet>

      <Layout>
        <LazyLoadingWrapper rootStyles={{ minHeight: "calc(100vh - 8rem)" }}>
          <RenderComplaintsDetails />
        </LazyLoadingWrapper>
      </Layout>

    </>
  )
};

export default ComplaintsDetails;
