Code = (options, factory) => {
  "use strict";

  /* <!-- MODULE: Provides an interface to provide common functionality --> */
  /* <!-- PARAMETERS: Receives the global app context --> */
  /* <!-- REQUIRES: Global Scope: JQuery, Underscore | App Scope: Display --> */

  /* <!-- Internal Constants --> */
  const DEFAULTS = {
    id: "cards",
    qr_url: "https://chart.googleapis.com/chart",
    qr_encoding: "ISO-8859-1",
    qr_size: 540,
    qr_tolerance: "Q", /* <!-- L = up to 7% data loss | M 15% | Q 25% | H 30%--> */
    qr_margin: 6,
  }, FN = {};
  /* <!-- Internal Constants --> */

  /* <!-- Internal Options --> */
  options = _.defaults(options ? _.clone(options) : {}, DEFAULTS);
  /* <!-- Internal Options --> */
  
  /* <!-- Internal Functions --> */
  var _qr = link => `${options.qr_url}?cht=qr&chs=${options.qr_size}x${options.qr_size}&choe=${options.qr_encoding}&chld=${options.qr_tolerance}|${options.qr_margin}&chl=${encodeURIComponent(link)}`;
  /* <!-- Internal Functions --> */
  
  /* <!-- Public Functions --> */
  FN.cards = endpoints => {
    if (!endpoints || !endpoints.endpoints) return;
    var _cards;
    
    if (endpoints.length === 0) {
      /* <!-- Demo Mode --> */
      _cards = [];
    } else {
      /* <!-- Show Cards --> */
      _cards = _.map(endpoints.endpoints, (endpoint, index) => ({
          id: `${options.id}_${index}`,
          name: endpoint.name,
          qr: _qr(`USR|${endpoint.id}|${endpoints.user}|${endpoints.key}`),
          width: options.qr_size + 2,
        }));
    }
    
    /* <!-- Output Cards --> */
    return Promise.resolve(factory.Display.template.show({
          template: "cards",
          id: options.id,
          cards: _cards,
          target: factory.container,
          clear: true,
        }));
    
  };
  /* <!-- Public Functions --> */
  
  return FN;
  
};