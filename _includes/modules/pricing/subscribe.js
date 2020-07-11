Subscribe = factory => {
  "use strict";

  /* <!-- MODULE: Provides an interface to provide common functionality --> */
  /* <!-- PARAMETERS: Receives the global app context --> */
  /* <!-- REQUIRES: Global Scope: JQuery, Underscore | App Scope: Display --> */
  
  /* <!-- Public Constants --> */
  const DEFAULTS = {
    url: key => `https://script.google.com/macros/s/${key}/exec`,
    endpoint: "AKfycbx6KtNh11n7NRU3UWcsv4xwxGYHvL-pl8Tzr4mEMKp1JQ3Wxluz"
  }, FN = {};
  /* <!-- Public Constants --> */
  
  /* <!-- Internal Variables --> */
  var s = factory.Strings(), e = s.base64.encode;
  /* <!-- Internal Functions --> */
  
  /* <!-- Public Functions --> */
  FN.subscribe = (tier, client, price, email, organisation, domain) => {
    factory.Flags.log("Creating Subscription for:", domain);
    var customer = uuidv4();
    fetchJsonp(`${DEFAULTS.url(DEFAULTS.endpoint)}?i=${e(customer)}&t=${e(tier)}&p=${e(price)}&e=${e(email)}&o=${e(organisation)}&d=${e(domain)}`)
    .then(response => response.json())
    .then(value => {
      factory.Flags.log("Subscription Customer Creation:", value);
      var stripe = Stripe(client);
      return stripe.redirectToCheckout({
        lineItems: [{price: price, quantity: 1}],
        mode: "subscription",
        successUrl: factory.Flags.full(`subscribed?id=${customer}`),
        cancelUrl: factory.Flags.full("pricing"),
        customerEmail: email,
        clientReferenceId: customer,
      });
    })
    .then(result => {
      factory.Flags.log("Stripe Result:", result);
      if (result.error) factory.Flags.error("Stripe Error:", result.error);
    })
    .catch(e => factory.Flags.error("Subscribe Error:", e))
    .then(factory.Display.busy({
      target : $(document.body),
      status : "Processing Subscription Request",
      fn : true
    }));
  };
  /* <!-- Public Functions --> */
  
  return FN;
  
};