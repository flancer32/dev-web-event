/**
 * Plugin constants (hardcoded configuration) for frontend code.
 */
export default class Dev_Front_Defaults {

    ROUTE_HOME = '/';

    /** @type {Dev_Shared_Defaults} */
    SHARED;

    constructor(spec) {
        this.SHARED = spec['Dev_Shared_Defaults$'];
        Object.freeze(this);
    }
}
