import  { lazy } from "react";
import { Helmet } from "react-helmet";
const RendorEnquiry = lazy(() => import("../../components/_Enquiry"));
const Enquiry = () => {
  return (
    <>
    <Helmet>
        <title>VCare | Enquiry</title>
    </Helmet>

    <RendorEnquiry/>
    </>
  )
};

export default Enquiry;
