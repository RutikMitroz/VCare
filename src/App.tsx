import { Route, Routes } from "react-router-dom";
import FullPageInfo from "./components/utilities/FullPageInfo";
import ErrorBoundary from "./components/utilities/ReactErrorBoundary";
import Enquiry from "./pages/Enquiry";
import './index.css';
import Dashboard from "./pages/Dashboard";
import Reports from "./pages/Reports";
import Complaints from "./pages/Complaints";
import Inventory from "./pages/Inventory";
import Payments from "./pages/Payments";
import OrderDetail from "./pages/OrderDetail";
import Order from "./pages/Order";
import EnquiryDetails from "./pages/EnquiryDetails";
import Product from "./pages/Master/Product";
import Client from "./pages/Master/Client";
import UserMaster from "./pages/Master/UserMaster";
import Supplier from "./pages/Master/Supplier";
import AddGRN from "./pages/AddGRN";
import ComplaintsDetails from "./pages/ComplaintsDetails";
import Category from "./pages/Master/Category";

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
            <Route path="/enquiry/:enquiryId" element={<EnquiryDetails />} />
            <Route path="/orders" element={<Order />} />
            <Route path="/orders/:id" element={<OrderDetail />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/complaints" element={<Complaints />} />
            <Route path="/complaints/:id" element={<ComplaintsDetails/>} />
            <Route path="/inventory" element={<Inventory />} />
            <Route path="/inventory/add-grn" element={<AddGRN />} />
            <Route path="/payments" element={<Payments />} />

            {/* Master Routes */}
            <Route path="/masters/category" element={<Category />} />
            <Route path="/masters/product" element={<Product />} />
            <Route path="/masters/client" element={<Client />} />
            <Route path="/masters/user-master" element={<UserMaster />} />
            <Route path="/masters/supplier" element={<Supplier />} />
          </Routes>
        )}
      </ErrorBoundary>
    </>
  );
}

export default App;
