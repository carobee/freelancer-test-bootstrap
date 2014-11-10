(function($) {

  // Swith between new client form and existing client select
  $.fn.switchClientInput = function() {

    if (!this.length) { return this; }

    this.each(function() {
      var
        $this = $(this),
        $existingClient = $this.find('#newProject-selectClient-existing'),
        $existingClientTrigger = $existingClient.find('a').first(),

        $newClient = $this.find("#newProject-selectClient-new"),
        $newClientTrigger = $newClient.find('a').first(),

        $firstContact = $this.find('#newProject-selectContact-newClient'),
        $firstContactTrigger = $firstContact.find('a').first(),

        $existingContact = $this.find('#newProject-selectContact-existing'),
        $existingContactTrigger = $existingContact.find('a').first(),

        $newContact = $this.find('#newProject-selectContact-new'),
        $newContactToggle = $newContact.find('fieldset').first(),
        $newContactTrigger = $newContactToggle.find('a').first(),
        newContactTriggerTxt = $newContactTrigger.text(),
        newContactTriggerFirst = false
      ;

      var switchClientInput = function(newClient) {
        $existingClient.slideToggle();
        $newClient.slideToggle();
        
        $newContact.slideUp();

        if (newClient) {
          $existingContact.slideUp();
          $firstContact.slideDown();
          $newContactTrigger.text('Ignorer');
          newContactTriggerFirst = true;
        } else {
          $existingContact.slideDown();
          $firstContact.slideUp();
          $newContactTrigger.text(newContactTriggerTxt);
          newContactTriggerFirst = false;
        }
        
      }

      var switchContactInput = function(newContactTriggerFirst) {
        if (newContactTriggerFirst) {
          $newContact.slideToggle();
          $firstContact.slideToggle();
        } else {
          $existingContact.slideToggle();
          $newContact.slideToggle();
        }
      }

      // switch to new client
      $existingClientTrigger.on('click', function(event) {
        event.preventDefault();
        
        switchClientInput('newClient');
      });

      // switch to existing clients
      $newClientTrigger.on('click', function(event) {
        event.preventDefault();
        
        switchClientInput();
      });

      // switch to first new contact
      $firstContactTrigger.on('click', function(event) {
        event.preventDefault();

        $firstContact.slideToggle();
        $newContact.slideToggle();
      });

      // switch to new contact
      $existingContactTrigger.on('click', function(event) {
        event.preventDefault();
        
        switchContactInput(newContactTriggerFirst);
      });

      // switch to existing contacts
      $newContactTrigger.on('click', function(event) {
        event.preventDefault();
        
        switchContactInput(newContactTriggerFirst);
      });

    });

    return this;
  };

})(jQuery);

jQuery(document).ready(function($) {
  $('#newProject-SelectClient').switchClientInput();
});