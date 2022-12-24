/**
 * Send request to back on stream authentication and wait for response from back.
 *
 * @namespace Dev_Front_Event_Call_Trans
 */
// MODULE'S VARS
const NS = 'Dev_Front_Event_Call_Trans';

// MODULE'S FUNCS
/**
 * @param {TeqFw_Di_Shared_SpecProxy} spec
 */
export default function (spec) {
    // DEPS
    /** @type {Dev_Front_Defaults} */
    const DEF = spec['Dev_Front_Defaults$'];
    /** @type {TeqFw_Web_Event_Front_Mod_Channel} */
    const eventsFront = spec['TeqFw_Web_Event_Front_Mod_Channel$'];
    /** @type {TeqFw_Web_Event_Front_Mod_Portal_Back} */
    const portalBack = spec['TeqFw_Web_Event_Front_Mod_Portal_Back$'];
    /** @type {Dev_Shared_Event_Msg_Front_Call_Request} */
    const esfReq = spec['Dev_Shared_Event_Msg_Front_Call_Request$'];
    /** @type {Dev_Shared_Event_Msg_Back_Call_Response} */
    const esbRes = spec['Dev_Shared_Event_Msg_Back_Call_Response$'];

    // FUNCS

    /**
     * Result function.
     * @returns {Promise<Dev_Shared_Event_Msg_Back_Call_Response.Dto>}
     * @memberOf Dev_Front_Event_Call_Trans
     */
    function act(data, meta) {
        return new Promise((resolve, reject) => {
            // VARS
            let idFail, subs, requestUuid;

            // FUNCS
            /**
             * @param {Dev_Shared_Event_Msg_Back_Call_Response.Dto} data
             * @param {TeqFw_Web_Event_Shared_Dto_Event_Meta_Trans_Response.Dto} meta
             */
            function onResponse({data, meta}) {
                // resolve response for own request only
                if (meta?.requestUuid && (meta?.requestUuid === requestUuid)) {
                    clearTimeout(idFail);
                    const res = esbRes.createDto({data})
                    resolve(res.data);
                    eventsFront.unsubscribe(subs);
                }
            }

            // MAIN
            // subscribe to response event from front
            subs = eventsFront.subscribe(esbRes, onResponse);
            // create empty response if answer will not be returned in timeout
            idFail = setTimeout(() => {
                eventsFront.unsubscribe(subs);
                reject('Response timeout.');
            }, DEF.TIMEOUT_EVENT_RESPONSE); // return nothing after timeout
            // create DTO for message data and set attributes
            const data = esfReq.createDto();
            data.question = Math.floor(Math.random() * 9999).toString();
            // create metadata for event message and publish message to front
            /** @type {TeqFw_Web_Event_Shared_Dto_Event.Dto} */
            const msg = portalBack.createMessage({data, meta});
            requestUuid = msg.meta.uuid;
            portalBack.publish(msg).then();
        });
    }

    // MAIN
    Object.defineProperty(act, 'namespace', {value: NS});
    return act;
}
