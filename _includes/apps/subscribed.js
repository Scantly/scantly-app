App = function() {
	"use strict";

	/* <!-- DEPENDS on JQUERY to work, but not to initialise --> */

	/* <!-- Returns an instance of this if required --> */
	if (this && this._isF && this._isF(this.App)) return new this.App().initialise(this);

	/* <!-- Internal Constants --> */
  const FN = {},
        DEFAULT_ROUTE = "subscriptions";
	/* <!-- Internal Constants --> */

	/* <!-- Internal Variables --> */
	var ಠ_ಠ, /* <!-- Context --> */
      ರ‿ರ = {}, /* <!-- Session State --> */
      ಱ = {}; /* <!-- Persistant State --> */
	/* <!-- Internal Variables --> */

	/* <!-- Internal Functions --> */
  FN.subscriptions = id => Promise.all([
      FN.client.user().then(user => FN.subscribe.subscriptions(user, id)),
      ಠ_ಠ.Google.files.search(ಠ_ಠ.Google.files.natives()[1], FN.create.query(), true),
      FN.create.latest()
    ])
      .then(results => {
   
        var subscriptions = results[0],
            files = results[1],
            version = results[2];
    
        ಠ_ಠ.Flags.log("Subscriptions:", subscriptions);
        ಠ_ಠ.Flags.log("Files:", files);
        ಠ_ಠ.Flags.log("Version:", version);
    
        if (subscriptions && _.isArray(subscriptions)) {
          subscriptions.length === 1 ? ಱ.subscription = subscriptions[0] : ಱ.subscriptions = subscriptions;
          ಠ_ಠ.Display.template.show({
            template: "subscribed",
            id: "subscriptions",
            instructions: ಠ_ಠ.Display.doc.get(id && ಱ.subscription && !ಱ.subscription.file ? "INSTRUCTIONS" : "MANAGE"),
            table: ಠ_ಠ.Display.template.get({
              template: "subscriptions",
              subscriptions: _.map(subscriptions, subscription => {
                
                subscription.expires = subscription.expires ? new Date(subscription.expires) : "";
                subscription.file = _.find(files, FN.create.filter(subscription.id));
                
                subscription.version = subscription.file ? FN.create.version.get(subscription.file) : null;
                if (subscription.version) subscription.version_details = ಠ_ಠ.Display.doc.get("VERSION_CLIENT", subscription.version);
                subscription.latest = version.version;
                
                subscription.upgradable = subscription.file && subscription.version != subscription.latest ?
                  `upgrade.${subscription.file.id}` : null;
                subscription.details = subscription.upgradable ? 
                  ಠ_ಠ.Display.doc.get({
                    name: "UPGRADE_CLIENT",
                    data: {
                      name: subscription.file.name,
                      version: subscription.version,
                      latest: subscription.latest
                    }
                  }) : null;
                
                subscription.create_details = ಠ_ಠ.Display.doc.get("CREATE_CLIENT");
                subscription.help_details = ಠ_ಠ.Display.doc.get("HELP_CLIENT");
                subscription.cancel_details = ಠ_ಠ.Display.doc.get("CANCEL_CLIENT");
                
                return subscription;
              }),
            }),
            target: ಠ_ಠ.container,
          });
        }
    
      })
      .then(() => ಠ_ಠ.Display.state().enter(FN.states.subscribed.in))
      .catch(e => ಠ_ಠ.Flags.error("Subscriptions Service Error:", e))
      .then(ಠ_ಠ.Main.busy("Fetching Details"));                
	/* <!-- Internal Functions --> */
  
  /* <!-- Setup Functions --> */
  FN.setup = {

    /* <!-- Setup required for everything, almost NOTHING is loaded at this point (e.g. ಠ_ಠ.Flags) --> */
    now: () => {

      /* <!-- Set Up / Create the State and Background Module --> */
      FN.states = ಠ_ಠ.States();
      
      FN.backgrounds = ಠ_ಠ.Backgrounds();

    },

    /* <!-- Start App after fully loaded (but BEFORE routing or authentication) --> */
    initial: () => {
      
      /* <!-- Set Random Background --> */
      FN.backgrounds.set();
      
      /* <!-- Setup Helpers --> */
      _.each([{
        name: "Strings"
      }], helper => ಱ[helper.name.toLowerCase()] = ಠ_ಠ[helper.name](helper.options || null, ಠ_ಠ));

      /* <!-- Setup Function Modules --> */
      var _options = {
        functions: FN,
        state: {
          session: ರ‿ರ,
          application: ಱ
        }
      };
      
      _.each(["Client", "Subscribe", "Create"], module => FN[module.toLowerCase()] = ಠ_ಠ[module](_options, ಠ_ಠ));

      /* <!-- Get Window Title --> */
      ಱ.title = window.document.title;
      
    },

    /* <!-- App is ready for action - e.g. is authenticated but no initial routing done! --> */
    session: () => null,

    /* <!-- App is authenticated and routed! --> */
    routed: () => {

      /* <!-- Sets the currently focussed date | Done here as this is called when app restarts etc. --> */
      /* <!-- Overidden when a file is loaded --> */
      ರ‿ರ.current = ಠ_ಠ.Dates.now().startOf("day");
      
      /* <!-- Set the Initial State --> */
      ಠ_ಠ.Display.state().change(FN.states.views, FN.states.overview.in);
      
      /* <!-- Bind Escape --> */
      if (window.Mousetrap) {
        window.Mousetrap.unbind("esc");
        window.Mousetrap.bind("esc", () => $(".collapse.show").removeClass("show"));
      }
      
      /* <!-- Show Subscriptions --> */
      if (ಱ.id) {
        
        /* <!-- Show Subscription with supplied ID --> */
        FN.subscriptions(ಱ.id);
        
      } else if (!ಠ_ಠ.Flags.initial()) {
        
        /* <!-- Default Route used in case we arrived here directly (instead of from another page) --> */
        if (ಠ_ಠ.Flags.cleared() && !ಠ_ಠ.Display.state().in(FN.states.working)) window.location.hash = `#${DEFAULT_ROUTE}`;
        
      }
      
    },

  };
  /* <!-- Setup Functions --> */

	/* <!-- External Visibility --> */
	return {

		/* <!-- External Functions --> */
		initialise: function(container) {

			/* <!-- Get a reference to the Container --> */
			ಠ_ಠ = container;

			/* <!-- Set Container Reference to this --> */
			container.App = this;
			
      /* <!-- Initial Setup Call --> */
      FN.setup.now();
      
			/* <!-- Set Up the Default Router --> */
      this.route = ಠ_ಠ.Router.create({
        name: "Subscribed",
        state: ರ‿ರ,
        states: FN.states.all,
        start: FN.setup.routed,
        public: "PUBLIC",
        routes: {
          
          subscription: {
            matches: /ID/i,
            length: 1,
            scopes: [
              "https://www.googleapis.com/auth/drive.file"
            ],
            trigger : FN.states.working,
            fn: id => ಠ_ಠ.me ? FN.subscriptions(id) : ಱ.id = id,
          },
          
          subscriptions: {
            matches: /SUBSCRIPTIONS/i,
            length: 0,
            scopes: [
              "https://www.googleapis.com/auth/drive.file"
            ],
            trigger : FN.states.working,
            fn: () => FN.subscriptions(),
          },
         
          create: {
            matches: /CREATE/i,
            state: FN.states.subscribed.in,
            scopes: [
              "https://www.googleapis.com/auth/script.projects",
              "https://www.googleapis.com/auth/script.deployments",
            ],
            length: 1,
            tidy: true,
            fn: code => ಱ.subscription && code == ಱ.subscription.code ?
                          FN.create.log(`${ಱ.subscription.organisation} | Log`, ಱ.subscription.id)
                            .then(id => ಠ_ಠ.Google.scripts.create(`${ಱ.subscription.organisation} | Log | Script`, ಱ.spreadsheet = id))
                            .then(script => {
                              ಠ_ಠ.Google.files.update(ಱ.spreadsheet, FN.create.script_id.set(script.scriptId || script));
                              return script;
                            })
                            .then(script => FN.create.script(script, ಱ.subscription.public))
                            .then(script => FN.create.app(script))
                            .then(url => {
                              ಠ_ಠ.Flags.log("Created Endpoint URL:", url);
                              var _url = url.split("/"),
                                  _endpoint = _url[_url.length - 2];
                              ಠ_ಠ.Flags.log("Endpoint:", _endpoint);
                              var _actions = $(`[data-code='${code}'] [data-action='create']`)
                                .css("cursor", "none")
                                .css("pointer-events", "none")
                                .removeClass("badge-dark")
                                .addClass("badge-success o-50")
                                .append($("<span />", {
                                  class: "md-24 md-light material-icons",
                                  text: "check_circle"
                                })).parent("div");
                              ಠ_ಠ.Display.template.show({
                                template: "link",
                                id: ಱ.spreadsheet,
                                target: _actions,
                              });
                              
                              /* <!-- Update Service with Endpoint --> */
                              return FN.client.user()
                                .then(user => FN.subscribe.endpoint(user, ಱ.subscription.id, ಱ.subscription.code, _endpoint));
                              
                            })
                            .catch(e => ಠ_ಠ.Flags.error("Logging Sheet Creation Error:", e))
                            .then(ಠ_ಠ.Main.busy("Creating Sheet and Script")) : Promise.resolve(false)
          },
          
          upgrade: {
            matches: /UPGRADE/i,
            state: FN.states.subscribed.in,
            scopes: [
              "https://www.googleapis.com/auth/script.projects",
              "https://www.googleapis.com/auth/script.deployments",
            ],
            length: 1,
            tidy: true,
            fn: id => {
              var _subscription = ಱ.subscriptions ?
                  _.find(ಱ.subscriptions, 
                          subscription => subscription.id == id || (subscription.file && subscription.file.id == id)) : ಱ.subscription;
              return _subscription ? FN.create.script(FN.create.script_id.get(_subscription.file), _subscription.public)
                .then(script => Promise.all([ಠ_ಠ.Google.scripts.versions(script).list(), script]))
                .then(results => {
                  var _version = _.chain(results[0]).sortBy("versionNumber").last().value();
                  return [results[1], _version ? _version.versionNumber + 1 : 1];
                })
                .then(results => FN.create.app(results[0], results[1], _subscription.endpoint))
                .then(result => result ? ಠ_ಠ.Google.files.update(_subscription.file.id, FN.create.version.set()) : result)
                .then(result => result ? $(`[data-action='upgrade'][data-id='${_subscription.file.id}']`).remove() : result)
                .catch(e => ಠ_ಠ.Flags.error("Logging Sheet Update Error:", e))
                .then(ಠ_ಠ.Main.busy("Updating Script")) : false;
            }
          },
          
        },
        route: () => false, /* <!-- PARAMETERS: handled, command --> */
      });

			/* <!-- Return for Chaining --> */
			return this;

		},
    
    /* <!-- Setup Methods --> */
    start: FN.setup.initial,

    ready: FN.setup.session,

    /* <!-- Present Internal Modules / Functions (for debugging etc) --> */
    fn: FN,
    
    /* <!-- Present Internal State (for debugging etc) --> */
    state: ರ‿ರ,
    
    /* <!-- Present Persistent State (for debugging etc) --> */
    persistent: ಱ,
    
	};

};