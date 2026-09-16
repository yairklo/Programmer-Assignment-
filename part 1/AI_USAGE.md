# AI Usage

Please fill this out as part of your submission.

We allow AI tools, documentation, search, StackOverflow, and normal developer assistance. The important part is that you understand and can explain the final solution.

<!-- !!!IMPORTANT!!! -->
Abusing AI to do all/most the work for you might get you disqualified, we scan your codebase using AI detection tools and compare it to what you disclose here. It is highly advised to be as transparent as possible regarding the use of AI/AGENTIC TOOLS.
<!-- !!!IMPORTANT!!! -->

## Did You Use AI?

Yes

## Tools Used

Claude (Claude Code).

## Where AI Helped

- `part-2-save-the-lab/frontend/src/web3/encodedAbi.ts`: Claude explained what the base64-encoded ABI blob actually decodes to, and why it was out of sync with the `view` fix required in `LabRegistry.sol` (the manually-embedded ABI signatures did not have `view` on `getAllExperiments`/`getResultCount`, so ethers would keep treating reads as transactions even after the Solidity source was fixed).
- Claude walked through, line by line, how each corrected ABI signature maps back to the Solidity source in `LabRegistry.sol` (e.g. why the `Experiment` struct becomes `tuple(uint256 id,string title,address owner,bool active)` in the ABI, and why Solidity-only data-location keywords like `memory`/`calldata` are dropped when writing an ABI signature).
- Claude explained several ways to regenerate the base64 string myself (Node REPL with `Buffer`, a shell one-liner with `base64`, or the browser console with `btoa`/`atob`) and how to round-trip decode it to check for typos, but did not write the final base64 string into the repository — I generated and pasted it in myself.
- General background explanations (not applied directly to code): what Solidity `view` means and why it avoids a wallet transaction, what an ABI is and why it can drift from the contract source, and general blockchain/PoS concepts for my own understanding.

## Prompts Or Questions Asked

- "מה זה EthereumWindow? Window היא מילה שמורה בטייפסקריפט?"
- "מה עוד שבור בקוד, מה זה Solidity view"
- "מה זה בעצם הencodedAbi? למה הוא קיים? איך הייתי אמור לדעת שהוא משפיע על הקוד שלי?"
- "אני לא מבין איך אני אמור לדעת לתקן את ABI, יש משהו שמריצים על הקוד כדי ליצור קובץ חדש?"
- "איך ידעת מה בדיוק להכניס לפונקציה btoa(JSON.stringify([])) פשוט את כל הקובץ עם הסיומת sol?"
- "תסביר לי איך אני בעצמי יכול לקודד מחדש ולהשיג את הbase64 המתוקן. אל תבצע בעצמך."

## What You Personally Verified

- Compared each ABI signature Claude explained against the actual `LabRegistry.sol` source myself, field by field, to confirm the struct-to-tuple mapping and parameter order were correct.
- Generated the corrected base64 string myself (not by having the AI write it into the file) and round-trip decoded it to confirm it matches the intended JSON array before pasting it into `encodedAbi.ts`.
- Ran `npm run typecheck` after applying the fix to confirm no TypeScript errors remained.

## Anything AI Suggested That You Rejected

Claude suggested replacing the base64-encoded ABI entirely with a plain readable array (removing the encoding layer) as the more robust long-term fix. I have not decided yet whether to take that route instead of just correcting the existing base64 string — will finalize before submission.
