/**
 * Frontend listener for call request from backend events.
 *
 * @namespace Dev_Front_Event_Sink_Trans_Call
 */
export default class Dev_Front_Event_Sink_Trans_Call {
    constructor(spec) {
        // DEPS
        /** @type {Dev_Shared_Util.shortName|function} */
        const shortName = spec['Dev_Shared_Util.shortName'];
        /** @type {TeqFw_Web_Event_Front_Mod_Channel} */
        const eventsFront = spec['TeqFw_Web_Event_Front_Mod_Channel$'];
        /** @type {TeqFw_Web_Event_Front_Mod_Portal_Back} */
        const portalBack = spec['TeqFw_Web_Event_Front_Mod_Portal_Back$'];
        /** @type {Dev_Shared_Event_Msg_Back_Call_Request} */
        const esbReq = spec['Dev_Shared_Event_Msg_Back_Call_Request$'];
        /** @type {Dev_Shared_Event_Msg_Front_Call_Response} */
        const esfRes = spec['Dev_Shared_Event_Msg_Front_Call_Response$'];
        /** @type {Dev_Front_Ui_Info_Trace.act|function} */
        const uiTrace = spec['Dev_Front_Ui_Info_Trace$'];

        // MAIN
        eventsFront.subscribe(esbReq, onCall);

        // FUNCS

        /**
         * @param {Dev_Shared_Event_Msg_Back_Call_Request.Dto} req
         * @param {TeqFw_Web_Event_Shared_Dto_Event_Meta_Trans.Dto} meta
         */
        function onCall({data: req, meta} = {}) {
            // trace incoming request on UI
            const name = shortName(meta.name);
            const note = `i=${req.index}, q=${req.question}, uuid: ${meta.uuid}`;
            uiTrace(name, note);
            // prepare response DTO
            const data = esfRes.createDto();
            data.answer = req.question;
            // publish response to back
            const msg = portalBack.createMessage({data});
            msg.meta.requestUuid = meta.uuid;
            portalBack.publish(msg)
                .then(() => {
                    // trace outgoing response on UI
                    const name = shortName(msg.meta.name);
                    const note = `a=${data.answer}, uuid=${msg.meta.uuid}`;
                    uiTrace(name, note);
                });
        }

    }
}
