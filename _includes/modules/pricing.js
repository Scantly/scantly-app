Page = function() {
	"use strict";

	/* <!-- Returns an instance of this if required --> */
	if (this && this._isF && this._isF(this.Page)) return new this.Page().initialise(this);

	/* <!-- Internal Constants --> */
  const email = /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/gi;
	/* <!-- Internal Constants --> */

	/* <!-- Internal Variables --> */
	var ಠ_ಠ;
	/* <!-- Internal Variables --> */

  /* <!-- Internal Functions --> */
  var _isEmail = value => value && value.match(email);
  /* <!-- Internal Functions --> */
  
	/* <!-- External Visibility --> */
	return {

		initialise: function(container) {

			/* <!-- Get a reference to the Container --> */
			ಠ_ಠ = container;

			/* <!-- Set Container Reference to this --> */
			container.Page = this;

			/* <!-- Return for Chaining --> */
			return this;

		},

		start: function() {

			$("a[data-tier]").on("click.tier", e => {
				e.preventDefault();
				var _$ = $(e.target);
				return ಠ_ಠ.Display.modal("subscribe", {
					title: `${_$.data("tier")} Subscription`,
					message: ಠ_ಠ.Display.doc.get({
						name: "SUBSCRIBE",
					}),
          client: _$.data("tier-client"),
					product: _$.data("tier-product"),
          cost: _$.data("tier-cost"),
          unit: _$.data("tier-unit"),
					data: _$.data("tier-data"),
					details: _$.data("tier-details"),
          email: true,
          validate: values => values && 
            _.find(values, value => value.name == "domain" && value.value) &&
            _.find(values, value => value.name == "email" && _isEmail(value.value)),
				}, dialog => {
          var _email = dialog.find("#email_input"),
              _domain = dialog.find("#domain_input");
          _email.on("change.email", e => {
            var _value = $(e.target).val();
            if (_value && _isEmail(_value) && !_domain.val()) _domain.val(_value.split("@")[1]);
          });
        }).then(values => {
          if (values) {
            var _client = _.find(values, value => value.name == "client"),
                _product = _.find(values, value => value.name == "product"),
                _email = _.find(values, value => value.name == "email"),
                _domain = _.find(values, value => value.name == "domain");
            if (_client && _product)
              ಠ_ಠ.Subscribe(ಠ_ಠ).subscribe(_client.value, _product.value, _email.value,_domain.value);
          }
        });
			});

		},
		/* <!-- External Functions --> */

	};
	/* <!-- External Visibility --> */
};