/**
 * Bind handlers to action buttons on UI.
 *
 * @namespace Dev_Front_Ui_Actions_Bind
 */
// MODULE'S VARS
const NS = 'Dev_Front_Ui_Actions_Bind';

// MODULE'S FUNCTIONS
export default function (spec) {
    // DEPS
    /** @type {Dev_Front_Defaults} */
    const DEF = spec['Dev_Front_Defaults$'];
    /** @type {Dev_Shared_Util.shortName|function} */
    const shortName = spec['Dev_Shared_Util.shortName'];
    /** @type {Dev_Shared_Event_Msg_Front_Call_Request} */
    const esfCall = spec['Dev_Shared_Event_Msg_Front_Call_Request$'];
    /** @type {Dev_Shared_Event_Msg_Back_Call_Response} */
    const esbRes = spec['Dev_Shared_Event_Msg_Back_Call_Response$'];
    /** @type {TeqFw_Web_Event_Front_Act_Trans_Call.act|function} */
    const callTrans = spec['TeqFw_Web_Event_Front_Act_Trans_Call$'];
    /** @type {Dev_Front_Ui_Info_Trace.act|function} */
    const uiTrace = spec['Dev_Front_Ui_Info_Trace$'];

    // FUNCS
    /**
     * @return {Promise<void>}
     * @memberOf Dev_Front_Ui_Actions_Bind
     */
    async function act() {
        // FUNCS
        async function onCall() {
            const data = esfCall.createDto();
            try {
                data.question = Math.floor(Math.random() * 9999).toString();
                uiTrace(shortName(data), `q=${data.question}`);
                /** @type {Dev_Shared_Event_Msg_Back_Call_Response.Dto} */
                const rs = await callTrans(data, esbRes, {timeout: 20000});
                const name = shortName(rs);
                if (rs.answer === data.question) uiTrace(name, `a=${rs.answer}`);
                else uiTrace(name, `!!! wrong answer=${rs.answer} for question=${data.question} !!!`);
            } catch (e) {
                uiTrace(shortName(data), 'response timeout');
            }
        }

        // MAIN
        const elBtnCall = document.querySelector(DEF.CSS_BTN_CALL);
        elBtnCall.addEventListener('click', onCall);
    }

    // MAIN
    Object.defineProperty(act, 'namespace', {value: NS});
    return act;
}