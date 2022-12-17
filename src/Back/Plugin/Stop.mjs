/**
 * Plugin finalization function.
 * @namespace Dev_Back_Plugin_Stop
 */
// MODULE'S VARS
const NS = 'Dev_Back_Plugin_Stop';

export default function (spec) {
    // EXTRACT DEPS
    /** @type {Dev_Back_Defaults} */
    const DEF = spec['Dev_Back_Defaults$'];
    /** @type {TeqFw_Core_Shared_Api_ILogger} */
    const logger = spec['TeqFw_Core_Shared_Api_ILogger$$']; // instance
    /** @type {Dev_Back_Event_Agent_Generator} */
    const modGen = spec['Dev_Back_Event_Agent_Generator$'];

    // FUNCS
    /**
     * @return {Promise<void>}
     * @namespace Dev_Back_Plugin_Stop
     */
    async function action() {
        modGen.finish();
        logger.info(`Plugin '${DEF.SHARED.NAME}' is stopped.`)
    }

    // MAIN
    logger.setNamespace(NS);
    Object.defineProperty(action, 'namespace', {value: NS});
    return action;
}
