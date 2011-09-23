(function ($) {
    $(function () {
        $button = $('#notification');
        $window = $("<div>DRU</div>");
        $window.attr("id", "notification-window");
        $window.hide();
        $('body').append($window);

        $button.click(function (event) {
            $window.toggle();
            
            //TODO: track scroll on window?
            $window.position({
                of: $button,
                my: 'left top',
                at: 'left bottom',
                offset: '0 11'
            });
            event.preventDefault();
        });
        
        //TODO: add hide
    });
})(jQuery);