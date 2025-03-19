import { createTheme, ThemeOptions } from "@mui/material/styles";

// Extend the Palette interface to include custom colors
declare module "@mui/material/styles" {
  interface Palette {
    custom: {
      white: string;
      input_background: string;
      grey_1: string;
      grey_2: string;
      grey_3: string;
      grey_4: string;
      grey_5: string;
      blue_1: string;
      blue_2: string;
      blue_3: string;
      blue_4: string;
      blue_5: string;
      blue_6: string;
      blue_7: string;
      blue_8: string;
    };
  }
  interface PaletteOptions {
    custom?: {
      white?: string;
      input_background?: string;
      grey_1?: string;
      grey_2?: string;
      grey_3?: string;
      grey_4?: string;
      grey_5?: string;
      blue_1?: string;
      blue_2?: string;
      blue_3?: string;
      blue_4?: string;
      blue_5?: string;
      blue_6?: string;
      blue_7?: string;
      blue_8?: string;
    };
  }
}

// Now you can define your theme using the extended Palette
const theme = createTheme({
  typography: {
    htmlFontSize: 10,
    fontFamily: "Poppins, Oswald",
    h1: { fontSize: "4.25rem" },
    h2: { fontSize: "3.25rem" },
    h3: { fontSize: "2.25rem" },
    h6: { fontSize: "2.15rem" },
    body1: { fontSize: "2rem" },
    body2: { fontSize: "1.8rem" },
    subtitle1: { fontSize: "1.6rem" },
    subtitle2: { fontSize: "1.4rem" },
    subtitle3: { fontSize: "1.2rem" },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        html {
          font-size: 62.5%;
        }
        
        @media only screen and (min-width: 1536px) {
          html {
            font-size: 65%;
          }
        }
        
        @media only screen and (max-width: 1030px) {
          html {
            font-size: 57%;
          }
        }
        
        @media only screen and (max-width: 600px) {
          html {
            font-size: 54%;
          }
        }
      `,
    },
    MuiContainer: {
      styleOverrides: {
        maxWidthMd: { maxWidth: "120rem !important" },
        maxWidthLg: { maxWidth: "100% !important" },
      },
    },
  },
  palette: {
    custom: {
      white: "#fff",
      input_background: "#F4F6FA",

      grey_1: "#575757",
      grey_2: "#707070",
      grey_3: "#dcdcdc",
      grey_4: "#f4f6fa",
      grey_5: "#F8F8F8",

      blue_1: "#0075FC",
      blue_2: "#0078d4",
      blue_3: "#75CFF0",
      blue_4: "#2196f3",
      blue_5: "#000FFF",
      blue_6: "#E0F7FF",
      blue_7: "#00CBE6",
      blue_8: "#000B69",
    },
  },
} as ThemeOptions);

export default theme;
