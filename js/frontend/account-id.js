/* global displayFormField */

function accountIdToggleFields () {
  
  //
  // Setup variables and retrieve current values
  //

  var
    $form = $('#account-id'),

    $hasSmtp     = $('#account-id-has-smtp'),
    hasSmtpValue = $hasSmtp.is(":checked"),

    $smtp = $('#account-id-smtp')
  ;

  $hasSmtp.on('change', function() {
    hasSmtpValue = $hasSmtp.is(":checked");
    // console.log(hasSmtp);
    hasSmtp();
  });

  function hasSmtp (transition) {
    transition = transition || 'slow';

    if (hasSmtpValue) {
      displayFormField($smtp, 'show', transition);
    } else {
      displayFormField($smtp, 'hide', transition);
    }
  }

  // Initial setup

  function init () {
    // Setup form elements
    var transition = 'none';
    hasSmtp(transition);

    // Reveal form once setup is done
    revealForm($form);
  }

  init();

}

jQuery(document).ready(function() {
  accountIdToggleFields();
});