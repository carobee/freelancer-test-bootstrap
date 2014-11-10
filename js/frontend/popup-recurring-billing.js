(function ($) {

  var
    $recurringCycle     = $('#recurring-cycle'),
    recurringCycleValue = $recurringCycle.find('option:selected').val(),
    $recurringDaily     = $('#recurring-daily'),
    $recurringWeekly    = $('#recurring-weekly'),
    $recurringMonthly   = $('#recurring-monthly'),
    $recurringYearly    = $('#recurring-yearly'),

    $recurringEnd       = $('#recurring-end'),
    recurringEndValue   = $recurringEnd.is(":checked"),
    $recurringEndAfter  = $('#recurring-end-after')
  ;

  $.fn.bindRecurringPopupUpdates = function() {
    var init = function () {
      updateRecurringCycle();
      updateRecurringEnd();
    }

    $recurringCycle.on('change', function() {
      recurringCycleValue = $recurringCycle.find('option:selected').val();
      updateRecurringCycle();
    });

    $recurringEnd.on('change', function() {
      recurringEndValue = $recurringEnd.is(":checked");
      updateRecurringEnd(recurringEndValue);
    });

    var updateRecurringCycle = function () {

      switch (recurringCycleValue) {
        case 'daily':
          $recurringDaily.show();
          $recurringWeekly.hide();
          $recurringMonthly.hide();
          $recurringYearly.hide();
          break;
        case 'weekly':
          $recurringDaily.hide();
          $recurringWeekly.show();
          $recurringMonthly.hide();
          $recurringYearly.hide();
          break;
        case 'monthly':
          $recurringDaily.hide();
          $recurringWeekly.hide();
          $recurringMonthly.show();
          $recurringYearly.hide();
          break;
        case 'yearly':
          $recurringDaily.hide();
          $recurringWeekly.hide();
          $recurringMonthly.hide();
          $recurringYearly.show();
          break;
      }
    }

    var updateRecurringEnd = function(recurringEndValue) {
      if (recurringEndValue) {
        $recurringEndAfter.removeAttr('disabled');
      } else {
        $recurringEndAfter.attr('disabled','disabled');
      }
    }

    init();

    return this;
  }

})(jQuery);

jQuery(document).ready(function($) {
  $('#popup-new-recurring-invoice').bindRecurringPopupUpdates();
});