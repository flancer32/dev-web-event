/**
 * Transborder call response to back request.
 */
// MODULE'S VARS
const NS = 'Dev_Shared_Event_Msg_Front_Call_Response';

// MODULE'S CLASSES
/**
 * @memberOf Dev_Shared_Event_Msg_Front_Call_Response
 */
class Dto {
    static namespace = NS; // used as event name
    /**
     * Code from request returned to the back.
     * @type {string}
     */
    answer;
}

/**
 * @implements TeqFw_Core_Shared_Api_Factory_IDto
 */
export default class Dev_Shared_Event_Msg_Front_Call_Response {
    constructor(spec) {
        // DEPS
        /** @type {TeqFw_Core_Shared_Util_Cast.castString|function} */
        const castString = spec['TeqFw_Core_Shared_Util_Cast.castString'];

        // INSTANCE METHODS
        /**
         * @param {Dev_Shared_Event_Msg_Front_Call_Response.Dto} [data]
         * @return {Dev_Shared_Event_Msg_Front_Call_Response.Dto}
         */
        this.createDto = function (data) {
            // create new DTO and populate it with initialization data
            const res = Object.assign(new Dto(), data);
            // cast known attributes
            res.answer = castString(data?.answer);
            return res;
        }
    }
}
