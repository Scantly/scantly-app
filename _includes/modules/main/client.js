Client = (options, factory) => {
  "use strict";

  /* <!-- MODULE: Provides an interface to provide common functionality --> */
  /* <!-- PARAMETERS: Receives the global app context --> */
  /* <!-- REQUIRES: Global Scope: JQuery, Underscore | App Scope: Display --> */

  /* <!-- Internal Constants --> */
  const DEFAULTS = {
    url: key => `https://script.google.com/macros/s/${key}/exec`,
    directory: "M8R5kX4vyL4ykS2cyq_Gl0FUssP2KT1jI"
  }, FN = {};
  /* <!-- Internal Constants --> */

  /* <!-- Internal Options --> */
  options = _.defaults(options ? _.clone(options) : {}, DEFAULTS);
  /* <!-- Internal Options --> */
  
  /* <!-- Internal Variables --> */
  var s = factory.Strings();
  /* <!-- Internal Functions --> */
  
  /* <!-- Public Functions --> */
  FN.log = (endpoint, user, key, location) => fetchJsonp(`${options.url(endpoint)}?u=${s.base64.encode(user)}&k=${key}&l=${s.base64.encode(location || "")}`)
    .then(response => response.json())
    .then(value => (factory.Flags.log(`Web API Result: ${JSON.stringify(value)}`, value), value));
  
  FN.endpoints = () => factory.Google.execute(options.directory, "list")
    .then(value => (value && value.done ? 
          value.response.error ? factory.Flags.error("Directory Error", value = value.response.error) :
          value.response.result ? factory.Flags.log("API Response", value = value.response.result) : null : null, value));
  /* <!-- Public Functions --> */
  
  return FN;
  
};