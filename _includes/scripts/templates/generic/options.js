!function(){var n=Handlebars.template;(Handlebars.templates=Handlebars.templates||{}).options=n({1:function(n,l,e,a,t){return" modal-dialog-centered"},3:function(n,l,e,a,t){var o=n.lookupProperty||function(n,l){if(Object.prototype.hasOwnProperty.call(n,l))return n[l]};return"<p>"+(null!=(n=n.lambda(null!=l?o(l,"instructions"):l,l))?n:"")+"</p>"},5:function(n,l,e,a,t){return" flex-wrap"},7:function(n,l,e,a,t,o,r){var i,u=n.lambda,s=n.escapeExpression,c=null!=l?l:n.nullContext||{},d=n.lookupProperty||function(n,l){if(Object.prototype.hasOwnProperty.call(n,l))return n[l]};return'          <div class="input-group col-md-12 col-lg-8 col-xl-6 p-1 no-gutters">\n            <input data-field="'+s(u(t&&d(t,"index"),l))+'" type="text" class="form-control disabled" value="'+(null!=(i=d(e,"if").call(c,null!=l?d(l,"name"):l,{name:"if",hash:{},fn:n.program(8,t,0,o,r),inverse:n.program(10,t,0,o,r),data:t,loc:{start:{line:15,column:92},end:{line:15,column:135}}}))?i:"")+'" disabled>\n            <div class="input-group-append">\n              <button id="'+s(u(null!=r[1]?d(r[1],"id"):r[1],l))+"_"+s(u(t&&d(t,"index"),l))+'_btn" type="button" class="btn btn-secondary dropdown-toggle mb-0" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">'+(null!=(i=d(e,"if").call(c,null!=l?d(l,"current"):l,{name:"if",hash:{},fn:n.program(12,t,0,o,r),inverse:n.program(14,t,0,o,r),data:t,loc:{start:{line:17,column:179},end:{line:17,column:226}}}))?i:"")+'</button>\n              <div class="dropdown-menu dropdown-menu-right" aria-label="'+s(u(null!=r[1]?d(r[1],"choices_label"):r[1],l))+'">\n'+(null!=(i=d(e,"each").call(c,null!=r[1]?d(r[1],"choices"):r[1],{name:"each",hash:{},fn:n.program(16,t,0,o,r),inverse:n.noop,data:t,loc:{start:{line:19,column:16},end:{line:21,column:25}}}))?i:"")+"              </div>\n            </div>\n          </div>\n"},8:function(n,l,e,a,t){var o=n.lookupProperty||function(n,l){if(Object.prototype.hasOwnProperty.call(n,l))return n[l]};return n.escapeExpression(n.lambda(null!=l?o(l,"name"):l,l))},10:function(n,l,e,a,t){return n.escapeExpression(n.lambda(l,l))},12:function(n,l,e,a,t){var o=n.lookupProperty||function(n,l){if(Object.prototype.hasOwnProperty.call(n,l))return n[l]};return n.escapeExpression(n.lambda(null!=l?o(l,"current"):l,l))},14:function(n,l,e,a,t){return"Select"},16:function(n,l,e,a,t){return"                "+(null!=(e=(n.lookupProperty||function(n,l){if(Object.prototype.hasOwnProperty.call(n,l))return n[l]})(e,"if").call(null!=l?l:n.nullContext||{},l,{name:"if",hash:{},fn:n.program(17,t,0),inverse:n.noop,data:t,loc:{start:{line:20,column:16},end:{line:20,column:221}}}))?e:"")+"\n"},17:function(n,l,e,a,t){var o,r=null!=l?l:n.nullContext||{},i=n.lookupProperty||function(n,l){if(Object.prototype.hasOwnProperty.call(n,l))return n[l]};return'<a class="dropdown-item" href="#" data-field="'+n.escapeExpression(n.lambda(t&&i(t,"index"),l))+'"'+(null!=(o=i(e,"if").call(r,null!=l?i(l,"desc"):l,{name:"if",hash:{},fn:n.program(18,t,0),inverse:n.noop,data:t,loc:{start:{line:20,column:85},end:{line:20,column:166}}}))?o:"")+">"+(null!=(o=i(e,"if").call(r,null!=l?i(l,"name"):l,{name:"if",hash:{},fn:n.program(8,t,0),inverse:n.program(10,t,0),data:t,loc:{start:{line:20,column:167},end:{line:20,column:210}}}))?o:"")+"</a>"},18:function(n,l,e,a,t){var o=n.lookupProperty||function(n,l){if(Object.prototype.hasOwnProperty.call(n,l))return n[l]};return' data-toggle="tooltip" data-placement="left" title="'+n.escapeExpression(n.lambda(null!=l?o(l,"desc"):l,l))+'"'},compiler:[8,">= 4.3.0"],main:function(n,l,e,a,t,o,r){var i,u=n.lambda,s=n.escapeExpression,c=null!=l?l:n.nullContext||{},d=n.lookupProperty||function(n,l){if(Object.prototype.hasOwnProperty.call(n,l))return n[l]};return'<div id="'+s(u(null!=l?d(l,"id"):l,l))+'" class="modal fade bd-example-modal-lg" tabindex="-1" role="dialog" aria-hidden="true" aria-labelledby="modal_options_title">\n  <div class="modal-dialog modal-lg'+(null!=(i=d(e,"if").call(c,null!=l?d(l,"center"):l,{name:"if",hash:{},fn:n.program(1,t,0,o,r),inverse:n.noop,data:t,loc:{start:{line:2,column:35},end:{line:2,column:78}}}))?i:"")+'" role="document">\n    <div class="modal-content">\n      <div class="modal-header">\n        <h5 class="modal-title" id="modal_options_title">'+(null!=(i=u(null!=l?d(l,"title"):l,l))?i:"")+'</h5>\n        <button type="button" class="close" data-dismiss="modal" aria-label="Close">\n          <span aria-hidden="true">&times;</span>\n        </button>\n      </div>\n      <div class="modal-body">\n        '+(null!=(i=d(e,"if").call(c,null!=l?d(l,"instructions"):l,{name:"if",hash:{},fn:n.program(3,t,0,o,r),inverse:n.noop,data:t,loc:{start:{line:11,column:8},end:{line:11,column:60}}}))?i:"")+'\n        <div class="d-flex flex-row'+(null!=(i=d(e,"if").call(c,null!=l?d(l,"inline"):l,{name:"if",hash:{},fn:n.program(5,t,0,o,r),inverse:n.noop,data:t,loc:{start:{line:12,column:35},end:{line:12,column:66}}}))?i:"")+'">\n'+(null!=(i=d(e,"each").call(c,null!=l?d(l,"list"):l,{name:"each",hash:{},fn:n.program(7,t,0,o,r),inverse:n.noop,data:t,loc:{start:{line:13,column:10},end:{line:25,column:19}}}))?i:"")+'        </div>\n      </div>\n      <div class="modal-footer">\n        <button type="button" class="btn btn-secondary btn-outline-secondary btn-flat waves-effect" data-dismiss="modal">Close</button>\n        <button type="button" class="btn btn-primary waves-effect" data-dismiss="modal">'+s(u(null!=l?d(l,"action"):l,l))+"</button>\n      </div>\n    </div>\n  </div>\n</div>\n"},useData:!0,useDepths:!0})}();