'use strict';

const Homey = require('homey');
const ZwaveDevice = require('homey-meshdriver').ZwaveDevice;

class Pebble extends ZwaveDevice {
	onMeshInit() {

		// enable debugging
		this.enableDebug();

		// print the node's info to the console
		this.printNode();

    this._sceneTrigger = this.getDriver().sceneTrigger;

		this.registerCapability('measure_battery', 'BATTERY');

		this.registerReportListener('CENTRAL_SCENE', 'CENTRAL_SCENE_NOTIFICATION', (report) => {
			if (report.hasOwnProperty('Scene Number')) {
				const data = {
					scene: report['Scene Number'].toString(),
				};
				console.log("Triggering " + JSON.stringify(data));
				this._sceneTrigger.trigger(this, null, data);
			}
		});

	}

	sceneRunListener(args, state) {
		if (!args) return Promise.reject('No arguments provided');
		if (!state) return Promise.reject('No state provided');

		if (args.hasOwnProperty('scene') &&
			state.hasOwnProperty('scene')) {
						return (args.scene === state.scene);
		} return Promise.reject('Scene undefined in args or state');
		}
	}

module.exports = Pebble;
