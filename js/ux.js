jQuery(document).ready(function($) {

  
  if(location.pathname != "/") {
    $('#nav a[href^="/docs/' + location.pathname.split("/")[2] + '"]').addClass('docsNavItem-isActive');
  } else {
    $('#nav a:eq(0)').addClass('docsNavItem-isActive');
  } 
  

  var
    $options      = $('.main-content').find('> div[id]'),
    $select       = $('#jump-to-id'),
    prevOptgroup  = '',
    thisOptgroup  = ''
  ;

  $options.each(function(){
    thisOptgroup = $(this).data('group');
    thisOptgroup = thisOptgroup || '';
    
    if (prevOptgroup !== thisOptgroup) {
      $select.append('</optgroup>');
      $select.append('<optgroup label="'+ thisOptgroup +'">');
    }

    var client = $(this).hasClass('client') ? ' | client':'';

    $select.append('<option value="#'+ this.id +'">'+ $(this).find('h2').text()+ client +'</option>');
    prevOptgroup = thisOptgroup;
  });

  $select.append('</optgroup>');

  $select.on('change', function() {
    var val = this.value;
    if (val !== "") {
      window.location = val;
    }
  });

});