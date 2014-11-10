(function ($) {

  var cloneCSSProperties = [
    'lineHeight', 'textDecoration', 'letterSpacing',
    'fontSize', 'fontFamily', 'fontStyle', 
    'fontWeight', 'textTransform', 'textAlign', 
    'direction', 'wordSpacing', 'fontSizeAdjust', 
    'whiteSpace', 'wordWrap', 'padding'
  ];
  
  var textareaCSS = {
    overflow: "hidden",
    position: "absolute",
    top: "0",
    left: "0",
    height: "100%",
    minHeight: "90px",
    resize: "none"
  };
  
  var preCSS = {
    visibility: "hidden",
    display: "block",
    margin: 0
  };
  
  var containerCSS = {
    position: "relative",
    height: "100%",
    minHeight: "90px",
  };
  
  var initializedDocuments = { };
  
  // function resize(textarea) {  
  //   $(textarea).parent().find(".js-textarea-clone > span").text(textarea.value);
  // }

  $.fn.expandingTextareaResize = function() {
    return this.parent().find(".js-textarea-clone > span").text(this.val());
  }
  
  function initialize(document) {
    // Only need to initialize events once per document
    if (!initializedDocuments[document]) {
      initializedDocuments[document] = true;
      
      $(document).delegate(
        ".js-expanding-text textarea",
        "input onpropertychange",
        function () {
          // resize(this);
          $(this).expandingTextareaResize();
        }
      );
    }
  }

  $.fn.expandingTextarea = function () {

    return this.filter("textarea").each(function () {
      
      initialize(this.ownerDocument || document);
      
      var $textarea = $(this);

      $textarea.wrap('<div class="js-expanding-text"></div>');
      $textarea.after('<pre class="js-textarea-clone"><span></span><br /></pre>');

      var $container = $textarea.parent().css(containerCSS);
      var $pre = $container.find('.js-textarea-clone').css(preCSS);

      $textarea.css(textareaCSS);
    
      $.each(cloneCSSProperties, function (i, p) {
        $pre.css(p, $textarea.css(p));
      });
      
      // resize(this);
      // $(this).expandingTextareaResize();
    });
  };

  $.fn.expandingTextarea.initialSelector = ".js-expanding-textarea";

  $(function () {
    $($.fn.expandingTextarea.initialSelector).expandingTextarea();
  });

})(jQuery);
