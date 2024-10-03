var screenWidth = screen.width;
var screenHeight = screen.height;
const $aboutSection = document.querySelector("#about");
const $cards = document.querySelectorAll(".project-card");

window.addEventListener("scroll", function () {
    if (screenWidth < 768) {
        return;
    }
    const verticalScrollRatio = Math.abs(window.scrollY / screenHeight);
    const aboutSectionCirclePercent = Math.min(90, verticalScrollRatio * 60);
    $aboutSection.style.clipPath = `circle(${aboutSectionCirclePercent}% at center)`;

    $cards.forEach(($card, idx) => {
        const s = Math.min(1, 1.1 - window.scrollY / screenHeight / (20 + idx));
        $card.style.top = `calc(${8 + idx / 2}vw)`;
        $card.style.transform = `scale(calc(${s}))`;
    })
});

window.addEventListener("resize", function () {
    screenWidth = screen.width;
    screenHeight = screen.height;
    if (screenWidth < 768) {
        $aboutSection.style.clipPath = "fill-box";
        $aboutSection.style.backgroundImage = "none";
    }
});