jQuery(document).ready(function($) {
  var $projectsFilter = $('#client-projects-filter');
  if ($projectsFilter.length) {
    var
      $listItems   = $projectsFilter.parents('.block-shadow').find('.list-item'),
      $searchItems = $listItems.find('.list-item-main').find('> strong')
    ;
    listFilter($projectsFilter, $listItems, 'project-state');
    listSearch($projectsFilter, $listItems, $searchItems);
  }
});