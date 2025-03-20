import { useContext, createContext, useMemo } from "react";

import { useMediaQuery } from "@mui/material";

interface ContextValues {
    height: string;
    maxWidth_500: boolean;
    maxWidth_600: boolean;
    maxWidth_750: boolean;
    maxWidth_800: boolean;
    maxWidth_900: boolean;
    maxWidth_960: boolean;
    maxWidth_1000: boolean;
}

const ViewMeasurerContext = createContext<ContextValues | null>(null);
export const useViewMeasurerContext = () => useContext(ViewMeasurerContext);

const ViewMeasurerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const maxWidth_500 = useMediaQuery("(max-width: 500px)");
    const maxWidth_600 = useMediaQuery("(max-width: 600px)");
    const maxWidth_750 = useMediaQuery("(max-width: 750px)");
    const maxWidth_800 = useMediaQuery("(max-width: 800px)");
    const maxWidth_900 = useMediaQuery("(max-width: 900px)");
    const maxWidth_960 = useMediaQuery("(max-width: 960px)");
    const maxWidth_1000 = useMediaQuery("(max-width: 1000px)");

    const height = useMemo(() => (maxWidth_900 ? "calc(100vh - 8rem - 8rem)" : "calc(100vh - 8rem)"), [maxWidth_900]);

    return (
        <ViewMeasurerContext.Provider
            value={{
                height,
                maxWidth_500,
                maxWidth_600,
                maxWidth_750,
                maxWidth_800,
                maxWidth_900,
                maxWidth_960,
                maxWidth_1000,
            }}
        >
            {children}
        </ViewMeasurerContext.Provider>
    );
};

export default ViewMeasurerProvider;
