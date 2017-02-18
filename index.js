window.createPoll = require('./createPoll.js');
window.appendInput = require('./appendInput.js');
window.checkEnter = require('./checkEnter.js');

// Add initial 3 option fields
for (let i = 0; i < 3; i++) {
    appendInput();
}

if (localStorage.getItem('pollData')) {
	location.href = "vote.html";
}
