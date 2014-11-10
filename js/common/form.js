//
// Set focus on first element with form-focus class
//

var setFormFocus = function ($form) {
  $form.find('.js-form-focus:first').focus();
}

//
// Reveal form once fields display has been sorted out
//

var revealForm = function ($form) {
  $form.animate({'opacity':1}, 'slow');
}

//
// Define transitions
//

var displayFormField = function ($object, displayType, transition) {
  transition = transition || 'slow';
  
  if (displayType === 'show') {
    if (transition !== 'none') {
      $object.slideDown(transition);
    } else {
      $object.show();
    }
  } else {
    if (transition !== 'none') {
      $object.slideUp(transition);
    } else {
      $object.hide();
    }
  }
}