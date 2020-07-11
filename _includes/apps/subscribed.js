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
      _.each([], module => FN[module.toLowerCase()] = ಠ_ಠ[module](_options, ಠ_ಠ));

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
            matches: /TEST/i,
            state: "authenticated",
            length: 0,
            fn: () => ಠ_ಠ.Google.sheets.create("SCANTLY TEST SHEET")
              .then(sheet => ಠ_ಠ.Google.scripts.create("SCANTLY TEST SCRIPT", sheet.spreadsheetId))
              .then(script => ಠ_ಠ.Google.scripts.content(script).update([{
                  "name": "Code",
                  "type": "SERVER_JS",
                  "source": "function doGet(e) {\n  return ContentService.createTextOutput(\"TEST\");\n}",
                  "functionSet": {
                    "values": [
                      {
                        "name": "doGet"
                      }
                    ]
                  }
                },
                {
                "name": "appsscript",
                "type": "JSON",
                "source": "{\n  \"timeZone\": \"Europe/London\",\n  \"dependencies\": {\n    \"libraries\": [{\n      \"userSymbol\": \"JSRSASIGN\",\n      \"libraryId\": \"1Q69EWHz30dKAVH2aTFL3Yj4oD-2QRvrOwSDs2xUf0NFCvZxSavurfrR-\",\n      \"version\": \"3\"\n    }]\n  },\n  \"webapp\": {\n    \"access\": \"ANYONE_ANONYMOUS\",\n    \"executeAs\": \"USER_DEPLOYING\"\n  },\n  \"exceptionLogging\": \"STACKDRIVER\",\n  \"runtimeVersion\": \"V8\"\n}",
                "functionSet": {}
              }]))
              .then(script => ಠ_ಠ.Google.scripts.versions(script).create(1, "TEST"))
              .then(script => ಠ_ಠ.Google.scripts.deployments(script).create(1))
              .then(script => script.entryPoints[0].webApp.url)
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