jQuery(document).ready(function($){

	var $rootElement = $(document.documentElement);

	//open/close site navigation
	$('.nav-trigger').on('click', function(event){
		event.preventDefault();
		toggleNav();
	});

	function toggleNav(){
		var navIsVisible = ( !$rootElement.hasClass('menu-shown') ) ? true : false;
		$rootElement.toggleClass('menu-shown', navIsVisible);
		if( !navIsVisible ) {
			$('.site-nav').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend',function(){
			});
		}
	}
});
