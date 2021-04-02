import Head from "next/head";
import React, { useState, useEffect } from "react";
import LlamaLogo from "../public/img/logo-large.svg";

import gsap from "gsap";
import ScrollToPlugin from "gsap/dist/ScrollToPlugin";
import { BiCoffeeTogo, BiLock, BiMailSend } from "react-icons/bi";
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedin,
  FaPinterest,
} from "react-icons/fa";

gsap.registerPlugin(ScrollToPlugin);

const Share = () => {
  const [exclude, setExclude] = useState({
    fb: false,
    linked: false,
    twitter: false,
    pin: false,
    mail: false,
  });

  const [site, setSite] = useState("");
  const [sitePreview, setSitePreview] = useState(null);
  const [isFetched, setFetched] = useState(false);

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

  function handleErrors(response) {
    if (!response.ok) {
      throw Error(response.statusText);
    }
    return response;
  }

  let colors = {
    "aqua-llama": "#7CC9B4",
    "soft-llama-pink": "#e4c3c3",
    "calma-llama": "#4b31a1",
    "violet-llama": "#7e7192",
    "darth-llama": "#00140F",
  };

  let globeAnimation = gsap.timeline({
    repeat: -1,
    defaults: {
      duration: 0.5,
      ease: "power3",
    },
  });

  if (!isFetched) {
    const globe = document.getElementById("globe");

    globeAnimation
      .to(globe, { fill: colors["violet-llama"] })
      .to(globe, { fill: colors["soft-llama-pink"] })
      .to(globe, { fill: colors["calma-llama"] });
  }

  useEffect(() => {
    console.log(exclude);
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has("sharing")) {
      setSite(urlParams.get("sharing"));
    }
    // todo show loader/skeleton until fetched
    fetch(
      `https://api.linkpreview.net/?key=826cf34168179abe59fe4438b1c31d21&q=${urlParams.get(
        "sharing"
      )}`,
      {
        method: "GET",
        mode: "cors",
      }
    )
      .then(handleErrors)
      .then((response) => response.json())
      .then((data) => {
        setSitePreview(data);
        setFetched(true)
      });

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

  const scrolling = (e, destination) => {
    e.preventDefault();
    gsap.to(window, { scrollTo: destination });

    let destinationElement = document.getElementById(
      destination.replace("#", "")
    );

    destinationElement.setAttribute("tabIndex", "0");
    destinationElement.focus();
  };

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
      <nav className="md:container mx-auto px-5 xl:px-0 py-5 absolute md:relative top-0 w-full">
        <ul className="md:flex items-center justify-end md:justify-start md:items-end ">
          <li className="hidden md:block">
            <a href="/" className="text-3xl flex items-end font-heading">
              <img
                src="/img/logo-large.svg"
                alt="share-llama logo"
                className="inline mr-5"
              />
              ShareLlama
            </a>
          </li>
          <li className="text-xl md:ml-auto md:mr-12 block mt-0">
            <a
              href="#what-it-is"
              className="flex items-center whats-this justify-end md:justify-start"
              onClick={(e, destination) => scrolling(e, "#what-it-is")}
            >
              <span className="rounded-full flex items-center text-aqua-llama bg-darth-llama h-14 w-14 md:h-12 md:w-12 text-3xl justify-center md:mt-0 mr-2 transition-all duration-200 ease-in-out">
                ?
              </span>
              <span className="hidden md:block">What is this?!</span>
            </a>
          </li>
          <li className="hidden md:block">
            <a
              href="#what-it-is"
              className="bg-darth-llama text-aqua-llama rounded-md px-4 py-2 text-xl flex items-center focus:bg-aqua-llama focus:text-darth-llama hover:bg-aqua-llama hover:text-darth-llama transition-all duration-200 ease-in-out"
              onClick={(e, destination) => scrolling(e, "#security-tips")}
            >
              <BiLock className="mr-2.5" />
              Security Check
            </a>
          </li>
        </ul>
      </nav>
      <main>
        <div className="container px-12 md:px-36 pt-14 md:pt-28 mx-auto text-center text-darth-llama h-screen items-center flex md:block">
          <div className="form flex flex-col md:text-xl max-w-xl  md:max-w-full lg:max-w-xl mx-auto">
            <h1 className="text-3xl mb-5">Share to Social Media</h1>
            {isFetched ? (
              sitePreview != null &&
              sitePreview.image != null && (
                <img
                  src={sitePreview.image}
                  alt={sitePreview.title}
                  className="max-w-full block md:max-w-xs mx-auto"
                />
              )
            ) : (
              <div className="flex justify-center w-full">
                <LlamaLogo />
              </div>
            )}
            <code className="text-sm bg-darth-llama text-aqua-llama rounded-md px-4 py-2 w-full text-center block my-5 whitespace-nowrap overflow-x-auto">
              {site.replace("http://", "https://")}
            </code>{" "}
            <div className="share-wrap flex flex-row justify-around w-full mt-5 items-center mx-auto text-5xl">
              {!exclude.fb && (
                <a
                  href={fbLink}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label="share link to facebook"
                  className="text-bookface hover:t"
                >
                  <FaFacebookF />
                </a>
              )}
              {!exclude.twitter && (
                <a
                  href={twitterLink}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label="share link to twitter"
                  className="text-chic-tweetz hover:t"
                >
                  <FaTwitter />
                </a>
              )}
              {!exclude.linked && (
                <a
                  href={linkedInLink}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label="share link to linked in"
                  className="text-linked hover:t"
                >
                  <FaLinkedin />
                </a>
              )}
              {!exclude.pin && (
                <a
                  href={pinterestLink}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label="Share link to pinterest"
                  className="text-pints"
                >
                  <FaPinterest />
                </a>
              )}
              {!exclude.mail && (
                <a
                  href={mailtoLink}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label="share link via email"
                  className=" hover:t"
                >
                  <BiMailSend />
                </a>
              )}
            </div>
          </div>
        </div>

        <div className="container py-28 mx-auto text-darth-llama px-5 md:px-0">
          <div className="form md:text-xl max-w-xl mx-auto">
            <h2
              className="text-5xl text-center focus:outline-none"
              id="what-it-is"
            >
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
            <h2
              className="text-5xl text-center mt-10 mb-2 focus:outline-none"
              id="security-tips"
            >
              Security Check
            </h2>
            <code className="text-sm bg-darth-llama text-aqua-llama rounded-md px-4 py-2 w-full text-center block whitespace-nowrap overflow-x-auto">
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
            </ul>{" "}
            <a
              href="#"
              className="bg-darth-llama text-aqua-llama rounded-md px-4 py-2 text-xl flex items-center w-60 justify-center text-center mx-auto my-5 focus:bg-aqua-llama focus:text-darth-llama hover:bg-aqua-llama hover:text-darth-llama transition-all duration-200 ease-in-out"
              onClick={(e) => {
                e.preventDefault(), document.getElementById("bmc-wbtn").click();
              }}
            >
              <BiCoffeeTogo className="mr-2.5" />
              Caffeinate me!
            </a>
            <p className="mt-10">
              if you like this tool, I'd totally appreciate if you hit the buy
              me a coffee button up there 👆, all proceeds will go towards the
              hosting and maintainence of this and other sideprojects
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Share;
