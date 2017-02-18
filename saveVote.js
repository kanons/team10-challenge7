//save vote
module.exports = function() {

	//load poll data from localStorage
	var pollDataVote = JSON.parse(localStorage.getItem('pollDataVote'));

	//check if data exists, initialize if not
	if(typeof pollDataVote != "object" || pollDataVote == null){
		var pollDataVote = {};
	}

	//save user vote
	var voteOptions = document.getElementsByClassName("vote-option");
	for (var i=0; i < voteOptions.length; i++) {
		var val  = voteOptions[i].value;
		var checked = voteOptions[i].checked;
		if(voteOptions[i].checked){
			if(Object.keys(pollDataVote).length > 0 && pollDataVote[val]){
				pollDataVote[val] = pollDataVote[val]+1;
			}else{
				pollDataVote[val] = 1;
			}
		}
	};

	//save the data to localStorage
	localStorage.setItem('pollDataVote', JSON.stringify(pollDataVote));
	location.href = "result.html";
}
