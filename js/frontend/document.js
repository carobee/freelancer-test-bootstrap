jQuery(document).ready(function($) {

  // new message

  $('#message-new').on('click', function(event) {
    event.preventDefault();
    $('#message-new-form').slideDown('slow');
    $(this).fadeOut('slow');
  });

  $('#message-new-form-cancel').on('click', function(event) {
    event.preventDefault();
    $('#message-new-form').slideUp();
    $('#message-new').fadeIn('slow');
  });


  // edit message

  $('#message-edit').on('click', function(event) {
    event.preventDefault();
    $(this).hide();
    $('#message-edit-form').show();
  });

  $('#message-edit-form-cancel').on('click', function(event) {
    event.preventDefault();
    $('#message-edit').show();
    $('#message-edit-form').hide();
  });

    $('#message-edit-form-delete').on('click', function(event) {
    event.preventDefault();
    $('#message-edit-form').slideUp();
    $('#message-new').removeClass('hidden').fadeIn('slow');
  });


  // change currency
  var changeCurrency = function (currency) {
    var
      $organism  = $('#organism-total').find('.currency'),
      $freelance = $('#freelance-total').find('.currency'),
      symbol
    ;
    switch(currency) {
      case 'EUR':
        symbol = '€';
        break;
      case 'USD':
        symbol = '$';
        break;
    }
    $organism.text(symbol);
    $freelance.text(symbol);
  }

  $('#document-services-currency').on('change', function(event) {
    event.preventDefault();
    changeCurrency($(this).val());
  });


  // edit service

  $('.document-services-item').each(function() {
    var
      $servicesItem           = $(this),
      $serviceItemView        = $servicesItem.find('a').first(),
      $serviceItemViewDesc    = $serviceItemView.find('.service-description'),
      serviceItemViewTitle    = $serviceItemViewDesc.find('.title').text(),
      serviceItemViewDetails  = $serviceItemViewDesc.find('.details').first().text(),
      $serviceItemEdit        = $servicesItem.find('.js-service-edit'),
      $serviceItemEditTitle   = $serviceItemEdit.find('.js-service-edit-title'),
      $serviceItemEditDetails = $serviceItemEdit.find('.js-service-edit-details'),
      $serviceItemEditCancel  = $serviceItemEdit.find('.button-big-cancel'),
      $serviceItemEditDelete  = $serviceItemEdit.find('.button-big-delete')
    ;

    $serviceItemView.on('click', function(event) {
      event.preventDefault();

      // populate with current content
      $serviceItemEditTitle.val(serviceItemViewTitle);
      $serviceItemEditDetails.val(serviceItemViewDetails);

      // resize textarea
      $serviceItemEditDetails.expandingTextareaResize();

      // display
      $servicesItem.addClass('js-document-services-item-edit');
      $serviceItemView.hide();
      $serviceItemEdit.show();

    });

    $serviceItemEditCancel.on('click', function(event) {
      event.preventDefault();
      $servicesItem.removeClass('js-document-services-item-edit');
      $serviceItemView.show();
      $serviceItemEdit.hide();
    });

    $serviceItemEditDelete.on('click', function(event) {
      event.preventDefault();
      $servicesItem.slideUp();
    });

  });

  // new service

  $('#new-service').on('click', function(event) {
    event.preventDefault();
    $('#new-service-form').slideDown('slow');
    $(this).fadeOut('slow');
  });

  $('#new-service-form-cancel').on('click', function(event) {
    event.preventDefault();
    $('#new-service-form').slideUp();
    $('#new-service').fadeIn('slow');
  });



  // edit terms and conditions
  var
    $terms     = $('#terms'),
    $termsList = $terms.find('.terms-list')
  ;

  $termsList.each(function() {
    var
      $termsItem            = $(this),
      
      $termsItemView        = $termsItem.find('.js-terms-view'),
      $termsItemViewTitle   = $termsItemView.find('.terms-title'),
      $termsItemViewDetails = $termsItemView.find('.terms-details'),
      title                 = $termsItemViewTitle.text(),
      details               = $termsItemViewDetails.text(),
      $termsItemEdit        = $termsItem.find('.js-terms-edit'),
      $termsItemEditTitle   = $termsItemEdit.find('.js-terms-edit-title'),
      $termsItemEditDetails = $termsItemEdit.find('.js-terms-edit-details'),
      $termsItemEditCancel  = $termsItemEdit.find('.js-button-cancel'),
      $termsItemEditDelete  = $termsItemEdit.find('.js-button-delete'),
      $termsItemEditReset   = $termsItemEdit.find('.js-button-reset')
    ;

    var cleanupDetails = function () {
      var regex = /\s{2,}/g;
      details = $termsItemViewDetails.text();
      details = details.replace(regex, '\n- ');
      details = details.replace(/^\n/, '');
      details = details.replace(/\n- $/, '');
    }

    // Store default value
    cleanupDetails();
    $.data($termsItemViewTitle, 'default', title);
    $.data($termsItemViewDetails, 'default', details);

    // Edit
    $termsItemView.on('click', function(event) {
      event.preventDefault();

      // populate with current content
      cleanupDetails();
      $termsItemEditTitle.val(title);
      $termsItemEditDetails.val(details);

      // resize textarea
      $termsItemEditDetails.expandingTextareaResize();

      $termsItemView.hide();
      $termsItemEdit.show();
    });

    // Cancel
    $termsItemEditCancel.on('click', function(event) {
      event.preventDefault();

      $termsItemView.show();
      $termsItemEdit.hide();
    });

    // Delete
    $termsItemEditDelete.on('click', function(event) {
      event.preventDefault();
      $termsItem.slideUp();
    });

    // Reset
    $termsItemEditReset.on('click', function(event) {
      event.preventDefault();

      // retrieve default content
      title   = $.data($termsItemViewTitle, 'default');
      details = $.data($termsItemViewDetails, 'default');

      // replace content
      $termsItemEditTitle.val(title);
      $termsItemEditDetails.val(details);

      // resize textarea
      $termsItemEditDetails.expandingTextareaResize();
    });

  });

  // New terms
  var
    $newTerms = $('#new-terms'),
    $newTermsForm = $('#new-terms-form'),
    $newTermsFormCancel = $('#new-terms-form-cancel')
  ;

  $newTerms.on('click', function(event) {
    event.preventDefault();
    $newTermsForm.slideDown('slow');
    $newTerms.fadeOut('slow');
  });

  $newTermsFormCancel.on('click', function(event) {
    event.preventDefault();
    $newTermsForm.slideUp();
    $newTerms.fadeIn('slow');
  });

});