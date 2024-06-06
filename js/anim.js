// gsap.config({
//   nullTargetWarn: false,
//   trialWarn: false
// });
gsap.registerPlugin(ScrollTrigger);

let scroll;

// Let's kick things off
initPageTransitions();


function initPageTransitions() {

	// Reset scroll on page next
	history.scrollRestoration = "manual";

	barba.hooks.afterEnter(() => {
		window.scrollTo(0, 0);
		ScrollTrigger.refresh();
	});

	barba.hooks.leave(() => {
		initBasicFunctions();
	});


	barba.init({
		sync: true,
		transitions: [{
			name: 'default',
			async beforeEnter(data) {
				ScrollTrigger.getAll().forEach(t => t.kill());
				initScroll();
			},

			async once(data){
				initScroll();
				initNavbar();
				contentAnimation();
			},

			async enter(data) {
				initNavbar();
				contentAnimation();
			},
	
			async leave(data) {
				const done = this.async();
				initNavbar();	
				pageTransition();
				await delay(500);
				done();
			},
	
		},{
			name: "to-home",
			from: {},
			to: {
				namespace: ['page-home']
			},
			once(data) {
				initNavbar();
				initFirstPage();
			}
		}]
	});

}

function initFirstPage(){
	let heroHeading = new SplitType(".hero-heading.anim", { types: "lines, words" });
	let tl = gsap.timeline();

	tl.from('.transition-overlay', {
		duration: 0.8,
		scaleY: 1,
		transformOrigin: 'top',
		ease: "Expo.easeInOut",
		clearProps: "all"
	})

	.from(heroHeading.words, {
		duration: 0.75,
		yPercent: 100,
		ease: "power4.out",
		stagger: 0.15	
	}, '=-0.4')

	.from($('.hero-lead'), {
		yPercent: 100,
		opacity: 0,
		ease: "Expo.easeOut",
		duration: 2,
		clearProps: "all" 
	}, '< 0.2')

	.from('.hero-actions', {
		opacity: 0,
		yPercent: 100,
		duration: 1,
	}, '< 0.4');

	// Start word carousel
	new WordTransition("#heroWords", [
		"Hands-on",
		"Dedicated",
		"Technical",
		"Hard working",
		"Ambitious",
		"Easy going",
	]);
}

function initScroll(){}

function pageTransition() {
	let tl = gsap.timeline();

	tl.to('.transition-overlay', {
		duration: 0.8,
		scaleY: 1,
		transformOrigin: 'bottom',
		ease: "power4.inOut",
	})

	.call(toggleMobileMenu )

	.to('.transition-overlay', {
		duration: 0.8,
		scaleY: 0,
		transformOrigin: 'top',
		ease: 'power4.inOut',
		delay: 0.2
	});
}

function toggleMobileMenu(){
	let isOpen = ( !$(document.documentElement).hasClass('menu-shown') ) ? true : false;

	$('.burger').toggleClass('open', isOpen);
	$(document.documentElement).toggleClass('menu-shown', isOpen);
}

function delay(n){
	n = n || 2000;
	return new Promise((done) => {
		setTimeout(() => {
			done();
		}, n)
	})
}

function contentAnimation (){
	
	let heroHeading = new SplitType(".hero-heading.anim", { types: "lines, words" });
	let displayHeading = new SplitType(".display-heading.anim");
	let sectionHeading = new SplitType(".section-heading.anim", { types: "lines, words"}) ;
	let tl = gsap.timeline();

	tl.from(heroHeading.words, {
		delay: 0.5,
		duration: 0.75,
		yPercent: 100,
		ease: "power4.out",
		stagger: 0.1	
	})
	
	.from(displayHeading.chars, {
		delay: 0.5,
		duration: 1.5,
		yPercent: 100,
		ease: "power4.out",
		stagger: 0.03
	})

	.from(sectionHeading.words, {
		delay: 0.5,
		duration: 0.6,
		yPercent: 100,
		ease: "power4.out",
		stagger: 0.1,
		scrollTrigger: { 
			trigger: ".section-heading.anim"
		}
	});

	// if ($(window).width() >= 767) { 
    // 	tl.set(".main-content", {
    //   		y: "50vh"
    // 	});
  	// } else {
    // 	tl.set(".main-content", {
    //   		y: "10vh"
    // 	});
  	// }

	// tl.to(".main-content", {
	// 	duration: 1.5,
	// 	// y: "0vh",
	// 	stagger: .07,
	// 	ease: "Expo.easeOut",
	// 	clearProps: true
	// },"=-.8");


}


