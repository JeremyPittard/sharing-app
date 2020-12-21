import Head from 'next/head'
import React, {useState, useEffect} from 'react'

const Loading = () => {
  return (
    <div>
      <Head>
        <title>Loading</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>Loading</h1>
      </main>
    </div>
  )
}

export default Loading;
