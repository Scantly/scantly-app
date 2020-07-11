States = () => {
  "use strict";

  /* <!-- MODULE: Provides an interface to provide common state functionality --> */
  /* <!-- PARAMETERS: Receives the global app context --> */
  /* <!-- REQUIRES: Global Scope: JQuery, Underscore | App Scope: Display --> */

  /* <!-- Internal Constants --> */
  const STATE_OVERVIEW = "overview",
        STATE_CODES = "codes",
        STATE_READER = "reader",
        STATE_MANAGE = "manage",
        STATES = [STATE_OVERVIEW, STATE_CODES, STATE_READER, STATE_MANAGE];
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
    
    codes: {
      in : STATE_CODES,
    },
    
    reader : {
      in : STATE_READER,
    },
    
    manage : {
      in : STATE_MANAGE,
    },
    
    views : [
      STATE_OVERVIEW,
      STATE_CODES,
      STATE_READER,
      STATE_MANAGE,
    ],
    
  };
  /* <!-- External Visibility --> */

};