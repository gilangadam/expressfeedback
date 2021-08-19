import Head from 'next/head';
import { CSSReset, ThemeProvider } from '@chakra-ui/core';
import { Global, css } from '@emotion/core';
import { DefaultSeo } from 'next-seo';

import { AuthProvider } from '@/lib/auth';
import customTheme from '@/styles/theme';

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
            min-width: 360px;
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
  return (
    <ThemeProvider theme={customTheme}>
      <AuthProvider>
        <DefaultSeo {...SEO} />
        <GlobalStyle />
        <Component {...pageProps} />
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
