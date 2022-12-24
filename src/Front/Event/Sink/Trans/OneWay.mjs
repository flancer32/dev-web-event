/**
 * Frontend listener for 'one-way' backend events (front & session).
 *
 * @namespace Dev_Front_Event_Sink_Trans_OneWay
 */
export default class Dev_Front_Event_Sink_Trans_OneWay {
    constructor(spec) {
        // DEPS
        /** @type {Dev_Front_Defaults} */
        const DEF = spec['Dev_Front_Defaults$'];
        /** @type {TeqFw_Web_Event_Front_Mod_Channel} */
        const eventsFront = spec['TeqFw_Web_Event_Front_Mod_Channel$'];
        /** @type {Dev_Shared_Event_Msg_Back_OneWay_Front} */
        const esbFront = spec['Dev_Shared_Event_Msg_Back_OneWay_Front$'];
        /** @type {Dev_Shared_Event_Msg_Back_OneWay_Session} */
        const esbSession = spec['Dev_Shared_Event_Msg_Back_OneWay_Session$'];

        // MAIN
        eventsFront.subscribe(esbFront, onFront);
        eventsFront.subscribe(esbSession, onSession);

        // FUNCS

        /**
         * @param {Dev_Shared_Event_Msg_Back_OneWay_Front.Dto} data
         * @param {TeqFw_Web_Event_Shared_Dto_Event_Meta_Trans.Dto} meta
         */
        function onFront({data, meta} = {}) {
            const el = document.querySelector(DEF.CSS_DISPLAY);
            el.innerHTML = `${meta.name}: ${meta.uuid}\n` + el.innerHTML;
        }

        /**
         * @param {Dev_Shared_Event_Msg_Back_OneWay_Session.Dto} data
         * @param {TeqFw_Web_Event_Shared_Dto_Event_Meta_Trans.Dto} meta
         */
        function onSession({data, meta} = {}) {
            const el = document.querySelector(DEF.CSS_DISPLAY);
            el.innerHTML = `${meta.name}: ${meta.uuid}\n` + el.innerHTML;
        }

    }
}
