// Check if the last poll option has text in it, and if so, add another empty option.
module.exports = function(target) {
	const voteOptions = document.getElementsByClassName("vote-option");

	if (voteOptions[voteOptions.length - 1] == target) {
		appendInput();
	}
}
