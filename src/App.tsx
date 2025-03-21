import { Route, Routes } from "react-router-dom";
import FullPageInfo from "./components/utilities/FullPageInfo";
import ErrorBoundary from "./components/utilities/ReactErrorBoundary";
import Enquiry from "./pages/Enquiry";
import './index.css';
import Order from "./pages/Order";
import EnquiryDetails from "./pages/EnquiryDetails";


function App() {
  window.addEventListener("vite:preloadError", () => {
    window.location.reload();
  });

  return (
    <>
      <ErrorBoundary>
        {import.meta.env.VITE_NODE_ENV === "pre_production" ? (
          <FullPageInfo message="We are launching soon!" rootStyles={{ height: "100vh", width: "100vw" }} />
        ) : (
          <Routes>
            <Route path="/enquiry" element={<Enquiry />} />
            <Route path="/enquiry/:id" element={<EnquiryDetails />} />
            <Route path="/order" element={<Order />} />
          </Routes>
        )}
      </ErrorBoundary>
    </>
  );
}

export default App;
