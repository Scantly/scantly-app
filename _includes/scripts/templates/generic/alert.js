!function(){var n=Handlebars.template;(Handlebars.templates=Handlebars.templates||{}).alert=n({1:function(n,a,l,e,t){return n.escapeExpression(n.lambda(null!=a?a.type:a,a))},3:function(n,a,l,e,t){return"info"},5:function(n,a,l,e,t){var r,s=n.lambda,i=n.escapeExpression,o=null!=a?a:n.nullContext||{};return'    <div class="container-fluid">\n      <div class="row align-items-center">\n       <div class="col-9">\n          <strong>'+i(s(null!=a?a.headline:a,a))+"</strong>"+(null!=(r=l.if.call(o,null!=a?a.message:a,{name:"if",hash:{},fn:n.program(6,t,0),inverse:n.noop,data:t}))?r:"")+"\n         \t"+(null!=(r=l.if.call(o,null!=a?a.details:a,{name:"if",hash:{},fn:n.program(8,t,0),inverse:n.noop,data:t}))?r:"")+'\n        </div>\n        <div class="col-3">\n          <button type="button" class="btn btn-outline-'+(null!=(r=l.if.call(o,null!=a?a.type:a,{name:"if",hash:{},fn:n.program(1,t,0),inverse:n.program(3,t,0),data:t}))?r:"")+' btn-sm float-right action waves-effect"'+(null!=(r=l.if.call(o,null!=a?a.warning:a,{name:"if",hash:{},fn:n.program(10,t,0),inverse:n.noop,data:t}))?r:"")+">"+i(s(null!=a?a.action:a,a))+"</button>\n        </div>\n      </div>\n    </div>\n"},6:function(n,a,l,e,t){return" - "+n.escapeExpression(n.lambda(null!=a?a.message:a,a))},8:function(n,a,l,e,t){var r;return null!=(r=n.lambda(null!=a?a.details:a,a))?r:""},10:function(n,a,l,e,t){return' data-toggle="tooltip" data-placement="left" title="'+n.escapeExpression(n.lambda(null!=a?a.warning:a,a))+'"'},12:function(n,a,l,e,t){var r,s=null!=a?a:n.nullContext||{};return"    <strong>"+n.escapeExpression(n.lambda(null!=a?a.headline:a,a))+"</strong>"+(null!=(r=l.if.call(s,null!=a?a.message:a,{name:"if",hash:{},fn:n.program(6,t,0),inverse:n.noop,data:t}))?r:"")+"\n  \t"+(null!=(r=l.if.call(s,null!=a?a.details:a,{name:"if",hash:{},fn:n.program(8,t,0),inverse:n.noop,data:t}))?r:"")+"\n"},compiler:[7,">= 4.0.0"],main:function(n,a,l,e,t){var r,s=null!=a?a:n.nullContext||{};return'<div class="alert alert-'+(null!=(r=l.if.call(s,null!=a?a.type:a,{name:"if",hash:{},fn:n.program(1,t,0),inverse:n.program(3,t,0),data:t}))?r:"")+' alert-dismissible fade show" role="alert">\n'+(null!=(r=l.if.call(s,null!=a?a.action:a,{name:"if",hash:{},fn:n.program(5,t,0),inverse:n.program(12,t,0),data:t}))?r:"")+'  <button type="button" class="close" data-dismiss="alert" aria-label="Close">\n    <span aria-hidden="true">&times;</span>\n  </button>\n</div>\n'},useData:!0})}();