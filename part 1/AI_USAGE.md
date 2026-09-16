# AI Usage

Please fill this out as part of your submission.

We allow AI tools, documentation, search, StackOverflow, and normal developer assistance. The important part is that you understand and can explain the final solution.

<!-- !!!IMPORTANT!!! -->
Abusing AI to do all/most the work for you might get you disqualified, we scan your codebase using AI detection tools and compare it to what you disclose here. It is highly advised to be as transparent as possible regarding the use of AI/AGENTIC TOOLS.
<!-- !!!IMPORTANT!!! -->

## Did You Use AI?

Answer one:

- Yes
- No

## Tools Used

List any AI tools or assistants you used.

## Where AI Helped

List the files, functions, or explanations where AI contributed.

- `part-2-save-the-lab/frontend/src/web3/encodedAbi.ts`: AI (Claude Code) explained how the base64-encoded ABI maps back to the Solidity source in `LabRegistry.sol` (e.g. the `Experiment` struct becoming `tuple(uint256 id,string title,address owner,bool active)`, and why `memory`/`calldata` are dropped), so I could work out and encode the corrected ABI string myself after adding `view` in Solidity.

## Prompts Or Questions Asked

Paste or summarize the main prompts/questions you asked.

## What You Personally Verified

Explain what you checked yourself before submitting.

## Anything AI Suggested That You Rejected

Mention one suggestion you did not use, or write "None."
