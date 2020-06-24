Backgrounds = () => {
  "use strict";

  /* <!-- HELPER: Provides colour helper methods --> */
  /* <!-- PARAMETERS: Options (see below) and factory (to generate other helper objects) --> */
  /* <!-- @options.default: Default Colour ([R,G,B] Array, CSS Colour String or Name) [Optional] --> */

  /* <!-- Internal Constants --> */
  const DEFAULTS = {
      image: "data:image/webp;base64,UklGRiQAAABXRUJQVlA4IBgAAAAwAQCdASoBAAEAAwA0JaQAA3AA/vuUAAA=",
      min: "--background-min",
      max: "--background-max",
   };
  /* <!-- Internal Constants --> */

  /* <!-- Internal Functions --> */
  
  /* <!-- Detect WebP Support --> */
  var detect = () => new Promise(resolve => {
    var image = new Image();
    image.onerror = () => resolve(false);
    image.onload = () => resolve(image.width === 1);
    image.src = DEFAULTS.image;
  }).catch(() => false);
  
  /* <!-- Set Random Background --> */
  var background = prefix => document.body.classList.add(`${prefix}background-${Math.randomInteger(
        parseInt(getComputedStyle(document.documentElement).getPropertyValue(DEFAULTS.min), 10),        
        parseInt(getComputedStyle(document.documentElement).getPropertyValue(DEFAULTS.max), 10)) || 1}`);  
  
  /* <!-- Internal Functions --> */
  
  /* <!-- Internal Variables --> */
  var webp = detect();
  /* <!-- Internal Variables --> */

  /* <!-- External Visibility --> */
  return {

    /* <!-- External Functions --> */
    set: () => webp.then(supported => background(supported ? "webp-" : "")),
    /* <!-- External Functions --> */

  };
  /* <!-- External Visibility --> */
};