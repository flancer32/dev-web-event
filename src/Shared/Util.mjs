/**
 * Set of utilities to use on front and back.
 * @namespace Dev_Shared_Util
 */
// DEFINE WORKING VARS
const NS = 'Dev_Shared_Util';


/**
 * Convert ArrayBuffer to Base64 encoded string.
 * @param {Object|string} event
 * @return {string}
 * @memberOf Dev_Shared_Util
 */
function shortName(event) {
    const name = (typeof event === 'string') ? event : event?.constructor?.namespace;
    return `${name}`.replace('Dev_Shared_Event_Msg_', '');
}

// finalize code components for this es6-module
Object.defineProperty(shortName, 'namespace', {value: NS});


export {
    shortName,
};
