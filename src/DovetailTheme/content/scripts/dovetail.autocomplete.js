/* dovetail.autocomplete.js
 *
 *  dependencies: jquery.metadata.js, jquery.smart_autocomplete.js
 * 
 *
 */

(function($, window, undefined) {
    $.widget("ui.autopicker",{
        options: {
            template: "",
            resultsSource: 'Entities',
            termExtractor:function(data){
                return $.tmpl(this.options.template,data).text();
            },
            resultFormatter: function (){
                return "<li>" + this.options.termExtractor.apply(this,arguments) + "</li>";
            },
            filter: function(term, source){
                var default_filter_matcher = function (term, source, context) {
                    var matcher = new RegExp(term.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&"), "i");
                    return $.grep(source[context.options.resultsSource], function (value) {
                        return matcher.test(context.options.termExtractor.call(context,value));
                    });

                },
                _self = this;

                //when source is an array
                if ($.type(source) === "array" || $.type(source) === "object") {
                    // directly map
                    var results = default_filter_matcher(term, source,this);
                    return results;
                }

                //when source is a string
                else if ($.type(source) === "string") {
                    // treat the string as a URL endpoint
                    // pass the query as 'term'

                    return $.Deferred(function (dfd) {
                        $.ajax({
                            url: source,
                            data: { "query": term + "*" },
                            dataType: "json"
                        }).success(function (data) {
                            dfd.resolve(default_filter_matcher(term, data,_self));
                        });
                    }).promise();
                }
            }
        },
        _create:function(){
            var _self = this,
                input = this.element.find('.autocomplete');
                 $.extend(this.options, this.element.metadata());
                 input
                 .smartAutoComplete({
                         source:_self.options.url,
                         forceSelect:true,
                         filter:function(){
                             return _self.options.filter.apply(_self, arguments);
                         },
                         resultFormatter : $.proxy(_self.options.resultFormatter,_self)
                    })
                    .bind({
                        itemSelect:function(ev,item){
                            var context = ev.target,
                                options = $(context).data("smart-autocomplete");

                                if(options.currentSelection != null && options.rawResults){
                                    //this is making an assumption that the field will be Id
                                    _self.element.find("input[type~=hidden]").val(options.rawResults[options.currentSelection]['Id']);
                                }

                        },
                        lostFocus:function(ev,item){
                            var context = ev.target,
                                options = $(context).data("smart-autocomplete");
                            console.log("dovetail:autopicker:lostFocus",options)
                        }
                    });
            // after autocomplete binds we need to tell it we have a value
            var saOptions = $(input).data("smart-autocomplete");
            saOptions.setItemSelected(!!input.val());

            this.element.find('.button-add').ajaxDialog(); 
        }
    });
})(jQuery, window);

    jQuery(function(){
        $('.autopicker').autopicker();
    });

