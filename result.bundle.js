/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	window.getResultList = __webpack_require__(4);
	window.sortBy = __webpack_require__(8);
	window.getSortedResults = __webpack_require__(9);

	window.onload = function() {
		getResultList();
	}


/***/ },
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	window.buildChart = __webpack_require__(5);

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


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	window.makePie = __webpack_require__(6);
	window.makeBars = __webpack_require__(7);

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


/***/ },
/* 6 */
/***/ function(module, exports) {

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


/***/ },
/* 7 */
/***/ function(module, exports) {

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


/***/ },
/* 8 */
/***/ function(module, exports) {

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


/***/ },
/* 9 */
/***/ function(module, exports) {

	//sort results by number of votes, default, or alphabetical order
	module.exports = function(sortOption) {
		var output = "", pollDataVoteArr = [];
		var pollData = JSON.parse(localStorage.getItem('pollData')); 
		var pollDataOptions = pollData.options; 
		var pollDataVote = JSON.parse(localStorage.getItem('pollDataVote'));
		document.getElementById("poll_title").innerHTML = pollData.title;
		//if key is undefined, vote value is 0
		//push data into array for sorting
		for (var i=0; i < pollDataOptions.length; i++) {
			var key = pollDataOptions[i], value =  pollDataVote[key];
			if(typeof value == "undefined") {
				pollDataVote[key] = 0;
			}
			pollDataVoteArr.push({key: key, value: pollDataVote[key]});
		}

		//sort array based on option
		pollDataVoteArr.sort(function(a, b) {
			if(sortOption === 'ascending') {
				if(a.value < b.value) {
					return -1;
				}else if(a.value > b.value) {
					return 1;
				}
			}else if(sortOption === 'descending') {
				if(a.value > b.value) {
					return -1;
				}else if(a.value < b.value) {
					return 1;
				}
			}else if(sortOption == 'alphabetical') {
				if (a.key < b.key) {
					return -1;
				}else if(a.key > b.key) {
					return 1;
				}
			}
			return 0;
		});

		SORTED_ARRAY = pollDataVoteArr;

		//get total number of votes
		var totalValue = 0;
		Object.keys(pollDataVote).map(function(key, index) {
			var value = pollDataVote[key];
			totalValue += value 
		});
		
		//display results in html
		for (var i=0; i < pollDataVoteArr.length; i++) {
			var key = pollDataVoteArr[i].key;
			var value =  pollDataVoteArr[i].value;
			var percent = value/totalValue*100;
			percent = percent.toFixed(2);
			output +='<strong>'+key+'</strong><span class="pull-right">'+percent+'%('+value+')</span>';
			output +='<div class="progress">';
			output +='<div class="progress-bar progress-bar-danger" role="progressbar" aria-valuenow="'+percent+'" aria-valuemin="0" aria-valuemax="100" style="width: '+percent+'%;"></div>';
			output +='</div>';
		} 
		document.getElementById("poll_list").innerHTML = output;
	}


/***/ },
/* 7 */
/***/ function(module, exports) {

	//builds arrays needed for charts, hides charts if both checkboxes unchecked
	module.exports = function() {
		var pieCheck = document.getElementById("pie_chart_check").checked;
		var barCheck = document.getElementById("bar_chart_check").checked;

		if (pieCheck || barCheck) {
			var resultNumbers = [], labels = [], colors = [];
			var r, g, b, color;
	console.log('checking');
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


/***/ },
/* 8 */
/***/ function(module, exports) {

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


/***/ },
/* 9 */
/***/ function(module, exports) {

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
/***/ }
/******/ ]);