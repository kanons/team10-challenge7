//sort poll results
module.exports = function(){
	//get value of selected option
	var e = document.getElementById("sort_select");
	var value = e.options[e.selectedIndex].value;
	
	//hides charts, clears checkboxes when different sorting options are chosen
	document.getElementById("pie_chart").classList.add("hidden");
	document.getElementById("bar_chart").classList.add("hidden");
	
	//no checkmarks after choosing different sort option
	document.getElementById("pie_chart_check").checked = false;
	document.getElementById("bar_chart_check").checked = false;

	getSortedResults(value);
}
