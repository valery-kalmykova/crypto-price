import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { CurrencyProvider } from "@/context/currencies";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={darkTheme}>
      <CurrencyProvider>
        <Component {...pageProps} />
      </CurrencyProvider>
    </ThemeProvider>
  );
}
