!function(){var n=Handlebars.template;(Handlebars.templates=Handlebars.templates||{}).location=n({1:function(n,a,l,e,t){return"flex"},3:function(n,a,l,e,t){return"none"},5:function(n,a,l,e,t){var r;return null!=(r=l.if.call(null!=a?a:n.nullContext||{},null!=(r=null!=a?a.location:a)?r.valid:r,{name:"if",hash:{},fn:n.program(6,t,0),inverse:n.program(8,t,0),data:t}))?r:""},6:function(n,a,l,e,t){return"success"},8:function(n,a,l,e,t){return"danger"},10:function(n,a,l,e,t){return"faded"},12:function(n,a,l,e,t){var r;return n.escapeExpression(n.lambda(null!=(r=null!=a?a.location:a)?r.value:r,a))},compiler:[7,">= 4.0.0"],main:function(n,a,l,e,t){var r,i=null!=a?a:n.nullContext||{};return'<div id="'+n.escapeExpression(n.lambda(null!=a?a.id:a,a))+'_location" class="d-'+(null!=(r=l.if.call(i,null!=a?a.location:a,{name:"if",hash:{},fn:n.program(1,t,0),inverse:n.program(3,t,0),data:t}))?r:"")+' justify-content-center">\n  <h2 class="bg-location d-flex align-items-center p-1 mb-0 mt-1 rounded-lg border border-dark">\n    <span class="validity material-icons text-'+(null!=(r=l.if.call(i,null!=a?a.location:a,{name:"if",hash:{},fn:n.program(5,t,0),inverse:n.program(10,t,0),data:t}))?r:"")+' mr-1">location_city</span>\n    <span class="name text-light font-weight-light">'+(null!=(r=l.if.call(i,null!=a?a.location:a,{name:"if",hash:{},fn:n.program(12,t,0),inverse:n.noop,data:t}))?r:"")+"</span>\n  </h2>\n</div>\n"},useData:!0})}();