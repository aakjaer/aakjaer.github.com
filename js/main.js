$(function(){

//animsition
$('.animsition').animsition({
    inDuration: 800,
    outDuration: 400,
    linkElement: '.switch-page',
    timeout: false,
    timeoutCountdown: 5000,
    onLoadEvent: true,
    transition: function(url){ window.location.href = url; }
  });


  // scroll related animations
  var waypoints = $('.animate').waypoint({
      handler: function(direction) {
          $(this.element).addClass('animating').removeClass('animate');
      },
      offset: '90%'
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
