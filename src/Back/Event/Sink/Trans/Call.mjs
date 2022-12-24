/**
 * Produce response to call from fronts.
 *
 * @namespace Dev_Back_Event_Sink_Trans_Call
 */
// MODULE'S VARS
const NS = 'Dev_Back_Event_Sink_Trans_Call';

// MODULE'S CLASSES
export default function (spec) {
    // DEPS
    /** @type {TeqFw_Core_Shared_Api_ILogger} */
    const logger = spec['TeqFw_Core_Shared_Api_ILogger$$']; // instance
    /** @type {TeqFw_Web_Event_Back_Mod_Channel} */
    const eventsBack = spec['TeqFw_Web_Event_Back_Mod_Channel$'];
    /** @type {TeqFw_Web_Event_Back_Mod_Portal_Front} */
    const portalFront = spec['TeqFw_Web_Event_Back_Mod_Portal_Front$'];
    /** @type {Dev_Shared_Event_Msg_Front_Call_Request} */
    const esfReq = spec['Dev_Shared_Event_Msg_Front_Call_Request$'];
    /** @type {Dev_Shared_Event_Msg_Back_Call_Response} */
    const esbRes = spec['Dev_Shared_Event_Msg_Back_Call_Response$'];


    // MAIN
    logger.setNamespace(NS);
    eventsBack.subscribe(esfReq, onReq);

    // FUNCS
    /**
     * @param {Dev_Shared_Event_Msg_Front_Call_Request.Dto} req
     * @param {TeqFw_Web_Event_Shared_Dto_Event_Meta_Trans.Dto} meta
     */
    function onReq({data: req, meta} = {}) {
        // create structure for 'data' property of the message
        const data = esbRes.createDto();
        data.answer= req.question;
        // create event message and populate meta data
        /** @type {TeqFw_Web_Event_Shared_Dto_Event.Dto} */
        const msg = portalFront.createMessage({data});
        msg.meta.requestUuid = meta.uuid;
        msg.meta.sessionUuid = meta.sessionUuid;
        // publish response to front
        portalFront.publish(msg).then();
    }

}
