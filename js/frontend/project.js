jQuery(document).ready(function($) {
  var $documentsFilter = $('#list-documents-filter');

  if ($documentsFilter.length) {
    var
      $listItems   = $documentsFilter.parents('.block-shadow').find('.list-item'),
      $searchItems = $listItems.find('.list-item-main')
    ;
    listFilter($documentsFilter, $listItems, 'document', {
      $searchItems: $searchItems
    });
  }
});