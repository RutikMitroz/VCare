
import { Helmet } from "react-helmet";
import Layout from "../../components/Layout";
import LazyLoadingWrapper from "../../components/utilities/LazyLoadingWrapper";
import { lazy } from "react";

const RenderDashboard = lazy(() => import("../../components/_Dashboard"));
const Dashboard = () => {
  return (
    <>
      <Helmet>
        <title>VCare Admin | Dashboard</title>
      </Helmet>

      <Layout>
        <LazyLoadingWrapper rootStyles={{ minHeight: "calc(100vh - 8rem)" }}>
          <RenderDashboard />
        </LazyLoadingWrapper>
      </Layout>

    </>
  )
};

export default Dashboard;
