(function ($) {

// Update item price (unit price)
$.fn.updateItemPrice = function() {

  var
    $container    = this,
    $trigger      = $container.find('.js-service-edit-unit-price-mode'),
    $unitQuantity = $container.find('.js-service-price-quantity'),
    $unitPrice    = $container.find('.js-service-edit-unit-price-price'),
    $inputs       = $container.find('fieldset').find('input, select'),
    $price        = $container.next('li').find('input')
  ;

  var updatePrice = function() {
    var
      unitQuantity = numberHelper.toNumber($unitQuantity.val()),
      unitPrice    = numberHelper.toNumber($unitPrice.val()),
      newPrice     = numberHelper.toCurrency(unitQuantity * unitPrice)
    ;
    $price.val(newPrice);
  };

  $container.on('input', $unitQuantity, function() {
    updatePrice();
  });

  $container.on('input', $unitPrice, function() {
    updatePrice();
  });

  $trigger.on('click', function() {
    if ($(this).is(":checked")) {
      $container.addClass('active');
      $inputs.removeAttr('disabled');
      $price.attr('disabled','disabled');
      updatePrice();
    } else {
      $container.removeClass('active');
      $inputs.attr('disabled', 'disabled');
      $price.removeAttr('disabled');
    }
  });
}

})(jQuery);

jQuery(document).ready(function($) {
  $('.service-edit-unit-price').each(function() {
    $(this).updateItemPrice();
  });
});