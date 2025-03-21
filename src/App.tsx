import { Route, Routes } from "react-router-dom";
import FullPageInfo from "./components/utilities/FullPageInfo";
import ErrorBoundary from "./components/utilities/ReactErrorBoundary";
import Enquiry from "./pages/Enquiry";
import './index.css';
import Dashboard from "./pages/Dashboard";
import Users from "./pages/Users";
import Reports from "./pages/Reports";
import Complaints from "./pages/Complaints";
import Inventory from "./pages/Inventory";
import Payments from "./pages/Payments";
import OrderDetail from "./pages/OrderDetail";
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
            <Route path="/" element={<Dashboard />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/enquiry" element={<Enquiry />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/orders/:id" element={<OrderDetail />} />
            <Route path="/complaints" element={<Complaints />} />
            <Route path="/inventory" element={<Inventory />} />
            <Route path="/users" element={<Users />} />
            <Route path="/payments" element={<Payments />} />
            <Route path="/enquiry/:id" element={<EnquiryDetails />} />
            <Route path="/orders" element={<Order />} />
          </Routes>
        )}
      </ErrorBoundary>
    </>
  );
}

export default App;
