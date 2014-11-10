$(document).ready(function() {

  // collapsable
  $('.js-collapsable-hd').on('click', function() {
    $(this)
      .toggleClass('js-collapsable-active')
      .next(".js-collapsable-bd")
        .slideToggle("fast", function() {
          $(this).toggleClass('js-collapsable-active');
        })
    ;
    return false;
  });

});