import Head from 'next/head'
import React, {useState, useEffect} from 'react'

const Loading = () => {
  return (
    <div>
      <Head>
        <title>Loading</title>
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#7E7192" />
        <meta name="msapplication-TileColor" content="#7e7192" />
        <meta name="theme-color" content="#ffffff"></meta>
      </Head>

      <main>
        <h1>Loading</h1>
      </main>
    </div>
  )
}

export default Loading;
