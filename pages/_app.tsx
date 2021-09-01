import "../styles/globals.css";
import "@fortawesome/fontawesome-svg-core/styles.css";

import { config } from "@fortawesome/fontawesome-svg-core";
import type { AppProps } from "next/app";

import Footer from "../components/Footer";
import { MainLayout } from "../components/Layout";
import { AppContext, AppProvider } from "../context";

config.autoAddCss = false;

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AppProvider>
      <AppContext.Consumer>
        {({ showFooter }) => {
          return (
            <>
              <MainLayout>
                <Component {...pageProps} />
              </MainLayout>
              {showFooter ? <Footer /> : null}
            </>
          );
        }}
      </AppContext.Consumer>
    </AppProvider>
  );
}

export default MyApp;
