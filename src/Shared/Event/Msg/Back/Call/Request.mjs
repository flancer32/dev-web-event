/**
 * Transborder call (awaiting the response) sent from back to front.
 */
// MODULE'S VARS
const NS = 'Dev_Shared_Event_Msg_Back_Call_Request';

// MODULE'S CLASSES
/**
 * @memberOf Dev_Shared_Event_Msg_Back_Call_Request
 */
class Dto {
    static namespace = NS; // used as event name
    /**
     * Code sent to front that should be returned back in response.
     * @type {string}
     */
    question;
}

/**
 * @implements TeqFw_Core_Shared_Api_Factory_IDto
 */
export default class Dev_Shared_Event_Msg_Back_Call_Request {
    constructor(spec) {
        // DEPS
        /** @type {TeqFw_Core_Shared_Util_Cast.castString|function} */
        const castString = spec['TeqFw_Core_Shared_Util_Cast.castString'];

        // INSTANCE METHODS
        /**
         * @param {Dev_Shared_Event_Msg_Back_Call_Request.Dto} [data]
         * @return {Dev_Shared_Event_Msg_Back_Call_Request.Dto}
         */
        this.createDto = function (data) {
            // create new DTO and populate it with initialization data
            const res = Object.assign(new Dto(), data);
            // cast known attributes
            res.question = castString(data?.question);
            return res;
        }
    }
}
