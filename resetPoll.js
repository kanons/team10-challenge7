//reset poll
module.exports = function(){
	localStorage.removeItem("pollData");
	localStorage.removeItem("pollDataVote");
	location.href = "index.html";
}
