# AI Usage

Please fill this out as part of your submission.

We allow AI tools, documentation, search, StackOverflow, and normal developer assistance. The important part is that you understand and can explain the final solution.

<!-- !!!IMPORTANT!!! -->
Abusing AI to do all/most the work for you might get you disqualified, we scan your codebase using AI detection tools and compare it to what you disclose here. It is highly advised to be as transparent as possible regarding the use of AI/AGENTIC TOOLS.
<!-- !!!IMPORTANT!!! -->

## Did You Use AI?

Answer one:

- Yes

## Tools Used

List any AI tools or assistants you used.

claude

## Where AI Helped

A general explanation of blockchain and `.sol` files. Encoding the new function signatures. Guidance on using the `Eip1193Provider` type.
Wrote frontend/chat.html and frontend/src/chat/main.tsx from scratch, restored
frontend/index.html after it was accidentally overwritten, and directly fixed
import paths in ChatApp.tsx and prop-type bugs in MessageBubble.tsx and
MessageList.tsx that were blocking compilation.
All CSS was written by AI.

## Prompts Or Questions Asked

Asked Claude to explain: what an ABI is and why encodedAbi.ts drifted from
LabRegistry.sol, Solidity `view`/state mutability, the EIP-1193 provider
type, why loadExperiments used tx.wait() incorrectly, general blockchain/
consensus concepts, and TypeScript typing questions (useState generics,
Array.find() returning T | undefined, component prop types). Also asked
for help debugging specific TypeScript compiler errors as they came up,
and for guidance on structuring the Part 3 chat UI (state shape, file
layout, immutable state updates) without Claude implementing it directly.

## What You Personally Verified

Before applying any suggestion, I made sure I understood Claude's
explanation and agreed with the reasoning behind each fix, rather than
copying changes blindly. I ran the project locally myself and tested
each fix in practice. For the CSS Claude wrote, I visually checked that
it rendered correctly in the browser.

One thing I did not independently verify: the correctness of the base64
ABI encoding Claude generated for me — I used it as given without
decoding it myself to double-check it matched the intended signatures.

## Anything AI Suggested That You Rejected

Claude suggested removing the base64 encoding in encodedAbi.ts entirely
in favor of a plain readable array. I kept the base64 approach and only
fixed its contents.