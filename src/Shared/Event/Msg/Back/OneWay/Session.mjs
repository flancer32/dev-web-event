/**
 * One-way transborder event sent from back to front session.
 */
// MODULE'S VARS
const NS = 'Dev_Shared_Event_Msg_Back_OneWay_Session';

// MODULE'S CLASSES
/**
 * @memberOf Dev_Shared_Event_Msg_Back_OneWay_Session
 */
class Dto {
    static namespace = NS; // used as event name
    /**
     * Random UUID to differ one event from another.
     * @type {string}
     */
    code;
}

/**
 * @implements TeqFw_Core_Shared_Api_Factory_IDto
 */
export default class Dev_Shared_Event_Msg_Back_OneWay_Session {
    constructor(spec) {
        // DEPS
        /** @type {TeqFw_Core_Shared_Util_Cast.castString|function} */
        const castString = spec['TeqFw_Core_Shared_Util_Cast.castString'];

        // INSTANCE METHODS
        /**
         * @param {Dev_Shared_Event_Msg_Back_OneWay_Session.Dto} [data]
         * @return {Dev_Shared_Event_Msg_Back_OneWay_Session.Dto}
         */
        this.createDto = function (data) {
            // create new DTO and populate it with initialization data
            const res = Object.assign(new Dto(), data);
            // cast known attributes
            res.code = castString(data?.code);
            return res;
        }
    }
}
