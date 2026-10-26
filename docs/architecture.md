# Architecture

SpillProof is a three-tier web application with a separate evidence store and an integrity layer.

```mermaid
flowchart TD
    C["Web client (React)<br/>Community, Operator, Regulator, Ministry, Admin"]
    subgraph API["API server (Node.js, Express)"]
        A["Auth and roles<br/>JWT + role checks"]
        E["Evidence service<br/>SHA-256 hash, server timestamp"]
        L["Audit chain<br/>each entry stores previous hash"]
        D["Dossier export<br/>PDF with verification code"]
    end
    DB[("MongoDB Atlas<br/>cases, evidence hashes, audit log")]
    F[("File storage<br/>evidence files, provider to be chosen")]

    C -->|HTTPS| A
    A --> E
    A --> L
    A --> D
    E --> DB
    E --> F
    L --> DB
    D --> DB
```

## Request flow for an evidence upload

1. The client sends the file with a JWT.
2. The auth layer checks the user's role and access to the case.
3. The evidence service computes the SHA-256 hash, adds the server timestamp, stores the file and saves the metadata.
4. The audit chain appends an entry containing the previous entry's hash.
5. The API returns the hash and timestamp to the client.

## Planned hosting

Vercel (client) and Render (API), as in earlier programme projects.
