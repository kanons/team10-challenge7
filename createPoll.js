//create poll
module.exports = function() {
	var title = document.getElementById("title").value

	//check if title was entered
	if(title == ""){
		alert("Enter your question");
		document.getElementById("title").focus();
		return;
	}


	//check if poll option was entered
	if(document.getElementsByClassName("vote-option")[0].value == ""){
		alert("Enter poll option");
		document.getElementsByClassName("vote-option")[0].focus();
		return;
	}

	//initilaize data that will be stored to localStorage
	var poll = {
		title :  document.getElementById("title").value,
		options : []
	};

	//add poll option to an array
	var voteOptions = document.getElementsByClassName("vote-option");
	for (var i=0; i < voteOptions.length; i++) {
		var val  = voteOptions[i].value;
		if(val){
			poll.options.push(val);
		}
	};

	//change the data to json and save it to localStorage
	var jsonData = JSON.stringify(poll);
	localStorage.setItem('pollData', jsonData);
	location.href = "vote.html";
}
