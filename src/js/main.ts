import gsap, { Power4 } from "gsap";

// https://github.com/Rajacharles/GSAP-Fullscreen-Slider/blob/master/style.css
const result = matchMedia("mobile");
result.addEventListener("change", () => console.log("MatchMedia"));

const cols = 3;
const main = document.getElementById("main") as HTMLDivElement;
let parts = [];

let images = [
	new URL(
		"/src/assets/images/pexels-jonathan-petersson-399187.jpg",
		import.meta.url
	).href,
	new URL("/src/assets/images/pexels-pixabay-47343.jpg", import.meta.url)
		.href,
	new URL("/src/assets/images/pexels-pixabay-50713.jpg", import.meta.url)
		.href,
];

let current = 0;
let playing = false;

for (let i in images) {
	new Image().src = images[i];
}

for (let col = 0; col < cols; col++) {
	let part = document.createElement("div");
	part.className = "part [flex:1] z-10";
	let el = document.createElement("div");
	el.className =
		"section w-full h-full max-h-[900px] relative overflow-hidden";
	let img = document.createElement("img");
	img.className =
		"w-screen max-w-none h-full max-h-[900px] object-cover absolute inset-0 left-[--x] pointer-events-none";
	img.src = images[current];
	el.appendChild(img);
	part.style.setProperty("--x", -(100 / cols) * col + "vw");
	part.appendChild(el);
	main.appendChild(part);
	parts.push(part);
}

// Rollover UP & Down Mouse Wheel Navigation
let animOptions = {
	duration: 2.3,
	ease: Power4.easeInOut,
};
const height = main.getBoundingClientRect().height;

function go(dir) {
	if (!playing) {
		playing = true;
		if (current + dir < 0) current = images.length - 1;
		else if (current + dir >= images.length) current = 0;
		else current += dir;

		function up(part, next) {
			part.appendChild(next);
			gsap.to(part, { ...animOptions, y: -height }).then(function () {
				part.children[0].remove();
				gsap.to(part, { duration: 0, y: 0 });
			});
		}

		function down(part, next) {
			part.prepend(next);
			gsap.to(part, { duration: 0, y: -height });
			gsap.to(part, { ...animOptions, y: 0 }).then(function () {
				part.children[1].remove();
				playing = false;
			});
		}

		for (let p = 0; p < parts.length; p++) {
			let part = parts[p];
			let next = document.createElement("div");
			next.className =
				"section w-full h-full max-h-[900px] relative overflow-hidden";
			let img = document.createElement("img");
			img.className =
				"w-screen max-w-none h-full max-h-[900px] object-cover absolute inset-0 left-[--x] pointer-events-none";
			img.src = images[current];
			next.appendChild(img);

			if ((p - Math.max(0, dir)) % 2) {
				down(part, next);
			} else {
				up(part, next);
			}
		}
	}
}

//Press Up & Down Keyboard Arrow Event
window.addEventListener("keydown", (e) => {
	if (["ArrowDown", "ArrowRight"].includes(e.key)) {
		go(1);
	} else if (["ArrowUp", "ArrowLeft"].includes(e.key)) {
		go(-1);
	}
});

//Mouse Wheel Scroll Transition
let scrollTimeout;
function wheel(e) {
	clearTimeout(scrollTimeout);
	setTimeout(function () {
		if (e.deltaY < -40) {
			go(-1);
		} else if (e.deltaY >= 40) {
			go(1);
		}
	});
}
// window.addEventListener("mousewheel", wheel, false);
// window.addEventListener("wheel", wheel, false);
const nextButton = document.querySelector("button.next");
const prevButton = document.querySelector("button.prev");

nextButton.addEventListener("click", () => go(-1));
prevButton.addEventListener("click", () => go(1));

setInterval(() => {
	if (!disabledAutoPlay) go(-1);
}, 10000);
// Stop the autoplay when the mouse is over the carousel slide, allowing the user to navigate the carousel manually
let disabledAutoPlay = false;
const contentEl = document.querySelector("#content") as HTMLDivElement;
contentEl.addEventListener("mouseover", () => (disabledAutoPlay = true));
contentEl.addEventListener("mouseleave", () => (disabledAutoPlay = false));
