// Change some component's color

$(function() {
	var colors = ["#FFBF00", "#FFAC1C", "#D27D2D", "#D27D2D"];
	setInterval(function() { 
		var bodybgarrayno = Math.floor(Math.random() * colors.length);
		var selectedcolor = colors[bodybgarrayno];
		//$("body").css("background",selectedcolor);
		document.getElementById("CHANGE_MY_COLOR").style.color = selectedcolor;
	}, 3000);
})