import '../styles/globals.css'
import "./../spinner.css";
import "./../progressbar.css";

import type { AppProps } from 'next/app'
import Navbar from '../components/Navbar';
import { AppProvider } from '../AppContext';

function MyApp({ Component, pageProps }: AppProps) {
  return(
    <>
      <AppProvider>
        <Navbar />
        <Component {...pageProps} />
      </AppProvider>
    </>
  )
}

export default MyApp
