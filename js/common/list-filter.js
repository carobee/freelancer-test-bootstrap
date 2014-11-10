/*
 * $listSearch: the block containing the search input
 * $listItems: the items to filter
 * $searchItems: the content to match
 */

function listSearch ($listSearch, $listItems, $searchItems) {
  var
    $searchInput  = ($listSearch.is('input')) ? $listSearch : $listSearch.find('> input'),
    $currentItems = $listItems.filter('.js-list-filter-active'),
    currentSearch
  ;

  if ($currentItems.length === 0) {
    $currentItems = $listItems.addClass('js-list-filter-active');
  }
  $searchItems.addClass('js-list-search-item');

  $searchInput.on('keyup', function(event) {
    event.preventDefault();

    // Retrieve current search value
    currentSearch = $(this).val().toLowerCase();

    // Limit search to active elements
    $currentItems = $listItems.filter('.js-list-filter-active');

    if (currentSearch.length > 0) {
      $searchInput.addClass('js-list-filter-active');
      $currentItems
        .show()
        .filter(function () {
          return $(this).find('.js-list-search-item').text().toLowerCase().indexOf(currentSearch) === -1;
        })
        .hide()
      ;
    } else {
      $searchInput.removeClass('js-list-filter-active');
      $currentItems.show();
    }
  });
}

/*
 * $listFilters: the block containing the filters triggers
 * $listItems:   the items to filter
 * dataType:     the data attribute used for the filters.
 * transition:   optional, if set the transitions are animated
 * wrapper:      optional, if true, wrap item into a block to avoid jumps on transition
 * count:        optional, if set display the number of results for each filter
 * $searchItems: optional, jquery object, define the text to be searched
 * $searchInput: optional, allows to reset the search filter
 *
 * Multiple values for the data attribute must be separated with spaces (ex: data-document="draft estimate")
 */

function listFilter ($listFilters, $listItems, dataType, options) {
  var defaultOptions = {
    transition:   false, // slow, fast, 500
    wrapper:      false, // true
    count:        false, // append, prepend, js-list-filter-count
    $searchItems: false, // jquery object (search content)
    $searchInput: $listFilters // jquery object (search input)
  };
  options = $.extend({}, defaultOptions, options);

  var
    $filters  = $listFilters.find('a'),
    hasSearch = options.$searchItems.length,
    activeFilter
  ;

  // If needed wraps items in a container to avoid jumps on animation (margins)
  if (options.wrapper) {
    $listItems.each(function() {
      var thisData = $(this).data(dataType);
      $(this).wrap('<div class="js-list-filter-item-wrapper" data-'+ dataType +'="'+ thisData +'"></div>');
    });

    // select all project’s wrapper
    $listItems = $listItems.parents('.js-list-filter-item-wrapper');
  }

  // add class to all items
  $listItems.addClass('js-list-filter-active');

  // Count each filter results
  if (options.count) {
    $filters.each(function() {
      activeFilter = this.hash.split('#')[1];

      var n;
      if (activeFilter === 'all') {
        n = $listItems.length;
      } else {
        n = $listItems.filter('[data-'+ dataType +'~='+ activeFilter +']').length;
      }

      switch (options.count) {
        case 'prepend':
          $(this).prepend('<span>'+ n +'</span>');
          break;
        case 'append':
          $(this).append('<span>'+ n +'</span>');
          break;
        default:
          $(this).find(options.count).text(n);
          break;
      }
    });
  }

  // clear search if needed
  if (hasSearch) {
    listSearch(options.$searchInput, $listItems, options.$searchItems);
  }

  // filter items
  $filters.on('click', function(event) {
    event.preventDefault();

    // clear search if needed
    if (hasSearch) {
      options.$searchInput.val('').removeClass('js-list-filter-active');
    }

    // retrieves hash from link
    activeFilter = this.hash.split('#')[1];

    // tests if the filter is already active
    if (!$(this).hasClass('js-list-filter-active')) {

      // changes the active filter
      $filters.removeClass('js-list-filter-active');
      $(this).addClass('js-list-filter-active');

      if (activeFilter !== 'all') {
        if (options.transition) {
          // hides everything that is not the current filter
          $listItems.not('[data-'+ dataType +'~='+ activeFilter +']')
            .stop(true, true)
            .animate({opacity:0},{
              queue       : false,
              duration    : options.transition,
              complete    : function() {
                $(this).slideUp(options.transition).removeClass('js-list-filter-active');
              }
            })
          ;

          // show everything that is
          $listItems.filter('[data-'+ dataType +'~='+ activeFilter +']')
            .stop(true, true)
            .css('opacity', '1')
            .slideDown(options.transition)
            .fadeIn({ duration: options.transition, queue: false })
          ;

        } else {
          // hides everything that is not the current filter
          $listItems.not('[data-'+ dataType +'~='+ activeFilter +']')
            .hide()
            .removeClass('js-list-filter-active')
          ;

          // show everything that is
          $listItems.filter('[data-'+ dataType +'~='+ activeFilter +']')
            .show()
            .addClass('js-list-filter-active')
          ;


        }
      } else {
        // shows all project
        if (options.transition) {
          $listItems.not('.list-filter-active')
            .stop(true, true)
            .css('opacity', '1')
            .slideDown(options.transition)
            .fadeIn({ duration: options.transition, queue: false })
            .addClass('js-list-filter-active')
          ;
        } else {
          // shows all project
          $listItems.not('.list-filter-active')
            .show()
            .addClass('js-list-filter-active')
          ;
        }
      }
    }

    return $listItems;
  });

}