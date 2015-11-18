$(function(){

    var waypoints = $('.animate').waypoint({
        handler: function(direction) {
            $(this.element).addClass('animating').removeClass('animate');
        },
        offset: '90%'
  });
});
