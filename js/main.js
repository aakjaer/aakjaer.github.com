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


  var waypoints = $('.section--dark-gray').waypoint({
      handler: function(direction) {
          $('.nav-trigger').toggleClass('nav-trigger--invert', direction === 'down');
      },
      offset: 45
  });

  var waypoints = $('.section--dark-gray').waypoint({
      handler: function(direction) {
          $('.nav-trigger').toggleClass('nav-trigger--invert', direction === 'up');
      },
      offset: function (){
        return -this.element.clientHeight + 45
      }
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
