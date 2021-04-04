import React, {useEffect} from 'react';

const Coffee = () => {

    const buyMeACoffeeScript = document.createElement("script");
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
      const coffeeTrigger = document.createEvent("Event");
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

      return(null)
  
}

export default Coffee;