jQuery(document).ready(function($) {

  (function(){
    var $tooltips = $('.js-tooltip');

    $tooltips.each(function() {

        var
          $el      = $(this),
          $trigger = $el.find(':first-child'),
          $content = $el.find(':last-child')
        ;

        // trigger show/hide submenu on click
        $trigger.click(function(e) {
          e.preventDefault();

          if ($content.is(":visible")) {
            $el.removeClass('js-tooltip-active');
          }
          else {
            $tooltips.removeClass('js-tooltip-active');
            $el.addClass('js-tooltip-active');
          }
        });

    });

    // Clicks outside the tooltip content hides it
    $('body:first').click(function(e){
      // Clicks inside account menu are ignored
      if ($(e.target).parents('.js-tooltip').length)
      {
        return;
      }
      $tooltips.removeClass('js-tooltip-active');
    });
  })();

});