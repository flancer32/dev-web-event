/**
 * Update info on UI.
 *
 * @namespace Dev_Front_Ui_Info_Update
 */
// MODULE'S VARS
const NS = 'Dev_Front_Ui_Info_Update';

// MODULE'S FUNCTIONS
export default function (spec) {
    // DEPS
    /** @type {Dev_Front_Defaults} */
    const DEF = spec['Dev_Front_Defaults$'];
    /** @type {TeqFw_Web_Event_Front_Mod_Identity_Front} */
    const modIdFront = spec['TeqFw_Web_Event_Front_Mod_Identity_Front$'];
    /** @type {TeqFw_Web_Event_Front_Mod_Identity_Session} */
    const modIdSession = spec['TeqFw_Web_Event_Front_Mod_Identity_Session$'];

    // FUNCS
    /**
     * @return {Promise<void>}
     * @memberOf Dev_Front_Ui_Info_Update
     */
    async function act() {
        const elFront = document.querySelector(DEF.CSS_FRONT_UUID);
        elFront.innerHTML = modIdFront.getFrontUuid();
        const elSession = document.querySelector(DEF.CSS_SESSION_UUID);
        elSession.innerHTML = modIdSession.getSessionUuid();
        const elBack = document.querySelector(DEF.CSS_BACK_UUID);
        elBack.innerHTML = modIdSession.getBackUuid();
        const elStream = document.querySelector(DEF.CSS_STREAM_UUID);
        elStream.innerHTML = modIdSession.getStreamUuid();
    }

    // MAIN
    Object.defineProperty(act, 'namespace', {value: NS});
    return act;
}