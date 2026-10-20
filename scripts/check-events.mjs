// Run: node scripts/check-events.mjs  (Node 22.6+; strips TypeScript types)
import assert from 'node:assert/strict';
import { feeAt, formatEventDates, eventFees } from '../src/lib/data/events.ts';

const ev = { pricing: { regular: 399, earlyBird: 299, earlyBirdDays: 3 }, registrationOpensAt: '2026-11-10' };

assert.equal(feeAt(ev, new Date('2026-11-09T18:29:00Z')), 299); // before opening counts as early bird
assert.equal(feeAt(ev, new Date('2026-11-12T18:29:00Z')), 299); // 23:59 IST on day 3
assert.equal(feeAt(ev, new Date('2026-11-12T18:30:00Z')), 399); // 00:00 IST on day 4
assert.equal(feeAt({ pricing: ev.pricing }, new Date()), 399);  // no opening date: regular
assert.equal(feeAt({}, new Date()), null);

assert.equal(formatEventDates({}), 'Dates to be announced');
assert.equal(formatEventDates({ startDate: '2026-10-31', endDate: '2026-11-01' }), '31 Oct to 1 Nov 2026');
assert.equal(formatEventDates({ startDate: '2026-12-31', endDate: '2027-01-01' }), '31 Dec 2026 to 1 Jan 2027');
assert.deepEqual(eventFees(ev).map((f) => f.amount), ['₹299', '₹399']);

console.log('events checks passed');
