import Header from 'components/Header'
import { ThemeProvider } from 'emotion-theming'
import GlobalStyles from 'components/GlobalStyles/GlobalStyles'
import theme from '../theme/theme.js'
import getConfig from 'next/config'
import fetch from 'isomorphic-unfetch'
import { DefaultSeo } from 'next-seo'
import ContextWrapper from 'components/ContextWrapper'
import Router from 'next/router'
import { parseCookies  } from 'nookies'


import SEO from '../next-seo.config'

function MyApp({ Component, pageProps, navigation }) {
    console.log(navigation)

    return (
        <>
            <DefaultSeo {...SEO} />
            <ThemeProvider theme={theme}>
                <GlobalStyles />
                <ContextWrapper navigation={navigation}>
                    <Header />
                </ContextWrapper>
                <Component {...pageProps} />
            </ThemeProvider>
        </>
    )
}

const { publicRuntimeConfig } = getConfig()

function redirectUser(ctx, location) {
    if (ctx.req) {
        ctx.res.writeHead(302, { Location: location });
        ctx.res.end();
    } else {
        Router.push(location);
    }
}

MyApp.getInitialProps = async ({Component, ctx}) => {
    let pageProps = {}
    const jwt = parseCookies(ctx).jwt

    const res = await fetch(`${publicRuntimeConfig.API_URL}/navigations.json`)
    const navigation = await res.json()

    if (Component.getInitialProps) {
        pageProps = await Component.getInitialProps(ctx)
    }



    return {
        pageProps,
        navigation
    }
}

export default MyApp
