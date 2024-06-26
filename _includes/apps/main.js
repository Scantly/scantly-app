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
  FN.state = (from, to, title) => () => {
    ಠ_ಠ.Display.tidy();
    ಠ_ಠ.Display.state().change(from, to);
    window.document.title = title ? `${title} | ${ಱ.title}` : ಱ.title;
  };
  
  FN.view = {
    
    codes: () => FN.client.endpoints().then(FN.code.cards).then(ಠ_ಠ.Main.busy("Fetching Codes")),
    
    reader: location => FN.reader.read(location),
    
    manage: () => FN.client.locations().then(FN.code.locations).then(ಠ_ಠ.Main.busy("Fetching Details")),
    
  };
	/* <!-- Internal Functions --> */
  
  /* <!-- Setup Functions --> */
  FN.setup = {

    /* <!-- Setup required for everything, almost NOTHING is loaded at this point (e.g. ಠ_ಠ.Flags) --> */
    now: () => {

      /* <!-- Set Up / Create the States Module --> */
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
      _.each(["Reader", "Client", "Code"], module => FN[module.toLowerCase()] = ಠ_ಠ[module](_options, ಠ_ಠ));

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
      document.body.classList.remove("overflow-hidden");
      
      /* <!-- Bind Escape --> */
      if (window.Mousetrap) {
        window.Mousetrap.unbind("esc");
        window.Mousetrap.bind("esc", () => $(".collapse.show").removeClass("show"));
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
        name: "Main",
        state: ರ‿ರ,
        states: FN.states.all,
        start: FN.setup.routed,
        routes: {
          
          codes: {
            matches: /CODES/i,
            state: "authenticated",
            length: 0,
            requires: ["filesaver"],
            keys: ["ctrl+alt+a", "ctrl+alt+A"],
            fn: () => FN.view.codes()
                        .then(FN.state(FN.states.views, FN.states.codes.in, "Codes"))
                        .then(() => document.body.classList.remove("overflow-hidden"))
          },
          
          manage: {
            matches: /MANAGE/i,
            state: "authenticated",
            length: 0,
            keys: ["ctrl+alt+m", "ctrl+alt+M"],
            requires: ["clipboard"],
            fn: () => FN.view.manage()
                        .then(FN.state(FN.states.views, FN.states.manage.in, "Manage"))
                        .then(() => document.body.classList.remove("overflow-hidden")),
            routes : {
              create: {
                matches: /CREATE/i,
                length: 0,
                scopes: [
                  "https://www.googleapis.com/auth/script.projects",
                ],
                permissive: true,
                fn: () => true
              }
            }
          },
          
          overview: {
            matches: /OVERVIEW/i,
            length: 0,
            keys: ["ctrl+alt+o", "ctrl+alt+O", "ctrl+alt+h", "ctrl+alt+H"],
            fn: () => ಠ_ಠ.Display.state().in(FN.states.overview.in) ? true :
              ಠ_ಠ.Display.state().in(FN.states.views, true) ? 
                (ಠ_ಠ.Router.clean(), this.route(ಠ_ಠ.Display.state().in("authenticated"))) : null
          },
          
          reader: {
            matches: /READER/i,
            length: {
              min: 0,
              max: 2
            },
            requires: ["jsqr", "fetchjsonp", "ion-sound"],
            keys: ["ctrl+alt+r", "ctrl+alt+R", "ctrl+alt+g", "ctrl+alt+G"],
            fn: command => FN.view.reader(command)
                              .then(FN.state(FN.states.views, FN.states.reader.in, "Reader"))
                              .then(() => document.body.classList.add("overflow-hidden"))
          },
          
          swap: {
            matches: /SWAP/i,
            length: {
              min: 0,
              max: 1,
            },
            fn: command => FN.reader.swap(command)
          },
          
          test: {
            matches: /TEST/i,
            length: {
              min: 0,
              max: 1,
            },
            requires: "fetchjsonp",
            fn: command => FN.client.test(command)
          }
          
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