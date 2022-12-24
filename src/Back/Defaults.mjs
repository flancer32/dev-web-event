/**
 * Plugin constants (hardcoded configuration) for backend code.
 */
export default class Dev_Back_Defaults {
    /** @type {Dev_Shared_Defaults} */
    SHARED;
    TIMEOUT_EVENT_RESPONSE = 8000; // default timeout for response event (sent from front as answer to request from back)

    constructor(spec) {
        this.SHARED = spec['Dev_Shared_Defaults$'];
        Object.freeze(this);
    }
}
