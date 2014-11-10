jQuery(document).ready(function($) {
  var $clientsFilter = $('#clients-list-filter');
  if ($clientsFilter.length) {
    var
      $listItems   = $('.content-main').find('> .block-client'),
      $search      = $('#clients-list-search'),
      $searchItems = $listItems.find('> .block-hd').find('> .block-hd-main')
    ;

    listFilter($clientsFilter, $listItems, 'client-type', {
      transition:   'fast',
      wrapper:      true,
      $searchInput: $search,
      $searchItems: $searchItems
    });
  }
});