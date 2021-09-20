import "../styles/globals.css";
import "@fortawesome/fontawesome-svg-core/styles.css";

import { config } from "@fortawesome/fontawesome-svg-core";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";

import { MainLayout } from "../components/Layout";
import { AppContext, AppProvider } from "../context";

config.autoAddCss = false;

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <AppProvider>
        <AppContext.Consumer>
          {() => {
            return (
              <>
                <MainLayout>
                  <Component {...pageProps} />
                </MainLayout>
              </>
            );
          }}
        </AppContext.Consumer>
      </AppProvider>
    </SessionProvider>
  );
}

export default MyApp;
