/**
 * Display info about event message.
 *
 * @namespace Dev_Front_Ui_Info_Trace
 */
// MODULE'S VARS
const NS = 'Dev_Front_Ui_Info_Trace';

// MODULE'S FUNCTIONS
export default function (spec) {
    // DEPS
    /** @type {Dev_Front_Defaults} */
    const DEF = spec['Dev_Front_Defaults$'];

    // FUNCS
    /**
     * @param {string} name
     * @param {string} note
     * @return {Promise<void>}
     * @memberOf Dev_Front_Ui_Info_Trace
     */
    async function act(name, note) {
        const elTrace = document.querySelector(DEF.CSS_TRACE_INFO);
        const elName = document.createElement('div');
        elName.innerHTML = name;
        const elNote = document.createElement('div');
        elNote.innerHTML = note;
        elTrace.insertBefore(elNote, elTrace.firstChild);
        elTrace.insertBefore(elName, elNote);
    }

    // MAIN
    Object.defineProperty(act, 'namespace', {value: NS});
    return act;
}