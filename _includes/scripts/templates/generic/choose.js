!function(){var n=Handlebars.template;(Handlebars.templates=Handlebars.templates||{}).choose=n({1:function(n,l,e,t,o){var a,r=n.lookupProperty||function(n,l){if(Object.prototype.hasOwnProperty.call(n,l))return n[l]};return null!=(a=n.lambda(null!=l?r(l,"instructions"):l,l))?a:""},3:function(n,l,e,t,o){var a,r=null!=l?l:n.nullContext||{},c=n.lookupProperty||function(n,l){if(Object.prototype.hasOwnProperty.call(n,l))return n[l]};return'          <div class="form-group">\n            '+(null!=(a=c(e,"if").call(r,null!=l?c(l,"desc"):l,{name:"if",hash:{},fn:n.program(4,o,0),inverse:n.noop,data:o,loc:{start:{line:15,column:12},end:{line:15,column:68}}}))?a:"")+'\n            <select class="custom-select form-control" id="choices" name="choices"\n                    size="'+n.escapeExpression(c(e,"either").call(r,null!=l?c(l,"size"):l,5,{name:"either",hash:{},data:o,loc:{start:{line:17,column:26},end:{line:17,column:43}}}))+'"'+(null!=(a=c(e,"if").call(r,null!=l?c(l,"multiple"):l,{name:"if",hash:{},fn:n.program(6,o,0),inverse:n.noop,data:o,loc:{start:{line:17,column:44},end:{line:17,column:75}}}))?a:"")+">\n"+(null!=(a=c(e,"each").call(r,null!=l?c(l,"choices"):l,{name:"each",hash:{},fn:n.program(8,o,0),inverse:n.noop,data:o,loc:{start:{line:18,column:14},end:{line:20,column:23}}}))?a:"")+"            </select>\n          </div>\n"},4:function(n,l,e,t,o){var a=n.lookupProperty||function(n,l){if(Object.prototype.hasOwnProperty.call(n,l))return n[l]};return'<label for="choices">'+n.escapeExpression(n.lambda(null!=l?a(l,"desc"):l,l))+"</label>"},6:function(n,l,e,t,o){return"multiple"},8:function(n,l,e,t,o){var a,r=null!=l?l:n.nullContext||{},c=n.lookupProperty||function(n,l){if(Object.prototype.hasOwnProperty.call(n,l))return n[l]};return'              <option value="'+n.escapeExpression(n.lambda(o&&c(o,"key"),l))+'"'+(null!=(a=c(e,"if").call(r,null!=l?c(l,"class"):l,{name:"if",hash:{},fn:n.program(9,o,0),inverse:n.noop,data:o,loc:{start:{line:19,column:38},end:{line:19,column:76}}}))?a:"")+(null!=(a=c(e,"if").call(r,null!=l?c(l,"title"):l,{name:"if",hash:{},fn:n.program(11,o,0),inverse:n.noop,data:o,loc:{start:{line:19,column:76},end:{line:19,column:114}}}))?a:"")+">"+(null!=(a=c(e,"exists").call(r,null!=l?c(l,"name"):l,{name:"exists",hash:{},fn:n.program(13,o,0),inverse:n.program(18,o,0),data:o,loc:{start:{line:19,column:115},end:{line:19,column:244}}}))?a:"")+"</option>\n"},9:function(n,l,e,t,o){var a=n.lookupProperty||function(n,l){if(Object.prototype.hasOwnProperty.call(n,l))return n[l]};return' class="'+n.escapeExpression(n.lambda(null!=l?a(l,"class"):l,l))+'"'},11:function(n,l,e,t,o){var a=n.lookupProperty||function(n,l){if(Object.prototype.hasOwnProperty.call(n,l))return n[l]};return' title="'+n.escapeExpression(n.lambda(null!=l?a(l,"title"):l,l))+'"'},13:function(n,l,e,t,o){var a,r=n.lookupProperty||function(n,l){if(Object.prototype.hasOwnProperty.call(n,l))return n[l]};return null!=(a=r(e,"if").call(null!=l?l:n.nullContext||{},null!=l?r(l,"name"):l,{name:"if",hash:{},fn:n.program(14,o,0),inverse:n.noop,data:o,loc:{start:{line:19,column:132},end:{line:19,column:216}}}))?a:""},14:function(n,l,e,t,o){var a,r=n.lookupProperty||function(n,l){if(Object.prototype.hasOwnProperty.call(n,l))return n[l]};return n.escapeExpression(n.lambda(null!=l?r(l,"name"):l,l))+(null!=(a=r(e,"exists").call(null!=l?l:n.nullContext||{},null!=l?r(l,"desc"):l,{name:"exists",hash:{},fn:n.program(15,o,0),inverse:n.noop,data:o,loc:{start:{line:19,column:152},end:{line:19,column:209}}}))?a:"")},15:function(n,l,e,t,o){var a,r=n.lookupProperty||function(n,l){if(Object.prototype.hasOwnProperty.call(n,l))return n[l]};return null!=(a=r(e,"if").call(null!=l?l:n.nullContext||{},null!=l?r(l,"desc"):l,{name:"if",hash:{},fn:n.program(16,o,0),inverse:n.noop,data:o,loc:{start:{line:19,column:168},end:{line:19,column:198}}}))?a:""},16:function(n,l,e,t,o){var a=n.lookupProperty||function(n,l){if(Object.prototype.hasOwnProperty.call(n,l))return n[l]};return" - "+n.escapeExpression(n.lambda(null!=l?a(l,"desc"):l,l))},18:function(n,l,e,t,o){return n.escapeExpression(n.lambda(l,l))},20:function(n,l,e,t,o){var a,r=null!=l?l:n.nullContext||{},c=n.lookupProperty||function(n,l){if(Object.prototype.hasOwnProperty.call(n,l))return n[l]};return"          "+(null!=(a=c(e,"if").call(r,null!=l?c(l,"desc"):l,{name:"if",hash:{},fn:n.program(4,o,0),inverse:n.noop,data:o,loc:{start:{line:24,column:10},end:{line:24,column:66}}}))?a:"")+'\n          <fieldset class="form-group" id="choices">\n'+(null!=(a=c(e,"each").call(r,null!=l?c(l,"choices"):l,{name:"each",hash:{},fn:n.program(21,o,0),inverse:n.noop,data:o,loc:{start:{line:26,column:12},end:{line:33,column:21}}}))?a:"")+"          </fieldset>\n"},21:function(n,l,e,t,o){var a,r=n.lambda,c=n.escapeExpression,i=null!=l?l:n.nullContext||{},u=n.lookupProperty||function(n,l){if(Object.prototype.hasOwnProperty.call(n,l))return n[l]};return'              <div class="form-check">\n                <label class="form-check-label">\n                  <input class="form-check-input" type="radio" name="choices" id="choice_'+c(r(o&&u(o,"key"),l))+'" value="'+c(r(o&&u(o,"key"),l))+'"'+(null!=(a=u(e,"if").call(i,o&&u(o,"first"),{name:"if",hash:{},fn:n.program(22,o,0),inverse:n.noop,data:o,loc:{start:{line:29,column:115},end:{line:29,column:144}}}))?a:"")+">\n                  <span"+(null!=(a=u(e,"if").call(i,null!=l?u(l,"html"):l,{name:"if",hash:{},fn:n.program(24,o,0),inverse:n.noop,data:o,loc:{start:{line:30,column:23},end:{line:30,column:59}}}))?a:"")+(null!=(a=u(e,"if").call(i,null!=l?u(l,"title"):l,{name:"if",hash:{},fn:n.program(26,o,0),inverse:n.noop,data:o,loc:{start:{line:30,column:59},end:{line:30,column:97}}}))?a:"")+(null!=(a=u(e,"if").call(i,null!=l?u(l,"content"):l,{name:"if",hash:{},fn:n.program(28,o,0),inverse:n.program(30,o,0),data:o,loc:{start:{line:30,column:97},end:{line:30,column:245}}}))?a:"")+">"+(null!=(a=u(e,"exists").call(i,null!=l?u(l,"name"):l,{name:"exists",hash:{},fn:n.program(13,o,0),inverse:n.program(18,o,0),data:o,loc:{start:{line:30,column:246},end:{line:30,column:375}}}))?a:"")+"</span>\n                </label>\n              </div>\n"},22:function(n,l,e,t,o){return" checked"},24:function(n,l,e,t,o){return' data-html="true"'},26:function(n,l,e,t,o){var a=n.lookupProperty||function(n,l){if(Object.prototype.hasOwnProperty.call(n,l))return n[l]};return" title='"+n.escapeExpression(n.lambda(null!=l?a(l,"title"):l,l))+"'"},28:function(n,l,e,t,o){var a=n.lookupProperty||function(n,l){if(Object.prototype.hasOwnProperty.call(n,l))return n[l]};return' data-toggle="popover" data-trigger="hover focus" data-content=\''+n.escapeExpression(n.lambda(null!=l?a(l,"content"):l,l))+"'"},30:function(n,l,e,t,o){var a,r=n.lookupProperty||function(n,l){if(Object.prototype.hasOwnProperty.call(n,l))return n[l]};return null!=(a=r(e,"if").call(null!=l?l:n.nullContext||{},null!=l?r(l,"title"):l,{name:"if",hash:{},fn:n.program(31,o,0),inverse:n.noop,data:o,loc:{start:{line:30,column:196},end:{line:30,column:238}}}))?a:""},31:function(n,l,e,t,o){return' data-toggle="tooltip"'},33:function(n,l,e,t,o){var a,r=n.lookupProperty||function(n,l){if(Object.prototype.hasOwnProperty.call(n,l))return n[l]};return null!=(a=r(e,"each").call(null!=l?l:n.nullContext||{},null!=l?r(l,"actions"):l,{name:"each",hash:{},fn:n.program(34,o,0),inverse:n.noop,data:o,loc:{start:{line:40,column:23},end:{line:40,column:325}}}))?a:""},34:function(n,l,e,t,o){var a,r=null!=l?l:n.nullContext||{},c=n.escapeExpression,i=n.lookupProperty||function(n,l){if(Object.prototype.hasOwnProperty.call(n,l))return n[l]};return"<button "+(null!=(a=i(e,"present").call(r,null!=l?i(l,"id"):l,{name:"present",hash:{},fn:n.program(35,o,0),inverse:n.noop,data:o,loc:{start:{line:40,column:48},end:{line:40,column:87}}}))?a:"")+'type="button" style="min-width: fit-content;" class="btn btn-outline-info waves-effect" data-action="'+c(i(e,"concat").call(r,"actions_",o&&i(o,"index"),{name:"concat",hash:{},data:o,loc:{start:{line:40,column:188},end:{line:40,column:216}}}))+'" data-dismiss="modal"'+(null!=(a=i(e,"if").call(r,null!=l?i(l,"title"):l,{name:"if",hash:{},fn:n.program(37,o,0),inverse:n.noop,data:o,loc:{start:{line:40,column:238},end:{line:40,column:298}}}))?a:"")+">"+c(n.lambda(null!=l?i(l,"text"):l,l))+"</button>"},35:function(n,l,e,t,o){var a=n.lookupProperty||function(n,l){if(Object.prototype.hasOwnProperty.call(n,l))return n[l]};return'id="'+n.escapeExpression(n.lambda(null!=l?a(l,"id"):l,l))+'" '},37:function(n,l,e,t,o){var a=n.lookupProperty||function(n,l){if(Object.prototype.hasOwnProperty.call(n,l))return n[l]};return' title="'+n.escapeExpression(n.lambda(null!=l?a(l,"title"):l,l))+'" data-toggle="tooltip"'},39:function(n,l,e,t,o){var a=n.lookupProperty||function(n,l){if(Object.prototype.hasOwnProperty.call(n,l))return n[l]};return'<button type="button" class="btn btn-primary waves-effect"\n        \tdata-dismiss="modal">'+n.escapeExpression(a(e,"either").call(null!=l?l:n.nullContext||{},null!=l?a(l,"action"):l,"Select",{name:"either",hash:{},data:o,loc:{start:{line:42,column:30},end:{line:42,column:56}}}))+"</button>"},compiler:[8,">= 4.3.0"],main:function(n,l,e,t,o){var a,r=n.lambda,c=n.escapeExpression,i=null!=l?l:n.nullContext||{},u=n.lookupProperty||function(n,l){if(Object.prototype.hasOwnProperty.call(n,l))return n[l]};return'<div id="'+c(r(null!=l?u(l,"id"):l,l))+'" class="modal fade bd-example-modal-lg" tabindex="-1" role="dialog" aria-hidden="true" aria-labelledby="modal_choose_title">\n  <div class="modal-dialog modal-lg" role="document">\n    <div class="modal-content">\n      <div class="modal-header">\n        <h5 class="modal-title" id="modal_choose_title">'+c(r(null!=l?u(l,"title"):l,l))+'</h5>\n        <button type="button" class="close" data-dismiss="modal" aria-label="Close">\n          <span aria-hidden="true">&times;</span>\n        </button>\n      </div>\n      <div class="modal-body">\n        '+(null!=(a=u(e,"if").call(i,null!=l?u(l,"instructions"):l,{name:"if",hash:{},fn:n.program(1,o,0),inverse:n.noop,data:o,loc:{start:{line:11,column:8},end:{line:11,column:53}}}))?a:"")+"\n        <form>\n"+(null!=(a=u(e,"if").call(i,u(e,"any").call(i,null!=l?u(l,"__LONG"):l,null!=l?u(l,"multiple"):l,{name:"any",hash:{},data:o,loc:{start:{line:13,column:14},end:{line:13,column:35}}}),{name:"if",hash:{},fn:n.program(3,o,0),inverse:n.program(20,o,0),data:o,loc:{start:{line:13,column:8},end:{line:35,column:15}}}))?a:"")+'        </form>        \n      </div>\n      <div class="modal-footer">\n        <button type="button" class="btn btn-secondary btn-outline-secondary btn-flat waves-effect" data-dismiss="modal">'+c(u(e,"either").call(i,null!=l?u(l,"cancel"):l,"Close",{name:"either",hash:{},data:o,loc:{start:{line:39,column:121},end:{line:39,column:146}}}))+"</button>\n        "+(null!=(a=u(e,"if").call(i,null!=l?u(l,"actions"):l,{name:"if",hash:{},fn:n.program(33,o,0),inverse:n.noop,data:o,loc:{start:{line:40,column:8},end:{line:40,column:332}}}))?a:"")+"\n        "+(null!=(a=u(e,"unless").call(i,u(e,"is").call(i,null!=l?u(l,"action"):l,"===",!1,{name:"is",hash:{},data:o,loc:{start:{line:41,column:18},end:{line:41,column:41}}}),{name:"unless",hash:{},fn:n.program(39,o,0),inverse:n.noop,data:o,loc:{start:{line:41,column:8},end:{line:42,column:76}}}))?a:"")+"\n      </div>\n    </div>\n  </div>\n</div>\n"},useData:!0})}();