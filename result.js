window.getResultList = require('./getResultList.js');
window.sortBy = require('./sortBy.js');
window.getSortedResults = require('./getSortedResults.js');
window.buildChart = require('./buildChart');
window.makeBars = require('./makeBars');
window.makePie = require('./makePie');

window.onload = function() {
	getResultList();
}
