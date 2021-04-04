import Head from 'next/head'
import React, {useState, useEffect} from 'react'
import LlamaLogo from "./LlamaLogo";

import gsap from "gsap";



const Loading = () => {

  const colors = {
    "aqua-llama": "#7CC9B4",
    "soft-llama-pink": "#e4c3c3",
    "calma-llama": "#4b31a1",
    "violet-llama": "#7e7192",
    "darth-llama": "#00140F",
  };



  const globeAnimation = gsap.timeline({
    repeat: -1,
    defaults: {
      duration: 0.5,
      ease: "power3",
    },
  });

  useEffect(() => {
    const globe = document.getElementById("globe");

    globeAnimation
    .to(globe, { fill: colors["violet-llama"] })
    .to(globe, { fill: colors["soft-llama-pink"] })
    .to(globe, { fill: colors["calma-llama"] });
  }, [])

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
        <LlamaLogo />
      </main>
    </div>
  )
}

export default Loading;
