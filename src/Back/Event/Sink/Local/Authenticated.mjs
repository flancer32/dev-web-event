/**
 * Produce one-way bf-events to newly authenticated fronts (event for front and event for session).
 *
 * @namespace Dev_Back_Event_Sink_Local_Authenticated
 */
// MODULE'S IMPORT
import {randomInt} from 'node:crypto';

// MODULE'S VARS
const NS = 'Dev_Back_Event_Sink_Local_Authenticated';

// MODULE'S CLASSES
export default function (spec) {
    // DEPS
    /** @type {TeqFw_Core_Shared_Api_ILogger} */
    const logger = spec['TeqFw_Core_Shared_Api_ILogger$$']; // instance
    /** @type {TeqFw_Web_Event_Back_Mod_Channel} */
    const eventsBack = spec['TeqFw_Web_Event_Back_Mod_Channel$'];
    /** @type {TeqFw_Web_Event_Back_Mod_Portal_Front} */
    const portalFront = spec['TeqFw_Web_Event_Back_Mod_Portal_Front$'];
    /** @type {TeqFw_Web_Event_Back_Event_Msg_Stream_Authenticated} */
    const ebAuth = spec['TeqFw_Web_Event_Back_Event_Msg_Stream_Authenticated$'];
    /** @type {Dev_Shared_Event_Msg_Back_OneWay_Front} */
    const esbOneWayFront = spec['Dev_Shared_Event_Msg_Back_OneWay_Front$'];
    /** @type {Dev_Shared_Event_Msg_Back_OneWay_Session} */
    const esbOneWaySession = spec['Dev_Shared_Event_Msg_Back_OneWay_Session$'];
    /** @type {Dev_Shared_Event_Msg_Back_Call_Request} */
    const esbReq = spec['Dev_Shared_Event_Msg_Back_Call_Request$'];
    /** @type {Dev_Back_Event_Call_Trans.act|function} */
    const callTrans = spec['Dev_Back_Event_Call_Trans$'];
    /** @type {TeqFw_Web_Event_Shared_Dto_Event_Meta_Trans} */
    const factMeta = spec['TeqFw_Web_Event_Shared_Dto_Event_Meta_Trans$'];

    // MAIN
    logger.setNamespace(NS);
    eventsBack.subscribe(ebAuth, onAuth);
    Object.defineProperty(onAuth, 'namespace', {value: NS});

    // FUNCS
    /**
     * @param {TeqFw_Web_Event_Back_Event_Msg_Stream_Authenticated.Dto} event
     */
    function onAuth({data: event} = {}) {
        // FUNCS

        /**
         * Produce one-way message for the authenticated front (all sessions).
         * @param {TeqFw_Web_Event_Back_Event_Msg_Stream_Authenticated.Dto} evt
         */
        function oneWayFront(evt) {
            const data = esbOneWayFront.createDto();
            const msg = portalFront.createMessage({data});
            // noinspection JSValidateTypes
            /** @type {TeqFw_Web_Event_Shared_Dto_Event_Meta_Trans.Dto} */
            const meta = msg.meta;
            meta.frontUuid = evt.frontUuid;
            portalFront.publish(msg).then();
        }

        /**
         * Produce one-way message for current session of the authenticated front.
         * @param {TeqFw_Web_Event_Back_Event_Msg_Stream_Authenticated.Dto} evt
         */
        function oneWaySession(evt) {
            const data = esbOneWaySession.createDto();
            const msg = portalFront.createMessage({data});
            // noinspection JSValidateTypes
            /** @type {TeqFw_Web_Event_Shared_Dto_Event_Meta_Trans.Dto} */
            const meta = msg.meta;
            meta.sessionUuid = evt.sessionUuid;
            meta.encrypted = true;
            portalFront.publish(msg).then();
        }

        /**
         * Produce request call for current session of the authenticated front.
         * @param {TeqFw_Web_Event_Back_Event_Msg_Stream_Authenticated.Dto} evt
         */
        async function callSession(evt) {
            const data = esbReq.createDto();
            data.question = randomInt(9999).toString();
            const meta = factMeta.createDto();
            meta.sessionUuid = evt.sessionUuid;
            try {
                /** @type {Dev_Shared_Event_Msg_Front_Call_Response.Dto} */
                const rs = await callTrans(data, meta);
                logger.info(`There is an answer for call event: ${rs.answer}.`);
            } catch (e) {
                logger.error(`There is no answer for call event: ${data.question}.`);
            }
        }

        // MAIN
        oneWayFront(event);
        oneWaySession(event);
        callSession(event).then();
    }


}
