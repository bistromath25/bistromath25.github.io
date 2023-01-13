var page = $("#page");

function scrollToAbout() {
	var dest = $("#About");
	var pos = dest.offset().top - page.offset().top + page.scrollTop();
	
	page.animate({
		scrollTop: pos
	});
}