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

  const [site, setSite] = useState("https://www.thiswebsite.com");

  let textContent = "";
  let fbLink = `https://www.facebook.com/sharer/sharer.php?u=${site.replace(
    "http://",
    "https://"
  )}`;
  let linkedInLink = `https://www.linkedin.com/shareArticle?mini=true&url=${site.replace(
    "http://",
    "https://"
  )}&title=&summary=${textContent}&source=`;
  let twitterLink = `https://twitter.com/intent/tweet?url=${site.replace(
    "http://",
    "https://"
  )}&text=${textContent}`;
  let pinterestLink = `https://pinterest.com/pin/create/button/?url=${site.replace(
    "http://",
    "https://"
  )}&media=&description=${textContent}`;
  let mailtoLink = `mailto:info@example.com?&subject=&body=${site.replace(
    "http://",
    "https://"
  )} ${textContent}`;

  let buyMeACoffeeScript = document.createElement("script");
  buyMeACoffeeScript.src =
    "https://cdnjs.buymeacoffee.com/1.0.0/widget.prod.min.js";
  buyMeACoffeeScript.setAttribute("data-name", "BMC-Widget");
  buyMeACoffeeScript.setAttribute("data-id", "jpittard");
  buyMeACoffeeScript.setAttribute("data-x_margin", "18");
  buyMeACoffeeScript.setAttribute("data-y_margin", "18");
  buyMeACoffeeScript.setAttribute("data-id", "jpittard");
  buyMeACoffeeScript.setAttribute(
    "data-description",
    "Support the creation of this tool and more"
  );
  buyMeACoffeeScript.setAttribute(
    "data-message",
    "I'm glad you appreciated this project 😍,thankyou for your support!"
  );
  buyMeACoffeeScript.setAttribute("data-color", "transparent");
  buyMeACoffeeScript.setAttribute("data-position", "right");
  //on render does not actually trigger script, needed to get a little funky
  buyMeACoffeeScript.onload = function () {
    var coffeeTrigger = document.createEvent("Event");
    coffeeTrigger.initEvent("DOMContentLoaded", false, false);
    window.dispatchEvent(coffeeTrigger);
  };

  useEffect(() => {
    console.log(exclude);
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has("sharing")) {
      setSite(urlParams.get("sharing"));
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

    document.body.appendChild(buyMeACoffeeScript);
    return () => {
      document.body.removeChild(buyMeACoffeeScript);
      document.body.removeChild(document.getElementById("bmc-wbtn"));
    };
  }, []);

  return (
    <div>
      <Head>
        <title>ShareLlama</title>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#7E7192" />
        <meta name="msapplication-TileColor" content="#7e7192" />
        <meta name="theme-color" content="#ffffff"></meta>
      </Head>
      <nav className="container mx-auto py-5">
        <ul className="flex items-end">
          <li>
            <a href="/" className="text-3xl flex items-end font-heading">
              <img
                src="/img/logo-large.svg"
                alt="share-llama logo"
                className="inline mr-5"
              />
              ShareLlama
            </a>
          </li>
          <li className="text-xl ml-auto mr-12">
            <a
              href="#what-it-is"
              className="flex items-center"
              onClick={(e, destination) => scrolling(e, "#what-it-is")}
            >
              <span className="rounded-full flex items-center text-aqua-llama bg-darth-llama h-12 w-12 text-3xl justify-center mr-2">
                ?
              </span>
              What is this?!
            </a>
          </li>
          <li className="text-xl mr-12">
            <a
              href="#what-it-is"
              className="flex items-center h-12"
              onClick={(e, destination) => scrolling(e, "#what-it-is")}
            >
              Security Check
            </a>
          </li>
        </ul>
      </nav>
      <main>
        <div className="container px-36 pt-28 mx-auto text-center text-darth-llama h-screen">
          <div className="form flex flex-col md:text-xl max-w-xl mx-auto">
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
          </div>
        </div>

        <div className="container py-28 mx-auto text-darth-llama">
          <div className="form md:text-xl max-w-xl mx-auto">
            <h2 className="text-5xl text-center" id="what-it-is">
              What is this?!{" "}
            </h2>
            <h3 className="text-2xl text-center mb-5">
              A plugin free, share to social media solution!
            </h3>
            <p>
              This tool was created so that content authors could quickly add
              share links to their sites. We do not collect cookies or store any
              data, the primary function of this site is to share to social
              media quickly
            </p>
            <h2 className="text-5xl text-center mt-10 mb-2" id="security-tips">
              Security Check
            </h2>
            <code className="text-sm bg-darth-llama text-aqua-llama rounded-md px-4 py-2 w-full text-center block ">
              {site.replace("http://", "https://")}
            </code>{" "}
            <ul className="mt-5 mb-10">
              <li className="mb-5">
                Check the above url, this is the url that you will be sharing.
                Is this the page that sent you here?
              </li>
              <li className="mb-5">If not, do you recognise it?</li>
              <li className="mb-5">
                If the answer is no, don't share the link - it could be spam or
                worse.
              </li>
            </ul>
              {" "}
              <a
                href="#"
                className="bg-darth-llama text-aqua-llama rounded-md px-4 py-2 text-xl block w-48 text-center mx-auto my-5"
                onClick={(e) => {
                  e.preventDefault(),
                    document.getElementById("bmc-wbtn").click();
                }}
              >
                Buy me a coffee
              </a>
              <p className="mt-5">
              if you like this tool, I'd totally appreciate if you hit the buy
              me a coffee button up there 👆, all proceeds will go towards the
              hosting and maintainence of this and other sideprojects
            </p>
          </div>
          /
        </div>
      </main>
    </div>
  );
};

export default Share;
