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

  var swiper = new Swiper(".quick-gallery", {
    effect: "fade",
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    pagination: {
        el: ".swiper-pagination",
    } 
  });

    var encEmail = "ZGFuaWVsLmFha2phZXJAZ21haWwuY29t";
    var email = "".concat(atob(encEmail));
    
    if ($('#encryptedEmail').html() == ""){
      $('#encryptedEmail').html(email);
    } 

    $("#encryptedEmail").attr("href", "mailto: " + email);
    
});
