var updateDocumentAmounts = function() {
  var $container = $('#documentAmount');

  if (!$container.length) { return; }

  var
    $discount      = $('#documentAmount-discount'),
    $discountValue = $('#documentAmount-discount-value'),
    $discountType  = $('#documentAmount-discount-type'),
    $discountText  = $discount.find('.amount').last(),

    $rebate        = $('#documentAmount-rebate'),
    $rebateValue   = $('#documentAmount-rebate-value'),
    $rebateType    = $('#documentAmount-rebate-type'),
    $rebateText    = $rebate.find('.amount').last(),

    $promotions    = $discount.add($rebate),

    grossTotal = numberHelper.toNumber($container.find('.amount').first().text()),
    discount,
    rebate,
    $net = $('#documentAmount-net'),
    net,

    $vatRegular     = $('#documentAmount-vatRegular'),
    vatRegularRate  = $vatRegular.data('rate'),
    vatRegularBase  = $vatRegular.data('base'),
    vatRegularRatio = vatRegularBase / grossTotal,
    vatRegular = 0,

    $vatReduced     = $('#documentAmount-vatReduced'),
    vatReducedRate  = $vatReduced.data('rate'),
    vatReducedBase  = $vatReduced.data('base'),
    vatReducedRatio = vatReducedBase / grossTotal,
    vatReduced = 0,

    $grandTotal = $('#documentAmount-grandTotal'),
    grandTotal,

    errorHtml = '<div class="form-item-error-message"></div>',
    errorType,

    $organismTotal  = $('#organism-total').find('strong'),
    $freelanceTotal = $('#freelance-total').find('strong'),
    withholdingMda,
    broadcasterTax,
    organismTotal,
    freelanceTotal
  ;

  var updateAmounts = function() {
    // update promotions
    var
      discountValue = Math.abs(numberHelper.toNumber($discountValue.val())),
      discountType  = $discountType.val()
    ;
    discount = (discountType === '%')? grossTotal * discountValue / 100 : discountValue;
    $discountText.text(numberHelper.toCurrency(discount));

    if ($rebate.length) {
      var
        rebateValue = Math.abs(numberHelper.toNumber($rebateValue.val())),
        rebateType  = $rebateType.val()
      ;

      rebate = (rebateType === '%')? grossTotal * rebateValue / 100 : rebateValue;
      $rebateText.text(numberHelper.toCurrency(rebate));

    } else {
      rebate = 0;
    }

    // Manage input errors
    var addErrorMsg = function($errorField, errorMsg) {
      if ($errorField.hasClass('form-item-error')) {
        $errorField.find('.form-item-error-message').text(errorMsg);
      } else {
        $errorField.addClass('form-item-error').append(errorHtml).find('.form-item-error-message').text(errorMsg);
      }
    }

    var removeErrorMsg = function () {
      $promotions.removeClass('form-item-error').find('.form-item-error-message').remove();
      errorType = false;
    }

    removeErrorMsg();

    if (discount + rebate >= grossTotal) {
      errorType = 'total';
    }
    if (discount >= grossTotal) {
      errorType = 'discount';
    }
    if (rebate >= grossTotal) {
      errorType = 'rebate';
    }

    
    switch(errorType) {
      case 'total':
        addErrorMsg($promotions,'Le total de la remise et du rabais ne peut dépasser le total brut');
        break;
      case 'discount':
        addErrorMsg($discount,'Le montant de la remise ne peut dépasser le total brut');
        break;
      case 'rebate':
        addErrorMsg($rebate,'Le montant du rabais ne peut dépasser le total brut');
        break;
      default:
        if (errorType) { // tests if a previous error exists
          removeErrorMsg();
        }
    }

    net = grossTotal - discount - rebate;
    $net.text(numberHelper.toCurrency(net));
  
    // update VAT
    vatRegular = net * vatRegularRatio * vatRegularRate / 100;
    $vatRegular.text(numberHelper.toCurrency(vatRegular));

    vatReduced = net * vatReducedRatio * vatReducedRate / 100;
    $vatReduced.text(numberHelper.toCurrency(vatReduced));

    // update grand total
    grandTotal = net + vatRegular + vatReduced;
    $grandTotal.text(numberHelper.toCurrency(grandTotal));
  }

  // update organism total and freelance total
  var updateTotal = function () {
    withholdingMda = grandTotal * (7.5+0.5+0.35+0.85)/100;
    broadcasterTax = grandTotal * 1.1/100;
    organismTotal  = withholdingMda + broadcasterTax;
    freelanceTotal = grandTotal - withholdingMda;

    $organismTotal.text(numberHelper.toCurrency(organismTotal));
    $freelanceTotal.text(numberHelper.toCurrency(freelanceTotal));
  }

  $container.on('change', 'li', function() {
    updateAmounts();
    updateTotal();
  })

  var init = function() {
    updateAmounts();
    updateTotal();
  }

  init();

}

jQuery(document).ready(function() {
  updateDocumentAmounts();
});
