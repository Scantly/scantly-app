App = function() {
	"use strict";

	/* <!-- DEPENDS on JQUERY to work, but not to initialise --> */

	/* <!-- Returns an instance of this if required --> */
	if (this && this._isF && this._isF(this.App)) return new this.App().initialise(this);

	/* <!-- Internal Constants --> */
  const FN = {};
	/* <!-- Internal Constants --> */

	/* <!-- Internal Variables --> */
	var ಠ_ಠ, /* <!-- Context --> */
      ರ‿ರ = {}, /* <!-- Session State --> */
      ಱ = {}; /* <!-- Persistant State --> */
	/* <!-- Internal Variables --> */

	/* <!-- Internal Functions --> */
  FN.subscriptions = id => FN.client.user()
                  .then(user => FN.subscribe.subscriptions(user, id))
                  .then(subscriptions => {
                    ಠ_ಠ.Flags.log("Subscriptions:", subscriptions);
                    if (subscriptions && _.isArray(subscriptions)) {
                      
                      if (subscriptions.length === 1) ಱ.subscription = subscriptions[0];
                      
                      ಠ_ಠ.Display.template.show({
                        template: "subscribed",
                        id: "subscriptions",
                        instructions: ಠ_ಠ.Display.doc.get("INSTRUCTIONS"),
                        table: ಠ_ಠ.Display.template.get({
                          template: "subscriptions",
                          subscriptions: _.map(subscriptions, subscription => {
                            subscription.expires = subscription.expires ? new Date(subscription.expires) : "";
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
      if (ಱ.id) FN.subscriptions(ಱ.id);
      
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
            fn: id => ಠ_ಠ.me ? FN.subscriptions(id) : ಱ.id = id,
          },
         
          create: {
            matches: /CREATE/i,
            state: "subscribed",
            scopes: [
              "https://www.googleapis.com/auth/drive.file",
              "https://www.googleapis.com/auth/script.projects",
              "https://www.googleapis.com/auth/script.deployments",
            ],
            length: 1,
            fn: code => ಱ.subscription && code == ಱ.subscription.code ?
                          FN.create.sheet(`${ಱ.subscription.organisation} | Log`)
                            .then(id => ಠ_ಠ.Google.scripts.create(`${ಱ.subscription.organisation} | Log | Script`, ಱ.spreadsheet = id))
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
                              
                            })
                            .catch(e => ಠ_ಠ.Flags.error("Logging Sheet Creation Error:", e))
                            .then(ಠ_ಠ.Main.busy("Creating Sheet and Script")) : Promise.resolve(false)
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