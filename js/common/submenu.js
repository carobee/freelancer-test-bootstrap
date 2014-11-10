jQuery(document).ready(function($) {

  var
    $hasSubmenus = $('.submenu-list'),
    $submenus    = $hasSubmenus.find('.submenu').hide()
  ;

  $hasSubmenus.each(function() {

      var
        $el      = $(this),
        $trigger = $el.find('> a'),
        $submenu = $el.find('.submenu')
      ;

      // Center submenu under the trigger button
      var
        // elWidth      = $trigger.outerWidth(),
        submenuWidth = $submenu.outerWidth(),
        submenuLeft  = Math.round(submenuWidth/2)
      ;

      $submenu.css('margin-left', -submenuLeft + 'px');

      // trigger show/hide submenu on click
      $trigger.click(function(e) {
        e.preventDefault();

        if ($submenu.is(":visible")) {
          $submenu.hide();
        }
        else {
          $submenus.hide();
          $submenu.show();
        }
      });

  });

  // Click outside of an open menu hides it
  (function(){
    $('body').click(function(e){
      // Clicks inside account menu are ignored
      if ($(e.target).parents('.submenu-list').length){
        return;
      }
      $hasSubmenus.find('.submenu:visible').each(function(){
        $(this).hide();
      });
    });
  })();

});