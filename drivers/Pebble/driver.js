'use strict';

const Homey = require('homey');

class PebbleDriver extends Homey.Driver {
    onInit() {
        super.onInit();

        this.sceneTrigger = new Homey.FlowCardTriggerDevice('pebble_scene').register().registerRunListener((args, state) => {
            return args.device.sceneRunListener(args, state);
        });

    }
}

module.exports = PebbleDriver;
