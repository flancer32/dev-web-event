/**
 * Web application.
 *
 * Initialization:
 * - Init frontend identity (UUID and asymmetric keys).
 * - Open and authorize reverse events stream (back-to-front).
 *
 * Then mount application UI to given DOM element.
 */
/**
 * @implements TeqFw_Web_Front_Api_IApp
 */
export default class Dev_Front_App {
    constructor(spec) {
        // DEPS
        /** @type {Dev_Front_Defaults} */
        const DEF = spec['Dev_Front_Defaults$'];
        /** @type {TeqFw_Di_Shared_Container} */
        const container = spec['TeqFw_Di_Shared_Container$'];
        /** @type {TeqFw_Core_Shared_Api_ILogger} */
        const logger = spec['TeqFw_Core_Shared_Api_ILogger$$']; // instance
        /** @type {TeqFw_Web_Event_Front_Mod_Identity_Front} */
        const modIdFront = spec['TeqFw_Web_Event_Front_Mod_Identity_Front$'];
        /** @type {TeqFw_Web_Front_Mod_Config} */
        const modCfg = spec['TeqFw_Web_Front_Mod_Config$'];
        /** @type {TeqFw_Web_Event_Front_Web_Connect_Stream_Open.act|function} */
        const connReverseOpen = spec['TeqFw_Web_Event_Front_Web_Connect_Stream_Open$'];
        /** @type {Dev_Front_Ui_Info_Update.act|function} */
        const actUpdate = spec['Dev_Front_Ui_Info_Update$'];
        /** @type {Dev_Front_Ui_Actions_Bind.act|function} */
        const actBind = spec['Dev_Front_Ui_Actions_Bind$'];

        // MAIN
        logger.setNamespace(this.constructor.namespace);
        let _print; // function to printout logs to UI or console

        // INSTANCE METHODS

        this.init = async function (fnPrintout) {
            // FUNCS

            /**
             * Create printout function to log application startup events (to page or to console).
             * @param {function(string)} fn
             * @return {function(string)}
             */
            function createPrintout(fn) {
                return (typeof fn === 'function') ? fn : (msg) => console.log(msg);
            }

            // MAIN
            let res = true;
            _print = createPrintout(fnPrintout);
            _print(`TeqFW App is initializing...`);
            try {
                await modCfg.init({}); // this app has no separate 'doors' (entry points)
                _print(`Application config is loaded.`);
                await modIdFront.init();
                _print(`Frontend identity is initialized.`);
                // create event sinks (consumers)
                await container.get('Dev_Front_Event_Sink_Local_Connect_Manager$');
                await container.get('Dev_Front_Event_Sink_Local_Stream_State$');
                await container.get('Dev_Front_Event_Sink_Trans_Call$');
                await container.get('Dev_Front_Event_Sink_Trans_OneWay$');
                _print(`All event sinks are created.`);
                await connReverseOpen();
                _print(`Stream for backend events is opened.`);
                // cron tasks
                /** @type {TeqFw_Web_Event_Front_Cron_Queue_Clean} */
                const cronClean = await container.get('TeqFw_Web_Event_Front_Cron_Queue_Clean$');
                cronClean.start().then();
            } catch (e) {
                _print(e?.message);
                res = false;
            }
            return res;
        }

        /**
         * Mount application UI to given DOM element.
         * @param {Element|string} elRoot
         */
        this.mount = function (elRoot) {
            // switch visibility
            const elPrintOut = document.querySelector(DEF.CSS_PRINT_OUT);
            elPrintOut.style.display = 'none';
            const elDisplay = document.querySelector(DEF.CSS_DISPLAY);
            elDisplay.style.display = 'block';
            // bind handlers and populate UI with data
            actBind();
            actUpdate();
        }

        this.reinstall = function (elRoot) {
            _print(`
It is required to reinstall app. Please clean up all data in DevTools 
(F12 / Application / Storage / Clear site data).
Then reload this page.
`);
        }
    }
}
