/* Magic Mirror
 * Module: MMM-Moonmoji
 *
 * By Mykle1
 *
 */
const NodeHelper = require('node_helper');
var moonmoji = require('moonmoji')();


module.exports = NodeHelper.create({

    start: function() {
        console.log("Starting node_helper for: " + this.name);
    },

    getMoji: function(url) {
		var results = moonmoji; 		
    	this.sendSocketNotification("MOJI_RESULT", results)	
    },

    socketNotificationReceived: function(notification, payload) {
        if (notification === 'GET_MOJI') {
            this.getMoji(payload);
        }
    }
});
