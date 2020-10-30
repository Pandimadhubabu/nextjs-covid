import { ThemeProvider } from "emotion-theming";
import GlobalStyles from "components/GlobalStyles/GlobalStyles";
import theme from "../theme/theme.js";
import getConfig from "next/config";
import { DefaultSeo } from "next-seo";

import SEO from "../next-seo.config";

function MyApp({ Component, pageProps }) {
  console.log(MyApp);

  return (
    <>
      <DefaultSeo {...SEO} />
      <ThemeProvider theme={theme}>
        <GlobalStyles />

        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}

const { publicRuntimeConfig } = getConfig();

export default MyApp;
