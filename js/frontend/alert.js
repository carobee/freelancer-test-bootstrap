// Remove the alerts block and title when empty
function removeBlock ($alertsBlock, transition) {
  if ($alertsBlock.find('.list-item').length === 0) {
    var $alertsBlockTitle = $alertsBlock.prev('.section-title');
    $alertsBlock.add($alertsBlockTitle).slideUp(transition);
  }
}

// Remove one alert and its container if needed 
function removeAlert ($alertAction, $alertsBlock, transition) {
  var
    $alert = $alertAction.parents('.list-item'),
    $alertsList = $alert.parents('.list'),
    $alerts = $alertsList.find('.list-item')
  ;

  if ($alerts.length === 1) {
    $alertsList.slideUp(transition, function() {
      $(this).remove();
      removeBlock($alertsBlock, transition);
    });
  } else {
    $alert.slideUp(transition, function() {
      $(this).remove();
      removeBlock($alertsBlock, transition);
    });
  }

}

function initAlerts ($alertsBlock, transition) {
  transition = transition || 'slow';

  var $alertActionDelete = $alertsBlock.find('.alert-action-delete > a');

  $alertActionDelete.on('click', function(event) {
    event.preventDefault();
    removeAlert($(this), $alertsBlock, transition);
  });
}

jQuery(document).ready(function($) {
  var
    $alerts           = $('#alerts'),
    $alertsWithholing = $('#alerts-withholing')
  ;

  if ($alerts.length) {
    initAlerts($alerts);
  }

  if ($alertsWithholing.length) {
    initAlerts($alertsWithholing);
  }
});