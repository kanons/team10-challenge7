//append poll option (or input)
module.exports = function() {
	var output = "";
	output += '<div class="form-group">';
	output += '<input type="text" class="form-control pull-right vote-option" onkeydown="checkEnter(this)" placeholder="Enter Poll option" style="width: 90%">';
	output += '</div>';
	document.getElementById("poll_form").insertAdjacentHTML('beforeEnd',output);
}
