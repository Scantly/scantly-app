!function(){var n=Handlebars.template;(Handlebars.templates=Handlebars.templates||{}).subscribed=n({1:function(n,l,e,t,a){var r=n.lookupProperty||function(n,l){if(Object.prototype.hasOwnProperty.call(n,l))return n[l]};return'id="'+n.escapeExpression(n.lambda(null!=l?r(l,"id"):l,l))+'"'},compiler:[8,">= 4.3.0"],main:function(n,l,e,t,a){var r=n.lambda,o=n.lookupProperty||function(n,l){if(Object.prototype.hasOwnProperty.call(n,l))return n[l]};return"<div "+(null!=(e=o(e,"if").call(null!=l?l:n.nullContext||{},null!=l?o(l,"id"):l,{name:"if",hash:{},fn:n.program(1,a,0),inverse:n.noop,data:a,loc:{start:{line:1,column:5},end:{line:1,column:33}}}))?e:"")+' class="container bg-light py-2">\n  '+(null!=(e=r(null!=l?o(l,"instructions"):l,l))?e:"")+"\n  <hr />\n  "+(null!=(e=r(null!=l?o(l,"table"):l,l))?e:"")+"\n</div>\n"},useData:!0})}();