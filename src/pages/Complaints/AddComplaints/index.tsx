import { Helmet } from "react-helmet";
import Layout from "../../../components/Layout";
import LazyLoadingWrapper from "../../../components/utilities/LazyLoadingWrapper";
import { lazy } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
const RenderAddComplaints = lazy(() => import("../../../components/_Complaints/_AddComplaints"));

const AddComplaints = () => {
  return (
    <>
      <Helmet>
        <title>VCare Admin | Complaints</title>
      </Helmet>

      <Layout>
        <LazyLoadingWrapper rootStyles={{ minHeight: "calc(100vh - 8rem)" }}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <RenderAddComplaints />
          </LocalizationProvider>
        </LazyLoadingWrapper>
      </Layout>
    </>
  );
};

export default AddComplaints; 