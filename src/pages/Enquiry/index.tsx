import React, { lazy } from "react";
import { Helmet } from "react-helmet";
const rendorEnquiry = lazy(() => import("../../components/_Enquiry"));
const Enquiry = () => {
  return (
    <>
    <Helmet>
        <title>Enquiry</title>
    </Helmet>
    <rendorEnquiry/>
    </>
};

export default Enquiry;
