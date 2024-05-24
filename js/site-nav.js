$(function(){

	var rootElement = $(document.documentElement);
	var burger = $(".burger");

	//open/close site navigation
	$('.nav-trigger').on('click', function(event){
		event.preventDefault();
		toggleNav();
	});

	function toggleNav(){
		var isOpen = ( !rootElement.hasClass('menu-shown') ) ? true : false;
		
		rootElement.toggleClass('menu-shown', isOpen);
		burger.toggleClass('open', isOpen);
		if( !isOpen ) {
			$('.site-nav').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend',function(){
			});
		}
	}
});