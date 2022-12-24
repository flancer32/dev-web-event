/**
 * Update UI after new stream UUID is set in session.
 * @namespace Dev_Front_Event_Sink_Local_Stream_Authenticated
 */
// MODULE'S VARS
const NS = 'Dev_Front_Event_Sink_Local_Stream_Authenticated';

// MODULE'S FUNCTIONS
export default function (spec) {
    // DEPS
    /** @type {TeqFw_Core_Shared_Api_ILogger} */
    const logger = spec['TeqFw_Core_Shared_Api_ILogger$$']; // instance
    /** @type {TeqFw_Web_Event_Front_Mod_Channel} */
    const eventsFront = spec['TeqFw_Web_Event_Front_Mod_Channel$'];
    /** @type {TeqFw_Web_Event_Front_Event_Msg_Stream_Authenticated} */
    const efAuth = spec['TeqFw_Web_Event_Front_Event_Msg_Stream_Authenticated$'];
    /** @type {Dev_Front_Ui_Info_Update.act|function} */
    const actUpdate = spec['Dev_Front_Ui_Info_Update$'];
    /** @type {Dev_Front_Event_Call_Trans.act|function} */
    const callTrans = spec['Dev_Front_Event_Call_Trans$'];

    // MAIN
    logger.setNamespace(NS);
    eventsFront.subscribe(efAuth, onAuth);

    // FUNCS

    function onAuth(event) {
        actUpdate();
        callTrans()
            .then(
                /**
                 * @param {Dev_Shared_Event_Msg_Back_Call_Response.Dto} data
                 */
                (data) => {
                    logger.info(`There is an answer for call event: ${data?.answer}.`);
                })
            .catch((e) => {
                debugger
            });
    }
}