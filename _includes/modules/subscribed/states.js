States = () => {
  "use strict";

  /* <!-- MODULE: Provides an interface to provide common state functionality --> */
  /* <!-- PARAMETERS: Receives the global app context --> */
  /* <!-- REQUIRES: Global Scope: JQuery, Underscore | App Scope: Display --> */

  /* <!-- Internal Constants --> */
  const STATE_OVERVIEW = "overview",
        STATE_SUBSCRIBED = "subscribed",
        STATES = [STATE_OVERVIEW, STATE_SUBSCRIBED];
  /* <!-- Internal Constants --> */

  /* <!-- Internal Options --> */
  
  /* <!-- Internal Options --> */

  /* <!-- Internal Variables --> */
  /* <!-- Internal Variables --> */

  /* <!-- Internal Functions --> */
  /* <!-- Internal Functions --> */

  /* <!-- Initial Calls --> */

  /* <!-- External Visibility --> */
  return {

    all : STATES,
    
    overview : {
      in : STATE_OVERVIEW,
    },
    
    subscribed: {
      in : STATE_SUBSCRIBED,
    },
    
    views : [
      STATE_OVERVIEW,
    ],
    
  };
  /* <!-- External Visibility --> */

};