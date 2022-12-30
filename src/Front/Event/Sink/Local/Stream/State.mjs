/**
 * Update UI after reverse stream state is changed.
 * @namespace Dev_Front_Event_Sink_Local_Stream_State
 */
// MODULE'S VARS
const NS = 'Dev_Front_Event_Sink_Local_Stream_State';

// MODULE'S FUNCTIONS
export default function (spec) {
    // DEPS
    /** @type {Dev_Front_Defaults} */
    const DEF = spec['Dev_Front_Defaults$'];
    /** @type {TeqFw_Core_Shared_Api_ILogger} */
    const logger = spec['TeqFw_Core_Shared_Api_ILogger$$']; // instance
    /** @type {TeqFw_Web_Event_Front_Mod_Channel} */
    const eventsFront = spec['TeqFw_Web_Event_Front_Mod_Channel$'];
    /** @type {TeqFw_Web_Event_Front_Event_Msg_Stream_Authenticated} */
    const efAuth = spec['TeqFw_Web_Event_Front_Event_Msg_Stream_Authenticated$'];
    /** @type {TeqFw_Web_Event_Front_Event_Msg_Stream_Closed} */
    const efClosed = spec['TeqFw_Web_Event_Front_Event_Msg_Stream_Closed$'];
    /** @type {Dev_Front_Ui_Info_Update.act|function} */
    const actUpdate = spec['Dev_Front_Ui_Info_Update$'];

    // MAIN
    logger.setNamespace(NS);
    eventsFront.subscribe(efAuth, actUpdate);
    eventsFront.subscribe(efClosed, onClosed);

    // FUNCS

    /**
     *
     * @param {TeqFw_Web_Event_Front_Event_Msg_Stream_Closed.Dto} evt
     */
    function onClosed(evt) {
        const elStream = document.querySelector(DEF.CSS_STREAM_UUID);
        elStream.innerHTML = '';
    }
}