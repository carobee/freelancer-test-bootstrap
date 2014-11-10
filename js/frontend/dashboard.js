jQuery(document).ready(function($) {
  // filter active projects by clients
  var $dashboardCurrentClients = $('#aside-current-clients');
  if ($dashboardCurrentClients.length) {
    var $dashboardProjects = $('.content-main > .block-project');

    listFilter($dashboardCurrentClients, $dashboardProjects, 'client', {
      transition: 'fast',
      wrapper:    true,
      count:      'prepend'
    });
  }

  
});