/**
 * Frontend listener for 'one-way' backend events (front & session).
 *
 * @namespace Dev_Front_Event_Sink_Trans_OneWay
 */
export default class Dev_Front_Event_Sink_Trans_OneWay {
    constructor(spec) {
        // DEPS
        /** @type {Dev_Shared_Util.shortName|function} */
        const shortName = spec['Dev_Shared_Util.shortName'];
        /** @type {TeqFw_Web_Event_Front_Mod_Channel} */
        const eventsFront = spec['TeqFw_Web_Event_Front_Mod_Channel$'];
        /** @type {Dev_Shared_Event_Msg_Back_OneWay_Front} */
        const esbFront = spec['Dev_Shared_Event_Msg_Back_OneWay_Front$'];
        /** @type {Dev_Shared_Event_Msg_Back_OneWay_Session} */
        const esbSession = spec['Dev_Shared_Event_Msg_Back_OneWay_Session$'];
        /** @type {Dev_Front_Ui_Info_Trace.act|function} */
        const uiTrace = spec['Dev_Front_Ui_Info_Trace$'];

        // MAIN
        eventsFront.subscribe(esbFront, onEvent);
        eventsFront.subscribe(esbSession, onEvent);

        // FUNCS

        /**
         * @param {TeqFw_Web_Event_Shared_Dto_Event_Meta_Trans.Dto} meta
         */
        function onEvent({meta} = {}) {
            const name = shortName(meta.name);
            const note = `backUuid=${meta.uuid}`;
            uiTrace(name, note);
        }

    }
}
