# Data model

MongoDB collections (design stage). `_id` fields are omitted.

## users
| Field | Type | Notes |
| --- | --- | --- |
| name | string | |
| email | string | unique |
| passwordHash | string | bcrypt |
| role | enum | community, operator, regulator, ministry, admin |
| organisation | string | |
| createdAt | date | |

## cases
| Field | Type | Notes |
| --- | --- | --- |
| reference | string | unique case number |
| location | object | description, latitude, longitude |
| spillDate | date | |
| description | string | |
| status | enum | open, jiv_scheduled, findings_recorded, closed |
| ownerId | ref users | |
| parties | array | `{ userId, role }` invited parties |
| createdAt | date | |

## evidence
| Field | Type | Notes |
| --- | --- | --- |
| caseId | ref cases | |
| uploaderId | ref users | |
| fileName | string | |
| mimeType | string | |
| sha256 | string | hash computed by the server |
| serverTimestamp | date | server time at upload |
| gps | object | latitude, longitude from the device; supporting info only |
| storageKey | string | key in file storage |

## jiv_events
| Field | Type | Notes |
| --- | --- | --- |
| caseId | ref cases | |
| scheduledAt | date | |
| venue | string | |
| invitees | array | user ids |
| attendance | array | `{ userId, attended }` |

## findings
| Field | Type | Notes |
| --- | --- | --- |
| caseId | ref cases | |
| type | enum | cause, volume, extent |
| statement | string | |
| authorId | ref users | |
| createdAt | date | |

## responses
| Field | Type | Notes |
| --- | --- | --- |
| findingId | ref findings | |
| partyId | ref users | |
| decision | enum | agree, dispute |
| reason | string | required when disputing |
| createdAt | date | responses are append-only |

## audit_log
| Field | Type | Notes |
| --- | --- | --- |
| caseId | ref cases | |
| actorId | ref users | |
| action | string | for example `evidence.upload` |
| payload | object | summary of what changed |
| timestamp | date | server time |
| prevHash | string | hash of the previous entry; 64 zeros for the first |
| hash | string | SHA-256 over the entry's fields and `prevHash` |

## Relationships

- A case has many evidence items, findings, JIV events and audit entries.
- A finding has many responses, one per party.
- Audit entries form a chain per case through `prevHash` and `hash`.
