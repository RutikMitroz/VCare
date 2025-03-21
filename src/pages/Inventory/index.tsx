import { Helmet } from "react-helmet";
import Layout from "../../components/Layout";
import LazyLoadingWrapper from "../../components/utilities/LazyLoadingWrapper";
import { lazy } from "react";

const RenderInventory = lazy(() => import("../../components/_Inventory"));

const Inventory = () => {
  return (
    <>
      <Helmet>
        <title>VCare Admin | Inventory</title>
      </Helmet>

      <Layout>
        <LazyLoadingWrapper rootStyles={{ minHeight: "calc(100vh - 8rem)" }}>
          <RenderInventory />
        </LazyLoadingWrapper>
      </Layout>
    </>
  );
};

export default Inventory; 