import { createTheme, ThemeProvider } from "@mui/material/styles";

export const themeFont = createTheme({
  typography: {
    poster: {
      color: "#1976D2",
      fontSize: "14px",
    },
  },
});

export const linkUnderlineColor = {
  textDecorationColor: "rgba(25, 118, 210, 0.4)",
};
