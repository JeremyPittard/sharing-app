import gsap from "gsap";
import ScrollToPlugin from "gsap/dist/ScrollToPlugin";

gsap.registerPlugin(ScrollToPlugin);

 
const helpers = {
   handleErrors: function(response) {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response;
      },

      smoothScroll: function(e, destination) {
        e.preventDefault();
        const destinationElement = document.querySelector(destination)
        gsap.to(window, { scrollTo: destination, duration: 0.3, onComplete: setFocus});

        window.history.pushState(null, null, destination)
        
        const setFocus = () => {
          destinationElement.setAttribute("tabIndex", "-1");
          destinationElement.focus();
        }

      },

      copyLinkValue: function(fieldTarget) {
        var text = document.getElementById(fieldTarget).innerText;
        var elem = document.createElement("textarea");
        document.body.appendChild(elem);
        elem.value = text;
        elem.select();
        document.execCommand("copy");
        document.body.removeChild(elem);
    
        helpers.copyToast();
      },
    
      copyToast: function() {
        const toast = document.getElementById("copy-toast");
        gsap.to(toast, {
          opacity: 1,
          duration: 0.5,
          translateY: "-15",
          yoyo: true,
          repeat: 1,
          repeatDelay: 1,
        });
      },

};


export default helpers;