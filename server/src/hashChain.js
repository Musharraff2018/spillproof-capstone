'use strict';

const crypto = require('crypto');

const GENESIS_HASH = '0'.repeat(64);

// SHA-256 of a Buffer or string, as a lowercase hex string.
function sha256(data) {
  return crypto.createHash('sha256').update(data).digest('hex');
}

// Stable JSON: object keys are sorted so the same data always hashes the same way.
function canonical(value) {
  if (Array.isArray(value)) {
    return '[' + value.map(canonical).join(',') + ']';
  }
  if (value && typeof value === 'object') {
    return (
      '{' +
      Object.keys(value)
        .sort()
        .map((k) => JSON.stringify(k) + ':' + canonical(value[k]))
        .join(',') +
      '}'
    );
  }
  return JSON.stringify(value);
}

// Hash of one entry: its own content plus the previous entry's hash.
function computeEntryHash(prevHash, { timestamp, actor, action, payload }) {
  return sha256(canonical({ prevHash, timestamp, actor, action, payload }));
}

// Create the next entry in a chain. `prevEntry` is null for the first entry.
function createEntry(prevEntry, { timestamp, actor, action, payload }) {
  const prevHash = prevEntry ? prevEntry.hash : GENESIS_HASH;
  const hash = computeEntryHash(prevHash, { timestamp, actor, action, payload });
  return { timestamp, actor, action, payload, prevHash, hash };
}

// Check a whole chain. Returns { valid: true } or { valid: false, brokenAt, reason }.
function verifyChain(entries) {
  let expectedPrev = GENESIS_HASH;
  for (let i = 0; i < entries.length; i += 1) {
    const e = entries[i];
    if (e.prevHash !== expectedPrev) {
      return { valid: false, brokenAt: i, reason: 'prevHash does not match the previous entry' };
    }
    const recomputed = computeEntryHash(e.prevHash, e);
    if (recomputed !== e.hash) {
      return { valid: false, brokenAt: i, reason: 'entry content does not match its hash' };
    }
    expectedPrev = e.hash;
  }
  return { valid: true };
}

module.exports = { GENESIS_HASH, sha256, canonical, computeEntryHash, createEntry, verifyChain };
