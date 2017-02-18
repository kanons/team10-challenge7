//get poll list
module.exports = function() {
	var output = "";
	var pollData = JSON.parse(localStorage.getItem('pollData'));
	document.getElementById("poll_title").innerHTML = pollData.title;
	var options = pollData.options;
	for (var i=0; i < options.length; i++) {
		output +='<li class="list-group-item">';
		output +='<div class="checkbox">';
		output +='<label>';
		output +='<input type="radio" name="vote_option" class="vote-option" value="'+options[i]+'"> '+options[i];
		output +='</label>';
		output +='</div>';
		output +='</li>';
	};
	document.getElementById("poll_list").innerHTML = output;
}
