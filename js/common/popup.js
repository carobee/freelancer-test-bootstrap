var popups;

popups = function () {

  // Setup variables
  var
    $body   = $('body:first'),
    $popups = $('#popups'),
    // $forms  = $popups.find('form'),
    $overlay,
    $activePopup
  ;

  var init = function() {
    $popups.wrapInner('<div class="js-popup-overlay" id="popup-overlay"></div>');
    $overlay = $popups.find('#popup-overlay');

    openPopups();
    closePopups();
  }

  var openPopups = function() {
    $('.js-popup').each(function() {
      $(this).on('click', function(event) {
        event.preventDefault();
        $activePopup = $(this.hash).addClass('popup-active');
        // var height = $activePopup.outerHeight();
        // console.log('height',height);
        $body.addClass('popup-active');
        // $overlay.css('min-height', height).addClass('popup-active');
        $overlay.addClass('popup-active');

        setFormFocus($activePopup);
        popupTabs($activePopup);
        enableSubmit($activePopup);
      });
    });
  }

  var closePopups = function() {
    var $cancelPopup = $popups.find('.js-popup-close')

    $overlay.on('click', function(event) {
      if (!$(event.target).parents('.popup').length) {
        $body.removeClass('popup-active');
        $overlay.removeClass('popup-active');
        $activePopup.removeClass('popup-active');
      }
    });

    $cancelPopup.on('click', function(event) {
      event.preventDefault();
      $body.removeClass('popup-active');
      $overlay.removeClass('popup-active');
      $activePopup.removeClass('popup-active');
    });
  }

  var popupTabs = function($activePopup) {
    var
      $tabsList = $activePopup.find('.js-popup-tabs'),
      $tabs     = $tabsList.find('li'),
      $content  = $activePopup.find('.js-popup-tab-content')
    ;

    function selectTab() {
      var $checkedInput, $currentTab, inputValue

      $checkedInput = $tabs.find('input:checked');
      $currentTab   = $checkedInput.parents('li');
      inputValue    = $checkedInput.val();

      $tabs.removeClass('checked');
      $currentTab.addClass('checked');
      
      $content.hide();
      $content.filter('#popup-tab-content-' + inputValue).show();
    }

    // init tabs
    selectTab();

    $tabs.on('click', function() {
      selectTab();
    })

  }

  var enableSubmit = function($activePopup) {
    var
      $form   = $activePopup.find('form'),
      $submit = $form.find('.form-submit'),
      $button = $submit.find('button').first()
    ;
    if ($button.attr('disabled')) {
      $form.on('change', function() {
        $button.removeAttr('disabled');
      });
    }
    return;
  }

  // initial setup
  init();
}

jQuery(document).ready(function() {
  return new popups();
});