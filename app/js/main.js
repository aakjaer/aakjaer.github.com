$(function(){

    // $('.hero-heading').fitText(1);

    var waypoints = $('.animate').waypoint({
        handler: function(direction) {
            $(this.element).addClass('animating').removeClass('animate');
        },
        offset: '100%'
  });
});
