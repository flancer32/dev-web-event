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

        /** @type {TeqFw_Web_Event_Front_Mod_Connect_Reverse} */
        const streamBf = spec['TeqFw_Web_Event_Front_Mod_Connect_Reverse$'];
        /** @type {TeqFw_Web_Event_Front_Mod_Bus} */
        const eventBus = spec['TeqFw_Web_Event_Front_Mod_Bus$'];
        /** @type {TeqFw_Web_Event_Shared_Event_Back_Stream_Reverse_Authenticated} */
        const esbAuthenticated = spec['TeqFw_Web_Event_Shared_Event_Back_Stream_Reverse_Authenticated$'];
        /** @type {TeqFw_Web_Event_Shared_Event_Back_Stream_Reverse_Failed} */
        const esbFailed = spec['TeqFw_Web_Event_Shared_Event_Back_Stream_Reverse_Failed$'];

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

            /**
             * Wait until back-to-front events stream will be opened and authenticated before continue.
             * @param {TeqFw_Di_Shared_Container} container
             * @return {Promise<TeqFw_Web_Event_Shared_Dto_Event.Dto|null>}
             */
            async function initEventStream(container) {
                return new Promise((resolve, reject) => {
                    if (navigator.onLine) {
                        streamBf.open();
                        const subsSuccess = eventBus.subscribe(esbAuthenticated.getEventName(), (evt) => {
                            eventBus.unsubscribe(subsSuccess);
                            logger.info(`Events reverse stream is opened on the front and authenticated by back.`);
                            resolve(evt);
                        });
                        const subsFailed = eventBus.subscribe(esbFailed.getEventName(), (evt) => {
                            // TODO: this event is not published by back yet
                            eventBus.unsubscribe(subsFailed);
                            debugger
                            reject(new Error(evt?.data?.reason));
                        });
                    } else resolve();
                });
            }


            // MAIN
            const print = createPrintout(fnPrintout);
            print(`TeqFW App is initializing...`);
            await initEventStream(container);
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
