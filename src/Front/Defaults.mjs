/**
 * Plugin constants (hardcoded configuration) for frontend code.
 */
export default class Dev_Front_Defaults {
    CSS_BACK_TICS = '.backTics';
    CSS_BACK_UUID = '.backUuid';
    CSS_DISPLAY = '.display';
    CSS_FRONT_TICS = '.frontTics';
    CSS_FRONT_UUID = '.frontUuid';
    CSS_INFO = '.info';
    CSS_PRINT_OUT = '.printOut';
    CSS_SESSION_UUID = '.sessionUuid';
    CSS_STREAM_UUID = '.streamUuid';

    /** @type {Dev_Shared_Defaults} */
    SHARED;
    TIMEOUT_EVENT_RESPONSE = 8000; // default timeout for response event (sent from back as answer to request from front)

    constructor(spec) {
        this.SHARED = spec['Dev_Shared_Defaults$'];
        Object.freeze(this);
    }
}
