/**
 * Frontend listener for backend events.
 *
 * @namespace Dev_Front_Event_Sink_Trans_Tick
 */
export default class Dev_Front_Event_Sink_Trans_Tick {
    constructor(spec) {
        // DEPS
        /** @type {TeqFw_Web_Event_Front_Mod_Bus} */
        const eventsFront = spec['TeqFw_Web_Event_Front_Mod_Bus$'];
        /** @type {Dev_Shared_Event_Back_Tick} */
        const esbTick = spec['Dev_Shared_Event_Back_Tick$'];

        // VARS

        // MAIN
        eventsFront.subscribe(esbTick.getName(), onTick);

        // FUNCS
        /**
         * Process event message from backend.
         * @param {TeqFw_Web_Event_Shared_Dto_Event.Dto} msg
         */
        function onTick(msg) {
            /** @type {Dev_Shared_Event_Back_Tick.Dto} */
            const data = msg?.data;
            /** @type {TeqFw_Web_Event_Shared_Dto_Event_Meta_Trans_FromBack.Dto} */
            const meta = msg?.meta;
            const el = document.querySelector('.ticksDisplay');
            el.innerHTML = `${data.id}: ${data?.code}\n` + el.innerHTML;
        }


    }
}
