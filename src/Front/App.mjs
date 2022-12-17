/**
 * Web application.
 *
 * Initialization:
 * - Load config and i18n from server (WAPI).
 * - Init UUID for front & back.
 * - Init processes and bind it to events.
 * - Open reverse events stream.
 * - Init Vue (add router, Quasar UI, i18next),
 *
 * Then create and mount root vue component to given DOM element.
 */
// MODULE'S VARS
const NS = 'Dev_Front_App';

// MODULE'S CLASSES
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
        // init identity
        /** @type {TeqFw_Web_Event_Front_Mod_Identity_Front} */
        const modIdentity = spec['TeqFw_Web_Event_Front_Mod_Identity_Front$'];
        // then open event bf-stream
        /** @type {TeqFw_Web_Event_Front_Web_Connect_Stream_Open.act|function} */
        const connReverseOpen = spec['TeqFw_Web_Event_Front_Web_Connect_Stream_Open$'];

        // VARS


        // MAIN
        logger.setNamespace(this.constructor.namespace);

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
            const print = createPrintout(fnPrintout);
            print(`TeqFW App is initializing...`);
            await modIdentity.init();
            print(`Frontend identity is initialized.`);
            await connReverseOpen();
            print(`Stream for backend events is opened.`);
            // create event listeners
            await container.get('Dev_Front_Event_Sink_Trans_Tick$');
        }

        /**
         * Mount root vue component of the application to DOM element.
         *
         * @see https://v3.vuejs.org/api/application-api.html#mount
         *
         * @param {Element|string} elRoot
         */
        this.mount = function (elRoot) {
            if (typeof elRoot === 'string') {
                const el = document.querySelector(elRoot);
                el.innerHTML = 'Started!';
            }
        }
    }
}
