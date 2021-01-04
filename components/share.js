import Head from "next/head";
import React, { useState, useEffect } from "react";

const Share = () => {
  const [exclude, setExclude] = useState({
    fb: false,
    linked: false,
    twitter: false,
    pin: false,
    mail: false,
  });

  const [site, setSite] = useState("https://www.thiswebsite.com")

  let textContent = "";
  let fbLink = `https://www.facebook.com/sharer/sharer.php?u=${site}`;
  let linkedInLink = `https://www.linkedin.com/shareArticle?mini=true&url=${site}&title=&summary=${textContent}&source=`;
  let twitterLink = `https://twitter.com/intent/tweet?url=${site}&text=${textContent}`;
  let pinterestLink = `https://pinterest.com/pin/create/button/?url=${site}&media=&description=${textContent}`;
  let mailtoLink = `mailto:info@example.com?&subject=&body=${site} ${textContent}`;

  useEffect(() => {
    console.log(exclude);
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has("sharing")) {
      setSite(urlParams.get('sharing'))
      
    }

    if (urlParams.has("exclude")) {
      const excludeString = urlParams.get("exclude");
      let excludeObject = exclude;
      excludeObject.fb = excludeString.includes("facebook") ? true : false;
      excludeObject.linked = excludeString.includes("linkedin") ? true : false;
      excludeObject.twitter = excludeString.includes("twitter") ? true : false;
      excludeObject.mail = excludeString.includes("mail") ? true : false;
      excludeObject.pin = excludeString.includes("pinterest") ? true : false;
      console.log(excludeObject, "theobjects");

      setExclude({ ...exclude, excludeObject });
    }
  }, []);

  return (
    <div>
      <Head>
      <title>ShareLlama</title>
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#7E7192" />
        <meta name="msapplication-TileColor" content="#7e7192" />
        <meta name="theme-color" content="#ffffff"></meta>
      </Head>
      <main>
        <h1>Share!</h1>
        {!exclude.fb && (
          <a
            href={fbLink}
            target="_blank"
            rel="noreferrer noopener"
            aria-label="This is an external link (opens in a new tab)"
            className="block"
          >
            fb
          </a>
        )}
        {!exclude.twitter && (
          <a
            href={twitterLink}
            target="_blank"
            rel="noreferrer noopener"
            aria-label="This is an external link (opens in a new tab)"
            className="block"
          >
            twitter
          </a>
        )}
        {!exclude.linked && (
          <a
            href={linkedInLink}
            target="_blank"
            rel="noreferrer noopener"
            aria-label="This is an external link (opens in a new tab)"
            className="block"
          >
            linked
          </a>
        )}
        {!exclude.pin && (
          <a
            href={pinterestLink}
            target="_blank"
            rel="noreferrer noopener"
            aria-label="This is an external link (opens in a new tab)"
            className="block"
          >
            pinterest
          </a>
        )}
        {!exclude.mail && (
          <a
            href={mailtoLink}
            target="_blank"
            rel="noreferrer noopener"
            aria-label="This is an external link (opens in a new tab)"
            className="block"
          >
            mail
          </a>
        )}
      </main>
    </div>
  );
};

export default Share;
