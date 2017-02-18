window.buildChart = require('./buildChart.js');

//display result list
module.exports = function() {
	var output = "";
	var pollData = JSON.parse(localStorage.getItem('pollData'));
	var pollDataOptions = pollData.options;
	var pollDataVote = JSON.parse(localStorage.getItem('pollDataVote'));
	document.getElementById("poll_title").innerHTML = pollData.title;

	//get total number of votes
	var totalValue = 0;
	Object.keys(pollDataVote).map(function(key, index) {
		var value = pollDataVote[key];
		totalValue += value
	});

	//display results in html
	for (var i=0; i < pollDataOptions.length; i++) {
		var key = pollDataOptions[i];
		var value =  pollDataVote[key];
		if(typeof value == "undefined"){
			value = 0;
		}
		var percent = value/totalValue*100;
		percent = percent.toFixed(2);
		output +='<strong>'+key+'</strong><span class="pull-right">'+percent+'%('+value+')</span>';
		output +='<div class="progress">';
		output +='<div class="progress-bar progress-bar-danger" role="progressbar" aria-valuenow="'+percent+'" aria-valuemin="0" aria-valuemax="100" style="width: '+percent+'%;"></div>';
		output +='</div>';
	}

	document.getElementById("poll_list").innerHTML = output;

	//listens to changes in chart checkboxes
	document.getElementById("bar_chart_check").addEventListener("click", buildChart);
	document.getElementById("pie_chart_check").addEventListener("click", buildChart);

	//supplies arrays for charts if boxes are checked after initial results page load
	getSortedResults("default");
}
