import { createTheme, ThemeProvider } from "@mui/material/styles";
import React from "react";

declare module "@mui/material/styles" {
  interface Theme {
    colorSelection: {
      darkred: string;
      dark: string;
      smotheOrange: string;
      pink: string;
      yellow: string;
      blueSky: string;
      darkGreen: string;
      lightGreen: string;
      blueBird: string;
      purpleBird: string;
      redViolet: string;
    };
    text: {
      buleText?: string;
    };
    misc: {
      hoveblue: string;
      borderGrey: string;
      inputBorder: string;
      lightYellow: string;
      disabled: string;
      success:string;
      selectedBlue:string;
    };
  }
  interface ThemeOptions {
    colorSelection: {
      darkred: string;
      dark: string;
      smotheOrange: string;
      pink: string;
      yellow: string;
      blueSky: string;
      darkGreen: string;
      lightGreen: string;
      blueBird: string;
      purpleBird: string;
      redViolet: string;
    };
    text: {
      buleText?: string;
    };
    misc: {
      hoveblue?: string;
      borderGrey: string;
      inputBorder: string;
      lightYellow: string;
      disabled: string;
      success:string;
      selectedBlue:string;
    };
  }
}

export const theme = createTheme({
  spacing: (value: number) => value * 2,
  typography: {
    fontFamily: ["Work Sans", "sans-serif"].join(","),
    h1: {
      fontSize: "36px",
      fontWeight: 400,
      lineHeight: "125%",
      color: "#333333",
    },

    h5: {
      fontSize: "12px",
      fontWeight: 500,
      lineHeight: "16px",
      color: "#333333",
    },
  },
  palette: {
    primary: {
      main: "#333333",
      contrastText: "#FFFFFF",
      dark: "#060606",
      light: "#7D69FF",
    },
    secondary: {
      main: "#A5A5A5",
      light: "#878787",
      dark: "#D8564B",
      contrastText: "#EBF1FF",
    },
    info: {
      main: "#FAFAFA",
      light: "#F1F9F4",
      dark: "#2F543C",
      contrastText: "#C1C1C1",
    },
    warning: {
      main: "#F5F5F5",
      light: "#3A70FF",
      dark: "#D9D9D9",
      contrastText: "#6B4F23",
    },
    error: {
      main: "#FFF8EE",
    },
  },
  colorSelection: {
    darkred: "#EE2C32",
    dark: "#000000",
    smotheOrange: "#F68A21",
    pink: "#FF44F7",
    yellow: "#FDF104",
    blueSky: "#00FEFF",
    darkGreen: "#00A653",
    lightGreen: "#01FA9F",
    blueBird: "#0F81C5",
    purpleBird: "#683090",
    redViolet: "#C81689",
  },
  text: {
    buleText: "#7D69FF",
  },
  misc: {
    hoveblue: "#F2F0FF",
    borderGrey: "#EBEBEB",
    inputBorder: "#DFDFDF",
    lightYellow: "#FEBD54",
    disabled: "#0000001f",
    success:"#03D103",
    selectedBlue: '#2F80ED',

  },
});

interface IProps {
  children: React.ReactNode;
}

export function CustomMuiThemeProvider({ children }: IProps) {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
