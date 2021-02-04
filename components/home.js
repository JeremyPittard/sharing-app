import Head from "next/head";
import { BiCoffeeTogo, BiCopyAlt } from "react-icons/bi";
import React, { useState, useEffect } from "react";
import gsap from "gsap";
import ScrollToPlugin from "gsap/dist/ScrollToPlugin";

gsap.registerPlugin(ScrollToPlugin);

const Homepage = () => {
  const [linkValue, setLinkValue] = useState("");
  const [excludeValue, setExcludeValue] = useState("");
  const theUrl = window.location.href;

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
    document.body.appendChild(buyMeACoffeeScript);
    return () => {
      document.body.removeChild(buyMeACoffeeScript);
      document.body.removeChild(document.getElementById("bmc-wbtn"));
    };
  }, []);

  const copyLinkValue = (fieldTarget) => {
    var text = document.getElementById(fieldTarget).innerText;
    var elem = document.createElement("textarea");
    document.body.appendChild(elem);
    elem.value = text;
    elem.select();
    document.execCommand("copy");
    document.body.removeChild(elem);

    copyToast();
  };

  const scrolling = (e, destination) => {
    e.preventDefault();
    gsap.to(window, { scrollTo: destination });
  };

  const copyToast = () => {
    const toast = document.getElementById("copy-toast");
    gsap.to(toast, {
      opacity: 1,
      duration: 0.5,
      translateY: "-15",
      yoyo: true,
      repeat: 1,
      repeatDelay: 1,
    });
  };

  const addToExcludeValue = (e) => {
    var checked = document.querySelectorAll("input:checked").length;

    if (checked == 1 && e.target.checked) {
      setExcludeValue("&exclude=" + e.target.value);
    } else if (checked == 0) {
      setExcludeValue("");
    } else {
      if (e.target.checked) {
        let oldValue = excludeValue;
        setExcludeValue(`${oldValue},${e.target.value}`);
      } else {
        let oldValue = excludeValue;
        oldValue.includes(`${e.target.value},`)
          ? setExcludeValue(oldValue.replace(`${e.target.value},`, ""))
          : setExcludeValue(oldValue.replace(`,${e.target.value}`, ""));
      }
    }
    console.log(e.target.checked);
  };

  return (
    <>
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
      <nav className="md:container mx-auto px-5 md:px-0 md:py-5">
        <ul className="md:flex items-end">
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
          <li className="text-xl md:ml-auto mr-12 inline-block md:block mt-5 md:mt-0">
            <a
              href="#what-it-is"
              className="flex items-center whats-this"
              onClick={(e, destination) => scrolling(e, "#what-it-is")}
            >
              <span className="rounded-full flex items-center text-aqua-llama bg-darth-llama h-14 w-14 md:h-12 md:w-12 text-3xl justify-center md:mt-0 mr-2 transition-all duration-200 ease-in-out">
                ?
              </span>
              <span className="hidden md:block">What is this?!</span>
            </a>
          </li>
          <li className="inline-block md:block">
            <a
              href="#"
              className="rounded-full h-14 w-14 md:h-auto md:w-auto bg-darth-llama text-aqua-llama md:rounded-md px-4 py-2 text-xl flex items-center focus:bg-aqua-llama focus:text-darth-llama hover:bg-aqua-llama hover:text-darth-llama transition-all duration-200 ease-in-out"
              onClick={(e) => {
                e.preventDefault(), document.getElementById("bmc-wbtn").click();
              }}
            >
              <BiCoffeeTogo className="md:mr-2.5 mx-auto md:my-0" />
              <span className="hidden md:block">Caffeinate me!</span>
            </a>
          </li>
        </ul>
      </nav>
      <main>
        <div className="container px-12 md:px-36 pt-28 mx-auto flex items-center text-darth-llama">
          <div className="form flex flex-col md:text-xl max-w-xl mx-auto">
            <h1 className="text-center text-3xl mb-5">Share To Social Media</h1>
            <label htmlFor="link entry" className="mb-2">
              <strong>Step 1:</strong> Enter the link you wish to share.
            </label>
            <input
              type="text"
              placeholder="enter link to share here"
              onKeyUp={(e) => setLinkValue(e.target.value)}
              className="border-darth-llama border-2 rounded-md px-4 py-2 mb-5"
              name="link-entry"
            />
            <p>
              <strong>Step 2:</strong> Select platforms you don't want to share
              on.{" "}
            </p>
            <div className="check-container mt-2">
              <input
                type="checkbox"
                name="facebook"
                value="facebook"
                id="check-facebook"
                className="mr-2 cursor-pointer"
                onChange={(e) => addToExcludeValue(e)}
              />
              <label
                htmlFor="facebook"
                onClick={() =>
                  document.getElementById("check-facebook").click()
                }
                className="cursor-pointer"
              >
                Facebook
              </label>
            </div>
            <div className="check-container">
              <input
                type="checkbox"
                name="linkedin"
                value="linkedin"
                id="check-linkedin"
                className="mr-2"
                onChange={(e) => addToExcludeValue(e)}
              />
              <label
                htmlFor="linkedin"
                onClick={() =>
                  document.getElementById("check-linkedin").click()
                }
                className="cursor-pointer"
              >
                linkedin
              </label>
            </div>
            <div className="check-container">
              <input
                type="checkbox"
                name="twitter"
                value="twitter"
                id="check-twitter"
                className="mr-2 cursor-pointer"
                onChange={(e) => addToExcludeValue(e)}
              />
              <label
                htmlFor="twitter"
                onClick={() => document.getElementById("check-twitter").click()}
                className="cursor-pointer"
              >
                Twitter
              </label>
            </div>
            <div className="check-container">
              <input
                type="checkbox"
                name="pinterest"
                value="pinterest"
                id="check-pinterest"
                className="mr-2 cursor-pointer"
                onChange={(e) => addToExcludeValue(e)}
              />
              <label
                htmlFor="pinterest"
                onClick={() =>
                  document.getElementById("check-pinterest").click()
                }
                className="cursor-pointer"
              >
                Pinterest
              </label>
            </div>
            <div className="check-container">
              <input
                type="checkbox"
                name="mail"
                value="mail"
                id="check-mail"
                className="mr-2 cursor-pointer"
                onChange={(e) => addToExcludeValue(e)}
              />
              <label
                htmlFor="mail"
                onClick={() => document.getElementById("check-mail").click()}
                className="cursor-pointer"
              >
                Email
              </label>
            </div>
            <p className="mt-5 mb-2">
              <strong>Step 3:</strong> copy either the link or the markup and
              share til your hearts content ❤
            </p>
            <code
              id="link-output"
              className="text-sm bg-darth-llama text-aqua-llama rounded-md px-4 py-2 "
            >
              {theUrl}?sharing=https://
              {linkValue.replace("https://", "").replace("http://", "")}
              {excludeValue}
            </code>{" "}
            <p></p>
            <button
              onClick={() => copyLinkValue("link-output")}
              className="bg-violet-llama text-white rounded-md w-36 px-4 py-2 text-xl flex mx-auto items-center justify-center focus:bg-aqua-llama focus:text-darth-llama hover:bg-aqua-llama hover:text-darth-llama transition-all duration-200 ease-in-out my-5"
            >
              <BiCopyAlt className="mr-2.5" />
              copy link
            </button>
            <code
              id="markup-output"
              className="text-sm bg-darth-llama text-aqua-llama rounded-md px-4 py-2"
            >
              &lt;a href="{theUrl}?sharing=https://
              {linkValue.replace("https://", "").replace("http://", "")}
              {excludeValue}" rel="noopener noreferrer" target="_blank"&gt;share
              me!&lt;/a&gt;
            </code>{" "}
            <button
              onClick={() => copyLinkValue("markup-output")}
              className="bg-violet-llama text-white rounded-md w-48 px-4 py-2 text-xl flex mx-auto items-center justify-center focus:bg-aqua-llama focus:text-darth-llama hover:bg-aqua-llama hover:text-darth-llama transition-all duration-200 ease-in-out my-5"
            >
              <BiCopyAlt className="mr-2.5" />
              copy markup
            </button>
          </div>
        </div>
        <div className="container px-12 md:px-0 py-28 mx-auto text-darth-llama">
          <div className="form md:text-xl max-w-xl mx-auto">
            <h2 className="text-5xl text-center" id="what-it-is">
              ShareLlama{" "}
            </h2>
            <h3 className="text-2xl text-center mb-5">
              A plugin free, share to social media solution!
            </h3>
            <a
              href={`http://localhost:3000/?sharing=${window.location.href}`}
              rel="noopener noreferrer"
              className="focus:bg-aqua-llama focus:text-darth-llama hover:bg-aqua-llama hover:text-darth-llama transition-all duration-200 ease-in-out bg-darth-llama text-aqua-llama rounded-md px-4 py-2 text-xl flex items-center justify-center w-36 mx-auto my-5"
              target="_blank"
            >
              Try me!
            </a>

            <p>
              This tool was created so that content authors could quickly add
              share links to their sites. We do not collect cookies or store any
              data, the primary function of this site is to share to social
              media quickly
            </p>

            <p>
              This page is a link generator tool, which creates a link with a
              query string for the sharing page to use. The sharing page checks
              the query string for the address to share and social media sites
              to exlude. By default it includes Facebook, Twitter, Pinterest and
              LinkedIn by default.
            </p>

            <p className="mt-5">
              if you like this tool, I'd totally appreciate if you hit the buy
              me a coffee button up top 👆, all proceeds will go towards the
              hosting and maintainence of this and other sideprojects
            </p>
          </div>
        </div>
      </main>
      <div
        id="copy-toast"
        className="bg-aqua-llama text-darth-llama fixed bottom-5 right-5 px-5 py-2.5 rounded-md pointer-events-none opacity-0"
      >
        copied to clipboard!
      </div>
    </>
  );
};

export default Homepage;
