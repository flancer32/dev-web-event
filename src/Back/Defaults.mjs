/**
 * Plugin constants (hardcoded configuration) for backend code.
 */
export default class Dev_Back_Defaults {
    /** @type {Dev_Shared_Defaults} */
    SHARED;

    constructor(spec) {
        this.SHARED = spec['Dev_Shared_Defaults$'];
        Object.freeze(this);
    }
}
