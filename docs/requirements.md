# Requirements

**Method:** desk research only, from published reports on the JIV process. No interviews have been done. The personas are illustrative composites, not real people, and must be validated with practitioners before the requirements are treated as final.

## Personas

### 1. Community representative ("Ngozi", illustrative)
- **Role:** Elected or appointed representative of a host community, present at JIVs.
- **Goal:** Have the community's observations and objections recorded in a form that cannot be ignored.
- **Pain points (from public reports):** Disagreements over spill volume; declining to sign reports; waiting for reports to be released.
- **Constraints:** Limited data and device access; may be at a remote site.

### 2. Operator community liaison or HSE officer ("Tunde", illustrative)
- **Role:** Operator staff who report spills, attend JIVs and manage response.
- **Goal:** Show that the spill was reported and responded to on time, with a defensible record.
- **Pain points:** Allegations of late reporting or incomplete records; disputes that delay closure.
- **Constraints:** Must satisfy internal approvals and regulator deadlines.

### 3. Regulator investigator ("Amina", illustrative)
- **Role:** Regulator officer who leads or attends the JIV and signs off findings.
- **Goal:** Establish cause and volume from evidence that all parties accept as authentic.
- **Pain points:** Contested data, limited logistics, pressure over delays.
- **Constraints:** Needs a clear record of who attended and who agreed or disputed.

## User stories

| ID | As a... | I want to... | So that... |
| --- | --- | --- | --- |
| US-01 | Community representative | open a case with location, date and description | the incident is formally on record |
| US-02 | Operator officer | open a case for a spill and invite the other parties | all parties work from one case file |
| US-03 | Any invited party | upload photos, video and documents to a case | evidence is stored in one place |
| US-04 | Any party | see a SHA-256 hash, server timestamp and GPS reading for each upload | I can tell the file was not changed after upload |
| US-05 | Regulator investigator | schedule the JIV and log who attended | attendance is not disputed later |
| US-06 | Regulator investigator | record findings on cause, volume and extent | the official conclusions are written down |
| US-07 | Community representative | mark each finding as agreed or disputed with a reason | my objection is on record and cannot be overwritten |
| US-08 | Operator officer | mark each finding as agreed or disputed with a reason | the operator's position is on record |
| US-09 | Any party | see an audit log of every action in the case | I can see who did what and when |
| US-10 | Any party | run a verification check on the audit log | I can detect if history was altered |
| US-11 | Regulator investigator | see deadlines and overdue steps for a case | delays are visible, not hidden |
| US-12 | Any party | export a PDF dossier with a verification code | I can share the record outside the system |

## Non-functional requirements

- Role-based access: each party sees only cases it is invited to.
- Passwords stored hashed (bcrypt); login rate limiting.
- Usable on a low-end smartphone browser.
- Personal data handling follows the Nigeria Data Protection Act 2023.

## Open questions to validate

- What exactly must be recorded in a JIV, and by whom?
- Which legal deadlines apply, and from what event do they run?
- Would operators and regulators accept a third-party record, and who would host it?
