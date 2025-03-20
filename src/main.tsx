import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "@mui/material/styles";
import App from "./App";
import {store} from "./redux/store/store";
import ScrollToTop from "./components/utilities/ScrollToTop";
import theme from "./utils/theme";


const root = ReactDOM.createRoot(document.getElementById("root")!);

const queryClient = new QueryClient();

root.render(
  // <React.StrictMode>
  <BrowserRouter>
    <ScrollToTop />
    <Provider store={store}>
      <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        {/* <ViewMeasurerProvider> */}
        {/* <AuthContext> */}
        <Toaster toastOptions={{ duration: 3000, style: { fontSize: "16px" } }} />
        {/* <ModalContext> */}
        <App />
        {/* </ModalContext> */}
        {/* </AuthContext> */}
        {/* </ViewMeasurerProvider> */}
      </QueryClientProvider>
      </ThemeProvider>
    </Provider>
  </BrowserRouter>,
  // </React.StrictMode>
);