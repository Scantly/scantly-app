Main = function() {
	
	/* <!-- Returns an instance of this if required --> */
  if (this && this._isF && this._isF(this.Main)) {return new this.Main().initialise(this);}
	
	/* <!-- Internal Variables --> */
	var ಠ_ಠ;
  /* <!-- Internal Variables --> */
	
	/* <!-- Internal Functions --> */
	
	/* <!-- Internal Functions --> */
	
	/* <!-- External Visibility --> */
  return {

    /* <!-- External Functions --> */
    initialise : function(container) {
			
			/* <!-- Get Reference to Container --> */
			ಠ_ಠ = container;
			
			/* <!-- Initialise Objects --> */
			if (ಠ_ಠ.Page) ಠ_ಠ.Page();
			
			/* <!-- Set Container Reference to this --> */
			ಠ_ಠ.Main = this;
			
			/* <!-- Return for Chaining --> */
			return this;
			
    },
		
		start : function() {
			
						/* <!-- Get Global Flags --> */
			ಠ_ಠ.Flags.initialise().then(function(flags) {

				ಠ_ಠ.Flags = flags;
        
        /* <!-- Set Random Background --> */
        ಠ_ಠ.Backgrounds().set();
        
        /* <!-- Material Button Waves --> */	
        if (window.Waves) {
          Waves.attach(".btn");
          Waves.init();
        }
				
			});
		},
   /* <!-- External Functions --> */
    
	};
  /* <!-- External Visibility --> */
};