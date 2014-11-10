$(document).ready(function() {

  // accordion
  var $accordions = $('.js-accordion-container');
  $accordions.each(function() {
    var
      $accordionHd = $(this).find('.js-accordion-hd'),
      $accordionBd = $(this).find('.js-accordion-bd')
    ;
    
    $(this).on('click', '.js-accordion-hd', function() {
      var $current = $(this).next('.js-accordion-bd');

      $accordionHd.not(this).removeClass('js-accordion-active');

      $accordionBd.not($current)
        .stop(true, true)
        .slideUp('fast', function() {
          $(this).removeClass('js-accordion-active');
        })
      ;
      
      $(this).toggleClass('js-accordion-active');
      $current
        .stop(true, true)
        .slideToggle('fast', function() {
          $(this).toggleClass('js-accordion-active');
        })
      ;
      return false;
    });
  });
});