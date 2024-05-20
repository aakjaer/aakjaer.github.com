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
  delay: 1,
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
        duration: 0.4,
				opacity: 1,
        yPercent: 0,
        ease: "circ",
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
		"Hard working",
    "Easy going"
	]);
});


