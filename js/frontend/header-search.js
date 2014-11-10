var displaySearch = function () {
  var
    $search = $('#search'),
    $label  = $search.find('label'),
    $input  = $search.find('input'),
    $clear  = $search.find('#search-clear')
  ;

  var clearSearch = function() {
    $search.removeClass('active');
    $input.val('');
    $clear.removeClass('search-clear-active');
  };

  $label.on('click', function() {
    if (!$search.hasClass('active')) {
      $search.addClass('active');
    }
  });

  $input.on('focusout', function() {
    clearSearch()
  });

  $input.on('keyup', function() {
    console.log('$input.val()',$input.val());
    if ($input.val()) {
      $clear.addClass('search-clear-active');
    } else {
      $clear.removeClass('search-clear-active');
    }
  });

  $clear.on('click', function() {
    clearSearch()
  });

}

jQuery(document).ready(function() {
  displaySearch();
});