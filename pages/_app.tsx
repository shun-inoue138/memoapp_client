import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ProSidebarProvider } from "react-pro-sidebar";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ProSidebarProvider>
      <Component {...pageProps} />
    </ProSidebarProvider>
  );
}
