import '../styles/index.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import type { AppProps } from 'next/app'
import { wrapper } from "../redux/store";
import { useRouter } from 'next/router';

function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default wrapper.withRedux(App);

