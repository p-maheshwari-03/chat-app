import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { Layout } from '../components/layout'



function MyApp({ Component, pageProps }: AppProps) {

  // console.log("pageProps ", pageProps);
  
  return <Layout>
    <Component {...pageProps} />
  </Layout> 

}

export default MyApp
