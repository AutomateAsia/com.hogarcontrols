'use strict';

const ZwaveDevice = require('homey-meshdriver').ZwaveDevice;

class FanDimmer extends ZwaveDevice {
	onMeshInit() {

		// enable debugging
		this.enableDebug();

		// print the node's info to the console
		this.printNode();

		// register capabilities for this device
		this.registerCapability('onoff', 'BASIC', {
			get: 'BASIC_GET',
			set: 'BASIC_SET',
			report: 'BASIC_REPORT',
			reportParser(report) {

				if (report['Value'] = "off/disable") {
					this.setCapabilityValue('onoff', false);
				}else{
					this.setCapabilityValue('dim', parseInt(report['Value']));
					this.setCapabilityValue('onoff', true);
				}

				return null;
			}
		});

		this.registerCapability('dim', 'SWITCH_MULTILEVEL');
	}
}

module.exports = FanDimmer;