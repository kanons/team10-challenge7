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

	window.createPoll = __webpack_require__(1);
	window.appendInput = __webpack_require__(2);
	window.checkEnter = __webpack_require__(3);

	// Add initial 3 option fields
	for (let i = 0; i < 3; i++) {
	    appendInput();
	}

	if (localStorage.getItem('pollData')) {
		location.href = "vote.html";
	}


/***/ },
/* 1 */
/***/ function(module, exports) {

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


/***/ },
/* 2 */
/***/ function(module, exports) {

	//append poll option (or input)
	module.exports = function() {
		var output = "";
		output += '<div class="form-group">';
		output += '<input type="text" class="form-control pull-right vote-option" onkeydown="checkEnter(this)" placeholder="Enter Poll option" style="width: 90%">';
		output += '</div>';
		document.getElementById("poll_form").insertAdjacentHTML('beforeEnd',output);
	}


/***/ },
/* 3 */
/***/ function(module, exports) {

	// Check if the last poll option has text in it, and if so, add another empty option.
	module.exports = function(target) {
		const voteOptions = document.getElementsByClassName("vote-option");

		if (voteOptions[voteOptions.length - 1] == target) {
			appendInput();
		}
	}


/***/ }
/******/ ]);