class WordTransition {
	currentIndex = 0;

	constructor(target, words) {

		this.target = typeof target === "string" ? document.querySelector(target) : target;
		words.unshift(this.target.textContent);
		this.nextWord = this.nextWord.bind(this);
		this.words = words;
		this.animate();
	}

	nextWord() {
		SplitType.revert(this.target); // needed to fix splitType issue
		this.currentIndex = this.currentIndex >= this.words.length - 1 ? 0 : this.currentIndex + 1;
		this.target.innerHTML = this.words[this.currentIndex];
		this.animate();
	}

	animate() {
    	let splitted = new SplitType(this.target, { types: "words, chars" });
		let chars = splitted.chars;
		let textanimation = gsap.timeline({
			repeat: 1,
			yoyo: true,
			repeatDelay: 3
		});
    
		textanimation.fromTo(
			chars,
			{
				opacity: 0,
        		yPercent: 100,
			},
			{
        		duration: 0.3,
				opacity: 1,
				yPercent: 0,
				ease: "circ",
				stagger: 0.02,
				onReverseComplete: this.nextWord
			}
		);
	}
}


const parallaxItems = gsap.utils.toArray("[data-parallax]", document);
const tl = gsap.timeline();

parallaxItems.forEach((item, index) => {
	if (index > 0) {
		tl.to(item, {
			scrollTrigger: {
				trigger: item,
				start: "top bottom",
				end: `+=${item.offsetHeight * index} top`,
				scrub: 1,
				onUpdate: (self) => self.next()?.refresh(),
				onLeave: () => ScrollTrigger.refresh(),
			},
			marginTop: `-${item.offsetHeight}`,
			ease: "power1.out"
		});
	}
});


function initNavbar () {

	if ($(window).width() >= 767) { 
		const toggleNavbar = gsap.from('.site-header', { 
			yPercent: -100,
			opacity: 0,
			paused: true,
			duration: 0.3,
			ease: "power1.out",
		}).progress(1);
		
		ScrollTrigger.create({
			start: "top+=10",
			end: "top+=10",
			onUpdate: (self) => {
				self.direction === -1 ? toggleNavbar.play() : toggleNavbar.reverse()
			}
		});
	}
}



const fadeInElm = gsap.utils.toArray('.fade-in');

fadeInElm.forEach((box, i) => {
  const anim = gsap.fromTo(box, {autoAlpha: 0, y: 50}, {duration: 1, autoAlpha: 1, y: 0, clearProps: all});
  ScrollTrigger.create({
    trigger: box,
    animation: anim,
    toggleActions: 'play none none none'
  });
});



$('[data-scroll-animation="fade-in"]').each(function () {
	let triggerElement = $(this);
	let targetElement = $(this);
	let tl = gsap.timeline({
		scrollTrigger: {
			trigger: triggerElement,
			start: "0% 95%",
			end: "100% 0%",
			toggleActions: "play none none none"
		}
	});

	gsap.set(targetElement, {
		y: "2em",
		rotate: 0.001,
		opacity: 0,
	});

	tl.to(targetElement, {
		y: "0em",
		rotate: 0.001,
		opacity: 1,
		ease: "Expo.easeOut",
		duration: 2,
		clearProps: "all"
	});

});