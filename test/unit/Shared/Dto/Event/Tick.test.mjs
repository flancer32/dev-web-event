import assert from 'assert';
import {container} from '@teqfw/test';
import {describe, it} from 'mocha';

// SETUP ENV

// GET OBJECT FROM CONTAINER AND RUN TESTS
const NS = 'Dev_Shared_Event_Back_Tick';
/** @type {Dev_Shared_Event_Back_Tick} */
const factory = await container.get(`${NS}$`);

describe('Dev_Shared_Event_Back_Tick', function () {
    it('can inject tested object', async () => {
        assert(typeof factory === 'object');
    });

    it('can create empty event message', async () => {
        const event = factory.createEvent();
        assert.equal(typeof event, 'object');
        // assert.equal(event.namespace, NS);
    });

    it('meta is initialized', async () => {
        const event = factory.createEvent();
        assert.equal(event.meta.name, NS);
    });

});

