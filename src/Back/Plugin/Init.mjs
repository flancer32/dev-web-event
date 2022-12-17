/**
 * Plugin initialization function.
 * @namespace Dev_Back_Plugin_Init
 */
// MODULE'S VARS
const NS = 'Dev_Back_Plugin_Init';

export default function (spec) {
    // DEPS
    /** @type {Dev_Back_Defaults} */
    const DEF = spec['Dev_Back_Defaults$'];
    /** @type {TeqFw_Core_Shared_Api_ILogger} */
    const logger = spec['TeqFw_Core_Shared_Api_ILogger$$']; // instance
    /** @type {Dev_Back_Event_Agent_Generator} */
    const modGen = spec['Dev_Back_Event_Agent_Generator$'];

    // FUNCS
    /**
     * @return {Promise<void>}
     * @memberOf Dev_Back_Plugin_Init
     */
    async function action() {
        await modGen.start();
        logger.info(`Plugin '${DEF.SHARED.NAME}' is initialized.`)
    }

    // MAIN
    logger.setNamespace(NS);
    Object.defineProperty(action, 'namespace', {value: NS});
    return action;
}
