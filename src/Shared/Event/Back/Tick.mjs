/**
 * Random message from backend.
 */
// MODULE'S VARS
const NS = 'Dev_Shared_Event_Back_Tick';

// MODULE'S CLASSES
/**
 * @memberOf Dev_Shared_Event_Back_Tick
 */
class Dto {
    static namespace = NS; // used as event name
    /** @type {string} */
    code;
    /** @type {number} */
    id;
}

/**
 * @implements TeqFw_Core_Shared_Api_Factory_IDto
 */
export default class Dev_Shared_Event_Back_Tick {
    constructor(spec) {
        // DEPS
        /** @type {TeqFw_Core_Shared_Util_Cast.castInt|function} */
        const castInt = spec['TeqFw_Core_Shared_Util_Cast.castInt'];
        /** @type {TeqFw_Core_Shared_Util_Cast.castString|function} */
        const castString = spec['TeqFw_Core_Shared_Util_Cast.castString'];

        // FUNCS
        /**
         * @param {Dev_Shared_Event_Back_Tick.Dto} [data]
         * @return {Dev_Shared_Event_Back_Tick.Dto}
         */
        this.createDto = function (data) {
            // create new DTO and populate it with initialization data
            const res = Object.assign(new Dto(), data);
            // cast known attributes
            res.code = castString(data?.code);
            res.id = castInt(data?.id);
            return res;
        }

        // TODO: add getName to Event factory interface
        this.getName = () => NS; // used in subscriptions
    }
}
