import { Helmet } from "react-helmet";
import Layout from "../../components/Layout";
import LazyLoadingWrapper from "../../components/utilities/LazyLoadingWrapper";
import { lazy } from "react";

const RenderComplaints = lazy(() => import("../../components/_Complaints"));

const Complaints = () => {
  return (
    <>
      <Helmet>
        <title>VCare Admin | Complaints</title>
      </Helmet>

      <Layout>
        <LazyLoadingWrapper rootStyles={{ minHeight: "calc(100vh - 8rem)" }}>
          <RenderComplaints />
        </LazyLoadingWrapper>
      </Layout>
    </>
  );
};

export default Complaints; 