import { Helmet } from "react-helmet";
import Layout from "../../components/Layout";
import LazyLoadingWrapper from "../../components/utilities/LazyLoadingWrapper";
import { lazy } from "react";

const RenderReports = lazy(() => import("../../components/_Reports"));

const Reports = () => {
  return (
    <>
      <Helmet>
        <title>VCare Admin | Reports</title>
      </Helmet>

      <Layout>
        <LazyLoadingWrapper rootStyles={{ minHeight: "calc(100vh - 8rem)" }}>
          <RenderReports />
        </LazyLoadingWrapper>
      </Layout>
    </>
  );
};

export default Reports; 