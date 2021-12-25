jQuery(document).ready(function($){

	var $rootElement = $(document.documentElement);

	//open/close site navigation
	$('.nav-trigger').on('click', function(event){
		event.preventDefault();
		toggleNav();
	});

	// burger menu
	var $hamburger = $(".hamburger");
	$hamburger.on("click", function(e) {
		$hamburger.toggleClass("is-active");
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


// <script>
//   // Look for .hamburger
//   var hamburger = document.querySelector(".hamburger");
//   // On click
//   hamburger.addEventListener("click", function() {
//     // Toggle class "is-active"
//     hamburger.classList.toggle("is-active");
//     // Do something else, like open/close menu
//   });
// </script>