Subscribe = factory => {
  "use strict";

  /* <!-- MODULE: Provides an interface to provide common functionality --> */
  /* <!-- PARAMETERS: Receives the global app context --> */
  /* <!-- REQUIRES: Global Scope: JQuery, Underscore | App Scope: Display --> */
  
  /* <!-- Public Variables --> */
  var FN = {};
  /* <!-- Public Variables --> */
  
  /* <!-- Public Functions --> */
  FN.subscribe = (client, price, email, domain) => {
    factory.Flags.log("Creating Subscription for:", domain);
    var stripe = Stripe(client);
    stripe.redirectToCheckout({
      lineItems: [{price: price, quantity: 1}],
      mode: "subscription",
      successUrl: factory.Flags.full("subscribed"),
      cancelUrl: factory.Flags.full("pricing"),
      customerEmail: email,
      clientReferenceId: "TESTING",
    })
    .then(result => {
      factory.Flags.log("Stripe Result:", result);
      if (result.error) factory.Flags.error("Stripe Error:", result.error);
    });

  };
  /* <!-- Public Functions --> */
  
  return FN;
  
};