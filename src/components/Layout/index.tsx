import { Box } from "@mui/material";
import { useViewMeasurerContext } from "../../context/ViewMeasurerContext";
import Header from "../utilities/Header";

interface LayoutProps {
    children: React.ReactNode;
    header?: boolean;
    wrapInContainer?: boolean;
}

const Layout: React.FC<LayoutProps> = ({ children, header = true, wrapInContainer = true }) => {
    const viewMeasurerContext = useViewMeasurerContext();

    return (
        <>
            {header ? <Header /> : null}

            {wrapInContainer === true ? (
                <Box
                    component="main"
                    sx={{
                        width: "100%",
                        height: "100%",
                        position: "relative",
                        display: "flex",
                        flexDirection: "column",
                        padding: "64px", // Account for header (64px) + navbar height
                        minHeight: viewMeasurerContext?.height,
                        backgroundColor: "#EEF3F6",
                    }}
                >
                    {children}
                </Box>
            ) : (
                <Box sx={{ minHeight: viewMeasurerContext?.height, height: "100%" }}>{children}</Box>
            )}
        </>
    );
};

export default Layout;
