Code = (options, factory) => {
  "use strict";

  /* <!-- MODULE: Provides an interface to provide common functionality --> */
  /* <!-- PARAMETERS: Receives the global app context --> */
  /* <!-- REQUIRES: Global Scope: JQuery, Underscore | App Scope: Display --> */

  /* <!-- Internal Constants --> */
  const DEFAULTS = {
    id: "cards",
    qr_url: "https://zxing.org/w/chart",
    qr_encoding: "ISO-8859-1",
    qr_size: 540,
    qr_tolerance: "M", /* <!-- L = up to 7% data loss | M 15% | Q 25% | H 30%--> */
    qr_margin: 6, /* |${options.qr_margin} */
  }, FN = {};
  /* <!-- Internal Constants --> */

  /* <!-- Internal Options --> */
  options = _.defaults(options ? _.clone(options) : {}, DEFAULTS);
  /* <!-- Internal Options --> */
  
  /* <!-- Internal Variables --> */
  var s = factory.Strings();
  /* <!-- Internal Functions --> */
  
  /* <!-- Internal Functions --> */
  var _qr = link => `${options.qr_url}?cht=qr&chs=${options.qr_size}x${options.qr_size}&choe=${options.qr_encoding}&chld=${options.qr_tolerance}&chl=${encodeURIComponent(link)}`;
  
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
    
    if (!endpoints || !endpoints.endpoints) return null;
    var _cards;
    
    if (endpoints.endpoints.length === 0) {
      
      /* <!-- Demo Mode --> */
      _cards = [
        _card(0, "DEMO", `DEMO|${s.base64.encode(endpoints.user)}|${endpoints.user}`, "Demo Sign-In Card"),
      ];
    
    } else {
      
      /* <!-- Show Cards --> */
      _cards = _.map(endpoints.endpoints, 
        (endpoint, i) => _card(i, endpoint.name, `USR|${endpoint.id}|${endpoint.user}|${endpoint.key}`,
                              endpoint.until ? `Valid until ${endpoint.until}`: ""));
    
    }
    
    /* <!-- Output Cards --> */
    var _output = factory.Display.template.show({
          template: "cards",
          instructions: factory.Display.doc.get("CARDS", null, true),
          id: options.id,
          cards: _cards,
          target: factory.container,
          clear: true,
        });
    
    _output.find("a[data-fullscreen], button[data-fullscreen]").on("click.on_fullscreen", e => {
      factory.Display.tidy();
      var _target = document.getElementById(e.target.dataset.fullscreen);
      if (_target && window.screenfull) screenfull.request(_target)
          .then(() =>$(_target).off("click.off_fullscreen").on("click.off_fullscreen", () => screenfull.exit()
                                                     .then(() => $(_target).off("click.off_fullscreen"))
                                                     .catch(e => factory.Flags.error("Fullscreen Error", e))))
          .catch(e => factory.Flags.error("Fullscreen Error", e))
    });
    
    return Promise.resolve(_output);
        
  };
  
  FN.locations = locations => {
    
    if (!locations || !locations.locations) return null;
    var _cards = _.map(locations.locations, 
      (location, i) => _card(i, location.location, `LOC|${s.base64.encode(location.value)}|${location.key}`, 
           `Valid until ${location.until}`, _link(true, "reader", `${s.base64.encode(location.value)}.${location.key}`),
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