import React, { useState, useEffect } from "react";
import Homepage from "../components/home";
import Share from "../components/share";
import Loading from "../components/Loading";

export default function Home() {
  const [checkPath, setPath] = useState("loading");

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    console.log(urlParams);

    if (urlParams.has("sharing")) {
      setPath("sharing");
    } else {
      setPath("home");
    }
  }, []);

  if (checkPath === "sharing") {
    return <Share />;
  } else if (checkPath === "home") {
    return <Homepage />;
  } else {
    return <Loading />;
  }
}
