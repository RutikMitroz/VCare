import { Box, Container } from "@mui/material";
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
                <Container
                    component="main"
                    maxWidth="md"
                    sx={{
                        height: "100%",
                        position: "relative",
                        display: "flex",
                        flexDirection: "column",
                        minHeight: viewMeasurerContext?.height,
                        // backgroundColor: "#EEF3F6",
                    }}
                >
                    {children}
                </Container>
            ) : (
                <Box sx={{ minHeight: viewMeasurerContext?.height, height: "100%" }}>{children}</Box>
            )}
        </>
    );
};

export default Layout;
