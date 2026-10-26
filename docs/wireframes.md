# Wireframes (low fidelity)

Rough sketches of the five core screens. These are layout ideas, not final designs.

## 1. Login

```
+--------------------------------+
|           SpillProof           |
|                                |
|  Email     [________________]  |
|  Password  [________________]  |
|                                |
|          [   Log in   ]        |
|   Forgot password?   Register  |
+--------------------------------+
```

## 2. Case list

```
+--------------------------------------------------+
| SpillProof            [+ New case]   [Name v]    |
+--------------------------------------------------+
| Search [______________]  Status [All v]          |
+--------------------------------------------------+
| Ref        Location       Date      Status       |
| SP-0003    Community A    24 Oct    JIV set      |
| SP-0002    Community B    12 Oct    Open         |
| SP-0001    Community C    02 Oct    Closed       |
+--------------------------------------------------+
```

## 3. Case detail

```
+--------------------------------------------------+
| < Cases      SP-0003 - Community A     [Export]  |
+--------------------------------------------------+
| Status: JIV scheduled        Deadline: 2 days    |
+--------------------------------------------------+
| [Evidence] [JIV] [Findings] [Audit log]          |
+--------------------------------------------------+
| Evidence (3)                    [+ Upload]       |
|  photo1.jpg   a3f9...c21   24 Oct 10:42  GPS ok  |
|  photo2.jpg   77be...09d   24 Oct 10:44  GPS ok  |
|  report.pdf   1c0d...e4a   24 Oct 11:05  no GPS  |
+--------------------------------------------------+
| Audit chain: VALID          [Verify now]         |
+--------------------------------------------------+
```

## 4. Evidence upload

```
+--------------------------------+
| Upload evidence    SP-0003     |
+--------------------------------+
|  [ Choose file / take photo ]  |
|                                |
|  Description [______________]  |
|  Location    [Use my GPS]      |
|                                |
|  After upload you will see:    |
|   - SHA-256 hash               |
|   - server timestamp           |
|                                |
|  [ Cancel ]      [ Upload ]    |
+--------------------------------+
```

## 5. Findings sign-off

```
+--------------------------------------------------+
| Findings - SP-0003                               |
+--------------------------------------------------+
| Cause:   Equipment failure           (Regulator) |
|   Operator: Agree    Community: Dispute          |
|   Reason: "Valve was reported faulty in March"   |
|                                                  |
| Volume:  43 barrels                  (Regulator) |
|   Operator: Agree    Community: [Agree][Dispute] |
|   Reason: [_____________________________]       |
|                                                  |
| [ Save my responses ]                            |
+--------------------------------------------------+
```
