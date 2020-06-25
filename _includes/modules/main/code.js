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
  
  var _link = (persistent, route, value) => factory.Flags.full(`${persistent ? "?i=" : "#"}${route}.${value}`);
  
  var _card = (index, name, value, notes, link, icon, title) => ({
          id: `${options.id}_${index}`,
          name: name,
          qr: _qr(value),
          width: {
            min: (options.qr_size / 2) + 2,
            max: options.qr_size + 2
          },
          icon: icon || null,
          icon_title: title || null,
          link: link || null,
          notes: notes || null
        });
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
      _cards = _.map(endpoints.endpoints, 
        (endpoint, i) => _card(i, endpoint.name, `USR|${endpoint.id}|${endpoints.user}|${endpoints.key}`));
    
    }
    
    /* <!-- Output Cards --> */
    return Promise.resolve(factory.Display.template.show({
          template: "cards",
          instructions: factory.Display.doc.get("CARDS", null, true),
          id: options.id,
          cards: _cards,
          target: factory.container,
          clear: true,
        }));
    
  };
  
  FN.locations = locations => {
    
    if (!locations || !locations.locations) return;
    var _cards = _.map(locations.locations, 
      (location, i) => _card(i, location.location, `LOC|${location.value}|${location.key}`, 
                             `Valid until ${location.until}`, _link(true, "reader", `${location.value}.${location.key}`),
                             "verified_user", "Verified Reader Location"));
    
    /* <!-- Output Cards --> */
    var _output = factory.Display.template.show({
          template: "cards",
          instructions: _cards.length === 0 ? "" : factory.Display.doc.get("MANAGE", null, true),
          id: options.id,
          cards: _cards,
          target: factory.container,
          clear: true,
        });
    
    new window.ClipboardJS(`#${options.id} a.link`);
    
    return Promise.resolve(_output);
    
  };
  /* <!-- Public Functions --> */
  
  return FN;
  
};