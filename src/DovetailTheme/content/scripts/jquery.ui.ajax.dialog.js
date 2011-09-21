(function($,window,undefined){

    $.extend($, {
        loadTemp:function(url,callback){

            var id = "random" + new Date().getTime();

            $('body').append("<div id='" + id + "'>")
            .find('#' + id)
            .hide()
            .load(url, function(){
                callback.call(this);
            });
        },
        launchDialog : function(options){
            var defaults = {
                onComplete : function(){
                    console.log(this);
                }
            };
            var config = $.extend({},defaults,options);
            $(this).dialog($.extend(options,{
                autoOpen:true,
                buttons:{
                    "Ok" : function(){
                        config.onComplete.call(this);
                        $(this).dialog('close');
                    },
                    Cancel: function(){
                        $(this).dialog("close");
                    }
                },
                close : function(){
                    $(this)
                    .dialog('destroy')
                    .remove();
                }
            }));
        }
    });


    $.fn.extend({
        ajaxDialog: function(options){

            return this.each(function(){
                var $this = $(this),
                defaults = {
                    title:$this.attr('title'),
                    modal:true,
                    afterLoad:function(){
                        var $this = $(this);
                        $this
                            .find('.ft').hide().end()
                            .find('.hd').hide().end()
                            .find('.grid_12').removeClass('grid_12');
                    }
                },
                config = $.extend({},defaults,options);
                $this.bind('click',function(ev){
                    ev.preventDefault();
                    $.loadTemp(config.url ? $.isFunction(config.url) ? config.url() : config.url : $this.attr("href"), function(){
                        var $temp = $(this);
                        config.afterLoad.call($temp);
                        $.launchDialog.call($temp, $.extend({width:600, title:$temp.find('.hd').text().trim()},config));
                    });
                });
            });
        }
    });


})(jQuery,window);
