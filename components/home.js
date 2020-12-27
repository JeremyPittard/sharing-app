import Head from "next/head";
import React, { useState, useEffect } from "react";

const Homepage = () => {
  const [linkValue, setLinkValue] = useState("");
  const [excludeValue, setExcludeValue] = useState("");

  const copyLinkValue = (fieldTarget) => {
    var text = document.getElementById(fieldTarget).innerText;
    var elem = document.createElement("textarea");
    document.body.appendChild(elem);
    elem.value = text;
    elem.select();
    document.execCommand("copy");
    document.body.removeChild(elem);
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
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="bg-aqua-llama">
        <div className="container mx-auto">
          <h1>Home!</h1>

          <div className="form flex flex-col">
            <input
              type="text"
              placeholder="enter link to share here"
              onKeyUp={(e) => setLinkValue(e.target.value)}
            />
            <code id="link-output">
              https://www.sharethings.com?sharing=https://
              {linkValue.replace("https://", "").replace("http://", "")}
              {excludeValue}
            </code>{" "}
            <button onClick={() => copyLinkValue("link-output")}>
              copy link
            </button>
            <code id="markup-output">
              &lt;a href="https://www.sharethings.com?sharing=https://
              {linkValue.replace("https://", "").replace("http://", "")}
              {excludeValue}" rel="noopener noreferrer"&gt;share me!&lt;/a&gt;
            </code>{" "}
            <button onClick={() => copyLinkValue("markup-output")}>
              copy markup
            </button>
            <div className="check-container">
              <input
                type="checkbox"
                name="facebook"
                value="facebook"
                id="check-facebook"
                onChange={(e) => addToExcludeValue(e)}
              />
              <label htmlFor="facebook">Facebook</label>
            </div>
            <div className="check-container">
              <input
                type="checkbox"
                name="linkedin"
                value="linkedin"
                id="check-linkedin"
                onChange={(e) => addToExcludeValue(e)}
              />
              <label htmlFor="linkedin">linkedin</label>
            </div>
            <div className="check-container">
              <input
                type="checkbox"
                name="twitter"
                value="twitter"
                id="check-twitter"
                onChange={(e) => addToExcludeValue(e)}
              />
              <label htmlFor="twitter">Twitter</label>
            </div>
            <div className="check-container">
              <input
                type="checkbox"
                name="pinterest"
                value="pinterest"
                id="check-pinterest"
                onChange={(e) => addToExcludeValue(e)}
              />
              <label htmlFor="pinterest">Pinterest</label>
            </div>
            <div className="check-container">
              <input
                type="checkbox"
                name="mail"
                value="mail"
                id="check-mail"
                onChange={(e) => addToExcludeValue(e)}
              />
              <label htmlFor="mail">Email</label>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Homepage;
