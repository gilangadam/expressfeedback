import { ProvideAuth } from '../lib/auth';

function App({ Component, pageProps }) {
  return (
    <ProvideAuth>
      <Component {...pageProps} />
    </ProvideAuth>
  );
}

export default App;
