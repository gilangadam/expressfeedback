import Head from 'next/head';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { CSSReset, ThemeProvider } from '@chakra-ui/core';
import { Global, css } from '@emotion/core';
import { mdx, MDXProvider } from '@mdx-js/react';
import { DefaultSeo } from 'next-seo';

import customTheme from '@/styles/theme';
import MDXComponents from '@/components/MDXComponents';
import { pageView } from '@/lib/gtag';
import { AuthProvider } from '@/lib/auth';

import SEO from 'next-seo.config';

const GlobalStyle = ({ children }) => {
  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, viewport-fit=cover, initial-scale=1"
        />
      </Head>
      <CSSReset />
      <Global
        styles={css`
          html {
            scroll-behavior: smooth;
          }
          #__next {
            display: flex;
            flex-direction: column;
            min-height: 100vh;
          }
        `}
      />
      {children}
    </>
  );
};

const App = ({ Component, pageProps }) => {
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url) => {
      pageView(url);
    };
    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  return (
    <ThemeProvider theme={customTheme}>
      <AuthProvider>
        <MDXProvider components={MDXComponents}>
          <DefaultSeo {...SEO} />
          <GlobalStyle />
          <Component {...pageProps} />
        </MDXProvider>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
