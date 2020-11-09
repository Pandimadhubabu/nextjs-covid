import Header from "components/Header";
import { ThemeProvider } from "emotion-theming";
import GlobalStyles from "components/GlobalStyles/GlobalStyles";
import theme from "../theme/theme.js";
import getConfig from "next/config";
import { useEffect } from "react";
import { useRouter } from "next/router";
import * as gtag from "../lib/gtag";

import { DefaultSeo } from "next-seo";

import SEO from "../next-seo.config";

function MyApp({ Component, pageProps, navigation }) {
  const router = useRouter();
  useEffect(() => {
    const handleRouteChange = (url) => {
      gtag.pageview(url);
    };
    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);
  return (
    <>
      <DefaultSeo {...SEO} />
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <Header navigation={navigation} />
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}

const { publicRuntimeConfig } = getConfig();

MyApp.getInitialProps = async () => {
  const res = await fetch(`${publicRuntimeConfig.API_URL}/navigation.json`);
  const navigation = await res.json();

  return { navigation };
};

export default MyApp;
