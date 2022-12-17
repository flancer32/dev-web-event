/**
 * Generate random messages to connected streams.
 * @namespace Dev_Back_Event_Agent_Generator
 */
// MODULE'S IMPORT
import {randomUUID} from 'node:crypto';

// MODULE'S CLASSES
export default class Dev_Back_Event_Agent_Generator {

    constructor(spec) {
        // DEPS
        /** @type {TeqFw_Core_Shared_Api_ILogger} */
        const logger = spec['TeqFw_Core_Shared_Api_ILogger$$']; // instance
        /** @type {TeqFw_Web_Event_Back_Mod_Server_Handler_Reverse_Portal} */
        const portalFront = spec['TeqFw_Web_Event_Back_Mod_Server_Handler_Reverse_Portal$'];
        /** @type {TeqFw_Web_Event_Back_Mod_Registry_Stream} */
        const modReg = spec['TeqFw_Web_Event_Back_Mod_Registry_Stream$'];
        /** @type {Dev_Shared_Event_Back_Tick} */
        const esbTick = spec['Dev_Shared_Event_Back_Tick$'];

        // VARS
        logger.setNamespace(this.constructor.name);
        let _idTimeout, _timeoutMs, _total = 0;

        // FUNCS

        function getRandomInt(max) {
            return Math.floor(Math.random() * max);
        }

        async function oneTick() {
            const streams = modReg.getAll();
            if (streams.length) {
                // get random stream
                const ndx = getRandomInt(streams.length);
                const stream = streams[ndx];
                // create event message and populate meta data
                /** @type {TeqFw_Web_Event_Shared_Dto_Event.Dto} */
                const msg = portalFront.createMessage();
                /** @type {TeqFw_Web_Event_Shared_Dto_Event_Meta_Trans_FromBack.Dto} */
                const meta = msg.meta;
                meta.encrypted = true;
                meta.frontUuid = stream.frontUuid;
                meta.streamUuid = stream.uuid;
                // create structure for 'data' property of the message
                const data = esbTick.createDto();
                data.code = randomUUID();
                data.id = _total++;
                msg.data = data;
                // publish response to front
                await portalFront.publish(msg);
            }
            // setup next iteration
            _timeoutMs = getRandomInt(2000); // random 0..2000
            _idTimeout = setTimeout(oneTick, _timeoutMs);
            // logger.info(`Next iteration will be in '${_timeoutMs}' ms.`);
        }

        // INSTANCE METHODS

        /**
         * Start events generation.
         * @returns {Promise<void>}
         */
        this.start = async function () {
            _timeoutMs = 1000; // initial value
            _idTimeout = setTimeout(oneTick, _timeoutMs);
            logger.info(`First iteration will be in '${_timeoutMs}' ms.`);
        }

        /**
         * Clear timeout and stop events generation.
         */
        this.finish = function () {
            if (_idTimeout) {
                clearTimeout(_idTimeout);
                logger.info(`Events generator is stopped.`);
            }
        }
    }
}
