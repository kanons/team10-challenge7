window.makePie = require('./makePie.js');
window.makeBars = require('./makeBars.js');

//builds arrays needed for charts, hides charts if both checkboxes unchecked
module.exports = function() {
	var pieCheck = document.getElementById("pie_chart_check").checked;
	var barCheck = document.getElementById("bar_chart_check").checked;

	if (pieCheck || barCheck) {
		var resultNumbers = [], labels = [], colors = [];
		var r, g, b, color;

		//fill arrays
		for (var i = 0; i < SORTED_ARRAY.length; i++) {
				resultNumbers.push(SORTED_ARRAY[i].value);
				labels.push(SORTED_ARRAY[i].key)

				//randomly generate colors for charts
				r = Math.floor(Math.random() * 256);
				g = Math.floor(Math.random() * 256);
				b = Math.floor(Math.random() * 256);
				color = 'rgb(' + r + ',' + g + ',' + b + ')';
				colors.push(color);
		}

		makePie(pieCheck, resultNumbers, labels, colors);
		makeBars(barCheck, resultNumbers, labels, colors);
	} else {
		//hide both charts if both boxes aren't checked
		var pieChart = document.getElementById("pie_chart");
		var barChart = document.getElementById("bar_chart");
		pieChart.classList.add("hidden");
		barChart.classList.add("hidden");
	}
}
