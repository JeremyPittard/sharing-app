import Head from 'next/head'
import React, {useState, useEffect} from 'react'

const Homepage = () => {

  const [linkValue, setLinkValue] = useState("");

  const copyLinkValue = (fieldTarget) => {
      var text = document.getElementById(fieldTarget).innerText;
      var elem = document.createElement("textarea");
      document.body.appendChild(elem);
      elem.value = text;
      elem.select();
      document.execCommand("copy");
      document.body.removeChild(elem);
  }

  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>Home!</h1>

        <div className="form">
          <input type="text" placeholder="enter link to share here" onKeyUp={(e) => setLinkValue(e.target.value)} />
          <div className="output-wrapper">
              <code id="link-output">https://www.sharethings.com?sharing=https://{linkValue.replace('https://', '').replace('http://', '')}</code> <button onClick={() => copyLinkValue('link-output')} >copy link</button>
              <code id="markup-output">&lt;a href="https://www.sharethings.com?sharing=https://{linkValue.replace('https://', '').replace('http://', '')}" rel="noopener noreferrer"&gt;share me!&lt;/a&gt;</code> <button onClick={() => copyLinkValue('markup-output')}>copy markup</button>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Homepage;
