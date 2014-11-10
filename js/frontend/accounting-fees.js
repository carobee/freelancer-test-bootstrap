jQuery(document).ready(function($) {

  function sanitiseNumbersInput(num) {
    num = num.toString().replace(/\ /g,'');
    num = num.toString().replace(/\,/g,'.');
    if (isNaN(num)) { num = '0'; }
    num = parseFloat(num);
    return num;
  }

  function sanitiseNumbersOutput(num) {
    num = Math.floor(num * 100);
    var cents = num % 100;
    num = Math.floor(num / 100).toString();
    if (cents < 10) { cents = '0' + cents; }
    if (cents === 0) { cents = '00'; }
    for (var i = 0; i < Math.floor((num.length - (1 + i)) / 3); i++) {
      num = num.substring(0, num.length - (4 * i + 3)) + ' ' + num.substring(num.length - (4 * i + 3));
    }
    return num + ',' + cents;
  }

  function computeVAT () {

    $('.form-creation-fee').each(function() {
      var
        $current = $(this),

        $amountVatInclusive = $current.find('.fee-price'),
        amountVatInclusive  = +sanitiseNumbersInput( $amountVatInclusive.val() === '' ? 0 : $amountVatInclusive.val() ),

        $vatRate = $current.find('.fee-vat-rate'),
        vatRate  = +sanitiseNumbersInput( $vatRate.find("option:selected").val() ),

        $amountVat = $current.find('.fee-vat'),
        amountVat  = +sanitiseNumbersInput( $amountVat.val() === '' ? 0 : $amountVat.val() ),

        $amountVatExclusive = $current.find('.fee-revenue'),
        amountVatExclusive  = +sanitiseNumbersInput( $amountVatExclusive.val() === '' ? 0 : $amountVatExclusive.val() )
      ;

      function vatRound (amount) {
        amount = (Math.floor(amount * 1000)/1000).toFixed(3);
        amount = ((amount * 100)/100).toFixed(2);
        return amount;
      }

      function updateValues (inputType) {
        // cleanup main reference display
        $amountVatInclusive.val( sanitiseNumbersOutput( amountVatInclusive ) );

        if (vatRate !== -1) {
          // retrieves amount without VAT 
          amountVatExclusive = vatRound( amountVatInclusive / (1 + vatRate) );
          $amountVatExclusive.val( sanitiseNumbersOutput( amountVatExclusive ) );

          // Always compute with integer otherwise Javascript does weird stuff
          amountVat = (amountVatInclusive * 100 - amountVatExclusive * 100) / 100;
          $amountVat.val( sanitiseNumbersOutput( amountVat ) );
        }
        else {
          // computes VAT amount from VAT excl. and VAT incl. amounts
          if (inputType === 'amountVatExclusive') {
            $amountVatExclusive.val( sanitiseNumbersOutput( amountVatExclusive ) );

            amountVat = (amountVatInclusive * 100 - amountVatExclusive * 100) / 100;
            $amountVat.val( sanitiseNumbersOutput( amountVat ) );
          }
          // computes VAT excl. from VAT amount and VAT incl. amounts
          else {
            amountVatExclusive = (amountVatInclusive * 100 - amountVat * 100) / 100;
            $amountVatExclusive.val( sanitiseNumbersOutput( amountVatExclusive ) );

            $amountVat.val( sanitiseNumbersOutput( amountVat ) );
          }
        }
      }

      // Update once on load
      updateValues(amountVatInclusive);
      if (vatRate >= 0) {
        $amountVat.attr('disabled', true);
        $amountVatExclusive.attr('disabled', true);
      }


      $amountVatInclusive.on('change', function() {
        // updates field value
        amountVatInclusive = sanitiseNumbersInput( $amountVatInclusive.val() );
        amountVatInclusive = sanitiseNumbersInput(amountVatInclusive);
        updateValues();
      });

      $vatRate.on('change', function() {
        vatRate = sanitiseNumbersInput( $vatRate.find("option:selected").val() );
        if (vatRate < 0) {
          $amountVat.attr('disabled', false);
          $amountVat.val( sanitiseNumbersOutput( 0 ) );

          $amountVatExclusive.attr('disabled', false);
          $amountVatExclusive.val( sanitiseNumbersOutput( 0 ) );
        }
        else {
          $amountVat.attr('disabled', true);
          $amountVatExclusive.attr('disabled', true);
        }
        updateValues();
      });

      $amountVat.on('change', function() {
        // updates field value
        amountVat = sanitiseNumbersInput( $amountVat.val() );
        amountVat = sanitiseNumbersInput(amountVat);
        updateValues('amountVat');
      });

      $amountVatExclusive.on('change', function() {
        // updates field value
        amountVatExclusive = sanitiseNumbersInput( $amountVatExclusive.val() );
        amountVatExclusive = sanitiseNumbersInput(amountVatExclusive);
        updateValues('amountVatExclusive');
      });


    });
  }

  if ($('.form-creation-fee').length) {
    computeVAT();
  }

});