!function(){var n=Handlebars.template;(Handlebars.templates=Handlebars.templates||{}).card=n({1:function(n,l,a,e,i){var s,t=n.lambda,r=n.escapeExpression;return" min-width: "+r(t(null!=(s=null!=l?l.widths:l)?s.min:s,l))+"px; max-width: "+r(t(null!=(s=null!=l?l.widths:l)?s.max:s,l))+"px;"},3:function(n,l,a,e,i){return"between"},5:function(n,l,a,e,i){return"around"},7:function(n,l,a,e,i){var s;return'<span class="material-icons text-success"'+(null!=(s=a.if.call(null!=l?l:n.nullContext||{},null!=l?l.icon_title:l,{name:"if",hash:{},fn:n.program(8,i,0),inverse:n.noop,data:i}))?s:"")+'">'+n.escapeExpression(n.lambda(null!=l?l.icon:l,l))+"</span>"},8:function(n,l,a,e,i){return' data-toggle="tooltip" title="'+n.escapeExpression(n.lambda(null!=l?l.icon_title:l,l))},10:function(n,l,a,e,i){return'<a href="#" data-toggle="tooltip" title="Click to copy QR Code Link"\n                         class="link" data-clipboard-text="'+n.escapeExpression(n.lambda(null!=l?l.link:l,l))+'">\n          <span class="material-icons">link</span>\n        </a>'},12:function(n,l,a,e,i){return'<a href="#">\n          <span class="material-icons">file_download</span>\n        </a>'},14:function(n,l,a,e,i){return"<span>"+n.escapeExpression(n.lambda(null!=l?l.notes:l,l))+"</span>"},16:function(n,l,a,e,i){return'<a href="#">\n          <span class="material-icons">print</span>\n        </a>'},compiler:[7,">= 4.0.0"],main:function(n,l,a,e,i){var s,t=n.lambda,r=n.escapeExpression,o=null!=l?l:n.nullContext||{};return'<div id="'+r(t(null!=l?l.id:l,l))+'_QR" class="card border-success mb-4 mb-lg-3" style="z-index: 1050;'+(null!=(s=a.if.call(o,null!=l?l.widths:l,{name:"if",hash:{},fn:n.program(1,i,0),inverse:n.noop,data:i}))?s:"")+'">\n  <div class="text-center p-0">\n    <div class="card-header border-success text-primary font-weight-bold">\n      <div class="d-flex flex-row justify-content-'+(null!=(s=a.if.call(o,null!=l?l.icon:l,{name:"if",hash:{},fn:n.program(3,i,0),inverse:n.program(5,i,0),data:i}))?s:"")+'">\n        <a data-toggle="collapse" href="#'+r(t(null!=l?l.id:l,l))+'_QR_FULL">'+r(t(null!=l?l.name:l,l))+"</a>"+(null!=(s=a.if.call(o,null!=l?l.icon:l,{name:"if",hash:{},fn:n.program(7,i,0),inverse:n.noop,data:i}))?s:"")+'</div>\n    </div>\n    <div class="card-body p-0">\n      <img class="img-fluid mx-auto d-block rounded" src="'+(null!=(s=t(null!=l?l.qr:l,l))?s:"")+'" />\t\n    </div>\n    <div class="card-footer bg-transparent border-success text-muted">\n      <div class="d-flex flex-row justify-content-between">'+(null!=(s=a.if.call(o,null!=l?l.link:l,{name:"if",hash:{},fn:n.program(10,i,0),inverse:n.noop,data:i}))?s:"")+(null!=(s=a.unless.call(o,null!=l?l.link:l,{name:"unless",hash:{},fn:n.program(12,i,0),inverse:n.noop,data:i}))?s:"")+(null!=(s=a.if.call(o,null!=l?l.notes:l,{name:"if",hash:{},fn:n.program(14,i,0),inverse:n.noop,data:i}))?s:"")+(null!=(s=a.unless.call(o,null!=l?l.link:l,{name:"unless",hash:{},fn:n.program(16,i,0),inverse:n.noop,data:i}))?s:"")+'</div>\n    </div>\n  </div>\n</div>\n<div id="'+r(t(null!=l?l.id:l,l))+'_QR_FULL" class="collapse bg-dark h-100 w-100" style="position: fixed; top: 0; left: 0; z-index: 9999;"\n     onclick="event.preventDefault(); document.getElementById(\''+r(t(null!=l?l.id:l,l))+'_QR_FULL\').classList.remove(\'show\');">\n  <div style="display:table; width: 100vw; height: 100vh;">\n    <div style="display:table-cell; vertical-align:middle; width: 100vw;">\n      <div class="mx-auto text-center">\n        <img class="img-fluid" src="'+(null!=(s=t(null!=l?l.qr:l,l))?s:"")+'" />\n      </div>\n    </div>\n  </div>\n</div>\n'},useData:!0})}();