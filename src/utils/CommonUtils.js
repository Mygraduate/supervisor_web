/*
 * @Author: Rhymedys
 * @Date:   2017-01-31 21:10:20
 * @Last Modified by:   Rhymedys
 * @Last Modified time: 2017-02-01 15:46:12
 */

'use strict';
var isDebugLog = true;

export default {
	log: function(msg1, msg2, msg3, msg4, msg5, msg6) {
		if (isDebugLog) {
			if (msg6) {
				console.log(msg1, msg2, msg3, msg4, msg5, msg6);
			} else if (msg5) {
				console.log(msg1, msg2, msg3, msg4, msg5);
			} else if (msg4) {
				console.log(msg1, msg2, msg3, msg4);

			} else if (msg3) {
				console.log(msg1, msg2, msg3);

			} else if (msg2) {
				console.log(msg1, msg2);

			} else {
				console.log(msg1);
			}
		}
	}
}