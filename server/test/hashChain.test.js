'use strict';

const test = require('node:test');
const assert = require('node:assert');
const { GENESIS_HASH, sha256, createEntry, verifyChain } = require('../src/hashChain');

function buildChain() {
  const e1 = createEntry(null, { timestamp: '2026-10-24T10:00:00Z', actor: 'u1', action: 'case.open', payload: { ref: 'SP-0001' } });
  const e2 = createEntry(e1, { timestamp: '2026-10-24T10:05:00Z', actor: 'u2', action: 'evidence.upload', payload: { sha256: sha256('photo-bytes') } });
  const e3 = createEntry(e2, { timestamp: '2026-10-24T11:00:00Z', actor: 'u3', action: 'finding.record', payload: { type: 'volume', value: '43 barrels' } });
  return [e1, e2, e3];
}

test('sha256 is deterministic and changes when the data changes', () => {
  assert.strictEqual(sha256('abc'), sha256('abc'));
  assert.notStrictEqual(sha256('abc'), sha256('abd'));
  assert.strictEqual(sha256('abc').length, 64);
});

test('first entry links to the genesis hash', () => {
  const [e1] = buildChain();
  assert.strictEqual(e1.prevHash, GENESIS_HASH);
});

test('an untouched chain verifies', () => {
  assert.deepStrictEqual(verifyChain(buildChain()), { valid: true });
});

test('editing an entry is detected at that entry', () => {
  const chain = buildChain();
  chain[1].payload.sha256 = sha256('different-photo');
  const result = verifyChain(chain);
  assert.strictEqual(result.valid, false);
  assert.strictEqual(result.brokenAt, 1);
});

test('deleting an entry from the middle is detected', () => {
  const chain = buildChain();
  chain.splice(1, 1);
  const result = verifyChain(chain);
  assert.strictEqual(result.valid, false);
  assert.strictEqual(result.brokenAt, 1);
});

test('editing the first entry is detected', () => {
  const chain = buildChain();
  chain[0].payload.ref = 'SP-9999';
  const result = verifyChain(chain);
  assert.strictEqual(result.valid, false);
  assert.strictEqual(result.brokenAt, 0);
});

test('key order in the payload does not change the hash', () => {
  const a = createEntry(null, { timestamp: 't', actor: 'u', action: 'x', payload: { a: 1, b: 2 } });
  const b = createEntry(null, { timestamp: 't', actor: 'u', action: 'x', payload: { b: 2, a: 1 } });
  assert.strictEqual(a.hash, b.hash);
});
