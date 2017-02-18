window.saveVote = require('./saveVote.js');
window.resetPoll = require('./resetPoll.js');
window.getPollList = require('./getPollList.js');

window.onload = function() {
    getPollList();
}
