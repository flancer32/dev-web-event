/**
 * One-way transborder event sent from back to front.
 */
// MODULE'S VARS
const NS = 'Dev_Shared_Event_Msg_Back_OneWay_Front';

// MODULE'S CLASSES
/**
 * @memberOf Dev_Shared_Event_Msg_Back_OneWay_Front
 */
class Dto {
    static namespace = NS; // used as event name
}

/**
 * @implements TeqFw_Core_Shared_Api_Factory_IDto
 */
export default class Dev_Shared_Event_Msg_Back_OneWay_Front {
    constructor() {
        // INSTANCE METHODS
        /**
         * @param {Dev_Shared_Event_Msg_Back_OneWay_Front.Dto} [data]
         * @return {Dev_Shared_Event_Msg_Back_OneWay_Front.Dto}
         */
        this.createDto = function (data) {
            // create new DTO and populate it with initialization data
            const res = Object.assign(new Dto(), data);
            // cast known attributes
            return res;
        }
    }
}
