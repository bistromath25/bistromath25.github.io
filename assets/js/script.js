var screenWidth = screen.width;
var screenHeight = screen.height;
const headshot = document.getElementById("headshot");
const aboutSection = document.getElementById("about");

window.addEventListener("scroll", function () {
    if (screenWidth < 768) {
        return;
    }
    const verticalScrollRatio = Math.abs(window.scrollY / screenHeight);
    const aboutSectionCirclePercent = Math.min(90, verticalScrollRatio * 60);
    aboutSection.style.clipPath = `circle(${aboutSectionCirclePercent}% at center)`;
    aboutSection.style.backgroundImage = "linear-gradient(var(--page-background), var(--light-blue), var(--page-background))";
});

window.addEventListener("resize", function () {
    screenWidth = screen.width;
    screenHeight = screen.height;
    if (screenWidth < 768) {
        aboutSection.style.clipPath = "none";
        aboutSection.style.backgroundImage = "none";
    }
});