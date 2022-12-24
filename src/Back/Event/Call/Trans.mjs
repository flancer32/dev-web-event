/**
 * Send request to authenticated stream and wait for response from front.
 *
 * @namespace Dev_Back_Event_Call_Trans
 *
 * TODO: we can have one only caller function (timeout, request event & response DTO factory as params)
 */
// MODULE'S VARS
const NS = 'Dev_Back_Event_Call_Trans';

// MODULE'S FUNCS
/**
 * @param {TeqFw_Di_Shared_SpecProxy} spec
 */
export default function (spec) {
    // DEPS
    /** @type {Dev_Back_Defaults} */
    const DEF = spec['Dev_Back_Defaults$'];
    /** @type {TeqFw_Web_Event_Back_Mod_Channel} */
    const eventsBack = spec['TeqFw_Web_Event_Back_Mod_Channel$'];
    /** @type {TeqFw_Web_Event_Back_Mod_Portal_Front} */
    const portalFront = spec['TeqFw_Web_Event_Back_Mod_Portal_Front$'];
    /** @type {Dev_Shared_Event_Msg_Front_Call_Response} */
    const esbRes = spec['Dev_Shared_Event_Msg_Front_Call_Response$'];

    // FUNCS

    /**
     * Result function.
     * @param {Dev_Shared_Event_Msg_Back_Call_Request.Dto} data
     * @param {TeqFw_Web_Event_Shared_Dto_Event_Meta_Trans.Dto} meta
     * @returns {Promise<Dev_Shared_Event_Msg_Front_Call_Response.Dto>}
     * @memberOf Dev_Back_Event_Call_Trans
     */
    function act(data, meta) {
        return new Promise((resolve, reject) => {
            // VARS
            let idFail, subs, requestUuid;

            // FUNCS
            /**
             * @param {Dev_Shared_Event_Msg_Front_Call_Response.Dto} data
             * @param {TeqFw_Web_Event_Shared_Dto_Event_Meta_Trans_Response.Dto} meta
             */
            function onResponse({data, meta}) {
                // resolve response for own request only
                if (meta?.requestUuid && (meta?.requestUuid === requestUuid)) {
                    clearTimeout(idFail);
                    const res = esbRes.createDto({data})
                    resolve(res.data);
                    eventsBack.unsubscribe(subs);
                }
            }

            // MAIN
            // subscribe to response event from front
            subs = eventsBack.subscribe(esbRes, onResponse);
            // create empty response if answer will not be returned in timeout
            idFail = setTimeout(() => {
                eventsBack.unsubscribe(subs);
                reject('Response timeout.');
            }, DEF.TIMEOUT_EVENT_RESPONSE); // return nothing after timeout
            // create event message and publish message to front
            const msg = portalFront.createMessage({data, meta});
            requestUuid = msg.meta.uuid;
            portalFront.publish(msg).then();
        });
    }

    // MAIN
    Object.defineProperty(act, 'namespace', {value: NS});
    return act;
}
