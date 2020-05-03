$(function(){

  // Page preloading animation
  $('.animsition').animsition({
      inDuration: 800,
      outDuration: 400,
      linkElement: '.switch-page',
      timeout: false,
      timeoutCountdown: 5000,
      onLoadEvent: true,
      transition: function(url){ window.location.href = url; }
  });

  // lightbox
  $(".fancybox").fancybox({
    helpers: {
        overlay: {
          locked: false
        }
      }
  });

});
