$(function(){

  const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
  const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))


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

// Wrap every letter in a span
var textWrapper = document.querySelector('.hest');
textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");

anime.timeline({loop: true})
  .add({
    targets: '.hest .letter',
    duration: 2000,
    easing: 'easeOutExpo',
    opacity: 1,
    rotateX: [110,0],
    // delay: function(el, i) { return 100+index*50; },
    // translateY: [-50,0],
    // translateZ: 0,
    // opacity: [0,1],
    // easing: "easeOutExpo",
    // duration: 1500,
    delay: (el, i) => 100 + i * 50
  }).add({
      duration: 4000,
      // delay: function(el, index) { return index*50; },
      delay: (el, i) => i * 50,
      easing: 'easeOutExpo',
      opacity: 0,
      rotateX: -110    
  });

  var encEmail = "ZGFuaWVsLmFha2phZXJAZ21haWwuY29t";
  var email = "".concat(atob(encEmail));
  
  if ($('#encryptedEmail').html() == ""){
    $('#encryptedEmail').html(email);
  } 

  $("#encryptedEmail").attr("href", "mailto: " + email);
    
});
