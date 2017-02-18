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

	window.saveVote = __webpack_require__(10);
	window.resetPoll = __webpack_require__(11);
	window.getPollList = __webpack_require__(12);

	window.onload = function() {
	    getPollList();
	}


/***/ },
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */,
/* 9 */,
/* 10 */
/***/ function(module, exports) {

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


/***/ },
/* 11 */
/***/ function(module, exports) {

	//reset poll
	module.exports = function(){
		localStorage.removeItem("pollData");
		localStorage.removeItem("pollDataVote");
		location.href = "index.html";
	}


/***/ },
/* 12 */
/***/ function(module, exports) {

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


/***/ }
/******/ ]);