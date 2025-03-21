import { Helmet } from "react-helmet";
import Layout from "../../components/Layout";
import LazyLoadingWrapper from "../../components/utilities/LazyLoadingWrapper";
import { lazy } from "react";

const RenderUsers = lazy(() => import("../../components/_Users"));

const Users = () => {
  return (
    <>
      <Helmet>
        <title>VCare Admin | Users</title>
      </Helmet>

      <Layout>
        <LazyLoadingWrapper rootStyles={{ minHeight: "calc(100vh - 8rem)" }}>
          <RenderUsers />
        </LazyLoadingWrapper>
      </Layout>
    </>
  );
};

export default Users; 