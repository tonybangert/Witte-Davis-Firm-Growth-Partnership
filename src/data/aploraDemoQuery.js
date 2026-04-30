// The simulated Aplora Legal query and response surfaced in Section 5.
//
// Per the brief, this is the single most important credibility moment in the
// deck. Ned and Heather will mentally evaluate the response as if it were real
// legal output. Citations should reference real regulatory frameworks. State
// soil action levels should be plausible and defensible.
//
// Source library list and query string are filled in. The substantive response
// body is the human-authored portion below: Tony has the PFAS domain
// expertise to make it accurate.

export const aploraDemo = {
  query:
    'Compare PFAS soil action levels across Wisconsin, North Carolina, Kentucky, and Texas. Note any pending regulatory changes and flag implications for a manufacturing client with operations in all four states.',

  sources: [
    'CERCLA §121',
    'WDNR NR 700 series',
    'NC DEQ IHSB',
    'KY DEP guidance',
    'TX TCEQ TRRP',
    'ASTM AC417',
    'CA SB 253 / 261',
    'EU CSRD'
  ],

  response: `Comparison of residual PFOA and PFOS soil action levels for industrial direct-contact exposure across the four jurisdictions where the client maintains operations.

State          PFOA (ng/g)    PFOS (ng/g)    Framework
Wisconsin       1.3            1.3            WDNR NR 720, residual contaminant levels [1]
North Carolina  4.0            4.0            NC DEQ IHSB preliminary soil remediation goals [2]
Kentucky       Narrative      Narrative       KY DEP risk-based corrective action, no numeric standard published [3]
Texas           5.7            6.3            TCEQ TRRP Tier 1 PCLs, commercial / industrial [4]

Pending regulatory changes:
WDNR has a draft NR 720 revision in stakeholder review that would lower the PFOA RCL toward 0.4 ng/g and add an aggregate sum-of-six standard. NC DEQ is tracking the EPA May 2024 MCL rule and is expected to refresh IHSB values within the next two cycles. Kentucky has signaled adoption of numeric values pending EPA finalization of soil regional screening levels.

Considerations for your client:
· Sequence Phase II site assessments in Wisconsin first. The pending NR 720 revision will reset the remediation cost basis, and any pre-revision closure has materially better defensibility.
· Climate disclosure exposure is now joined to the PFAS posture. CA SB 253 reporting obligations attach to the parent if California revenue thresholds are met, regardless of where the contamination sits, and CSRD double-materiality scoping will pull all four sites into the EU report.
· Any pending M&A or refinancing should carry forward-looking PFAS indemnity language tied to the WI and NC trajectories specifically, not generic "applicable law" clauses. Standard reps will not survive the next regulatory cycle.

Citations: [1] Wis. Admin. Code NR 720.12, Table 1. [2] NC DEQ IHSB Residential and Industrial Health-Based PSRGs, current edition. [3] 401 KAR 100:030 risk-based corrective action. [4] 30 TAC §350, Tier 1 commercial / industrial PCLs.`
}
