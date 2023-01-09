window.onscroll = function () { scrollFunction() };
function scrollFunction() {
    if (document.body.scrollTop > screen.height * 0.8 || document.documentElement.scrollTop > screen.height * 0.8) {
        document.getElementById("Header").style.padding = "0px";
        document.getElementById("Header").style.fontSize = "0.8em";
        document.getElementById("Header").style.opacity = "0.9";
		document.getElementById("About").style.height = "9vh";
    } else {
        document.getElementById("Header").style.padding = "10px";
        document.getElementById("Header").style.fontSize = "1em";
        document.getElementById("Header").style.opacity = "0.4";
		document.getElementById("About").style.height = "3vh";
    }
}