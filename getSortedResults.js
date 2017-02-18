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
