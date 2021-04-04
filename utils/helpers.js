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

      scrolling: function(e, destination) {
        e.preventDefault();
        gsap.to(window, { scrollTo: destination });
    
        let destinationElement = document.getElementById(
          destination.replace("#", "")
        );
    
        destinationElement.setAttribute("tabIndex", "0");
        destinationElement.focus();

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