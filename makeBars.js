//create or hide bar chart
module.exports = function(isCheckmark, resultNumbers, labels, colors) {
	var barChart;
	if (isCheckmark) {
		barChart = document.getElementById("bar_chart");
		barChart.classList.remove("hidden");

		if(window.barChart != null){
    		window.barChart.destroy();
		}

		window.barChart = new Chart(barChart,{
			type: 'bar',
			data: {
				labels: labels,
				datasets: [{
					data: resultNumbers,
					backgroundColor:colors
				}]
			},
			options: {
				legend: {display: false},
				responsive: true
			}
		});
	} else {
		var hideBars = document.getElementById("bar_chart");
		hideBars.classList.add("hidden");
	}
}
