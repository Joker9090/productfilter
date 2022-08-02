import Head from 'next/head'
import React from 'react'
import App from '../containers/App';

const Home = () => {
  return (
    <div>
      <Head>
        <title>Product Filter Challenge</title>
        <meta name="description" content="Product Filter" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* @ts-ignore */}
      <App productKey={null} />
    </div>
  )
}

export default Home;