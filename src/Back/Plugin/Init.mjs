/**
 * Plugin initialization function.
 * @namespace Dev_Back_Plugin_Init
 */
// MODULE'S VARS
const NS = 'Dev_Back_Plugin_Init';

// MODULE'S FUNCS
export default function (spec) {
    // DEPS
    /** @type {Dev_Back_Defaults} */
    const DEF = spec['Dev_Back_Defaults$'];
    /** @type {TeqFw_Core_Shared_Api_ILogger} */
    const logger = spec['TeqFw_Core_Shared_Api_ILogger$$']; // instance
    /** @type {TeqFw_Di_Shared_Container} */
    const container = spec['TeqFw_Di_Shared_Container$'];

    // FUNCS
    /**
     * @return {Promise<void>}
     * @memberOf Dev_Back_Plugin_Init
     */
    async function action() {
        // create event sinks (synchronously, to create singletons right)
        await container.get('Dev_Back_Event_Sink_Local_Authenticated$');
        await container.get('Dev_Back_Event_Sink_Trans_Call$');
        //
        logger.info(`Plugin '${DEF.SHARED.NAME}' is initialized.`)
    }

    // MAIN
    logger.setNamespace(NS);
    Object.defineProperty(action, 'namespace', {value: NS});
    return action;
}
