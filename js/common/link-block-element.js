jQuery(document).ready(function($) {

	$('.js-link-block-element').on("click", function() {
		window.location = this.getElementsByTagName('a')[0];
	});

});