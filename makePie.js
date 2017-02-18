//create or hide pie chart
module.exports = function(isCheckmark, resultNumbers, labels, colors) {
	var pieChart;
	if (isCheckmark) {
		pieChart = document.getElementById("pie_chart");
		pieChart.classList.remove("hidden");

		if(window.pieChart != null) {
    		window.pieChart.destroy();
		}

		window.pieChart = new Chart(pieChart,{
			type: 'pie',
			data: {
				labels: labels,
				datasets: [{
					data: resultNumbers,
					backgroundColor:colors
				}]
			},
			options: {
				responsive: true
			}
		});
	} else {
		var hidePie = document.getElementById("pie_chart");
		hidePie.classList.add("hidden");
	}
}
