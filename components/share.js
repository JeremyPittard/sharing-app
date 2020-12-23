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

  let siteToShare = "https://thiswebsite.com";
  // let textContent = ""; TODO
  let fbLink = `https://www.facebook.com/sharer/sharer.php?u=${siteToShare}`;
  let linkedInLink = `https://www.linkedin.com/shareArticle?mini=true&url=${siteToShare}&title=&summary=${textContent}&source=`;
  let twitterLink = `https://twitter.com/intent/tweet?url=${siteToShare}&text=${textContent}`;
  let pinterestLink = `https://pinterest.com/pin/create/button/?url=${siteToShare}&media=&description=${textContent}`;
  let mailtoLink = `mailto:info@example.com?&subject=&body=${siteToShare} ${textContent}`;

  useEffect(() => {
    console.log(exclude);
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has("sharing")) {
      siteToShare = urlParams.get("sharing");
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
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
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
