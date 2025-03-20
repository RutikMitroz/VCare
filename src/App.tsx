import { Route, Routes } from "react-router-dom";
import FullPageInfo from "./components/utilities/FullPageInfo";
import ErrorBoundary from "./components/utilities/ReactErrorBoundary";
import Enquiry from "./pages/Enquiry";

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
          </Routes>
        )}
      </ErrorBoundary>
    </>
  );
}

export default App;
