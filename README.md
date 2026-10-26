# SpillProof

A tamper-evident digital platform for oil spill Joint Investigation Visits (JIVs).

Individual capstone project, Software Development track, NCDMB/SEPLAT Human Capacity Development Digital Initiative.
Author: Musa Abubakar Sadiq

## The problem

After an oil spill, a Joint Investigation Visit brings the operator, regulators, the host community and the state environment ministry to the site to establish the spill's cause and volume. Public reports show these findings are often disputed, and the evidence behind them sits in paper forms, personal phones and chat threads. No party holds a neutral, verifiable record.

## The idea

SpillProof gives each spill a shared digital case file:

- Evidence files get a SHA-256 hash, a server timestamp and a GPS reading at upload.
- Every action is written to a hash-chained audit log, so any later edit to history is detectable.
- Each party can agree or dispute each finding (cause, volume, extent) with a recorded reason.
- A case closes with an exportable PDF dossier carrying a verification code.

## Project status

**Stage: design and planning.** Implementation has started only with the integrity core.

| Item | Status |
| --- | --- |
| Problem definition and desk research | Complete |
| Requirements (personas, user stories) | Complete (desk research only, no interviews yet) |
| Architecture and data model | Complete (design) |
| UI wireframes | Low-fidelity sketches in `docs/wireframes.md` |
| Hash-chain core (`server/src/hashChain.js`) | Initial version with unit tests |
| Authentication, cases, evidence upload, UI | Not started |

## Planned stack

React, Node.js with Express, MongoDB Atlas, JWT authentication, Node `crypto` for SHA-256.

## Repository layout

```
spillproof/
  README.md
  docs/
    requirements.md     personas and user stories
    architecture.md     system architecture diagram
    data-model.md       collections and fields
    wireframes.md       five low-fidelity screens
  client/               React app (not started)
  server/
    src/
      hashChain.js      SHA-256 hashing and audit-chain verification
      routes/           API routes (not started)
      models/           MongoDB models (not started)
      middleware/       auth and role checks (not started)
      services/         evidence, audit, dossier services (not started)
    test/
      hashChain.test.js
    package.json
```

## Run the tests

Requires Node.js 18 or newer.

```
cd server
npm test
```

## Roadmap

1. Foundation: authentication, roles, case create and view
2. Evidence upload with hashing, timestamp and GPS
3. Hash-chained audit log and verification routine
4. JIV scheduling, findings, agree or dispute
5. Deadline tracker and PDF dossier
6. Testing with simulated cases, including tampering tests
7. Documentation and demo

## Known limits

- A hash shows a file has not changed since upload, not that it was authentic when captured.
- Device GPS can be faked, so location is supporting information only.
- An administrator with full database access could rebuild the whole chain; a later phase would publish periodic chain-head hashes to all parties.
- Legal reporting and investigation timelines must be confirmed before they are hard-coded.

## References

- ICIR, NOSDRA concludes probe of oil spill from Shell's facility at Angiama in Bayelsa
- Amnesty International, Oil spill investigations in the Niger Delta
- Sweetcrude Reports, JIV remains inconclusive in SPDC/NNPCL's Eleme oil spills
