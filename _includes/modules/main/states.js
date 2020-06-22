States = () => {
  "use strict";

  /* <!-- MODULE: Provides an interface to provide common state functionality --> */
  /* <!-- PARAMETERS: Receives the global app context --> */
  /* <!-- REQUIRES: Global Scope: JQuery, Underscore | App Scope: Display --> */

  /* <!-- Internal Constants --> */
  const STATE_OVERVIEW = "overview",
        STATE_APP = "app",
        STATE_READER = "reader",
        STATE_MANAGE = "manage",
        STATES = [
                  STATE_OVERVIEW, STATE_APP, STATE_READER, STATE_MANAGE,
          ];
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
    
    app: {
      in : STATE_APP,
    },
    
    reader : {
      in : STATE_READER,
    },
    
    manage : {
      in : STATE_MANAGE,
    },
    
    views : [
      STATE_OVERVIEW,
      STATE_APP,
      STATE_READER,
      STATE_MANAGE,
    ],
    
  };
  /* <!-- External Visibility --> */

};