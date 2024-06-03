gsap.registerPlugin(ScrollTrigger);

const heroHeading = new SplitType(".hero-heading.anim", { types: "lines, words" })
const displayHeading = new SplitType(".display-heading.anim")
const sectionHeading = new SplitType(".section-heading.anim", { types: "lines, words"}) 


gsap.from(heroHeading.words, {
  duration: 0.75,
  yPercent: 100,
  delay: 1,
  ease: "power4.out",
  stagger: 0.1,
  scrollTrigger: { 
    trigger: ".hero-heading.anim"
  }
});

gsap.from(displayHeading.chars, {
  delay: 0.5,
  duration: 1.5,
  yPercent: 100,
  ease: "power4.out",
  stagger: 0.03
});

gsap.from(sectionHeading.words, {
  duration: 0.6,
  yPercent: 100,
  delay: 0,
  ease: "power4.out",
  stagger: 0.1,
  scrollTrigger: { 
    trigger: ".section-heading.anim"
  }
});


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
    let splitted = new SplitType(this.target, {
      types: "words,chars",
		});
    
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

document.addEventListener("DOMContentLoaded", function () {
	new WordTransition("#heroWords", [
		"Hands-on",
    	"Dedicated",
    	"Technical",
		"Empathic",
		"Hard working",
		"Ambitious",
    	"Easy going",
	]);
});


const parallaxItems = gsap.utils.toArray("[data-parallax]", document);
const tl = gsap.timeline();

parallaxItems.forEach((item, index) => {
	if (index > 0) {
		tl.to(item, {
			scrollTrigger: {
				trigger: item,
				start: "top bottom",
				end: `+=${item.offsetHeight * index} top`,
				scrub: 0.5,
				onUpdate: (self) => self.next()?.refresh(),
				onLeave: () => ScrollTrigger.refresh(),
			},
			marginTop: `-${item.offsetHeight}`,
			ease: "power1.out"
		});
	}
});


const toggleNavbar = gsap.from('.site-header', { 
	yPercent: -100,
	paused: true,
	duration: 0.2,
	ease: "power1.out",
}).progress(1);

ScrollTrigger.create({
	start: "top+=10",
	end: "top+=20",
	onUpdate: (self) => {
		self.direction === -1 ? toggleNavbar.play() : toggleNavbar.reverse()
	}
});