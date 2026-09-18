# Part 2: Find The Bug

## Story

The team works on a research lab product with:

- React frontend
- Small Express backend
- Solidity contract
- Web3 integration through ethers

After returning from a holiday break, the lab discovered that the code no longer works:

- Loading experiments asks the wallet to approve a transaction.
- The frontend keeps reloading or duplicating experiments.
- Backend result filtering behaves strangely.
- Saving a result can fail with a payload hash mismatch.
- Contract reads and writes are not shaped correctly.
- Some generated Web3 artifacts are encoded and need inspection.
- The code is messy enough that the team does not trust it.

Your task: save the lab.

## Repo

The broken repo is in:

`part-2-save-the-lab`

## Requirements

Fix the project so that:

- Reading experiments is a read operation, not a wallet transaction.
- The frontend loads experiments once per relevant dependency and does not duplicate rows.
- Submitting a result still uses a transaction and waits for confirmation.
- The backend filters results correctly and does not corrupt stored data.
- The frontend and backend agree on how result payload hashes are calculated.
- The Solidity contract marks read functions correctly and validates result submissions.
- Your explanation identifies at least one issue in each layer: frontend, backend, Solidity, Web3 integration, and decoding/crypto.

## Notes

You do not need to deploy to a real chain.

You do not need to build production authentication.

You do not need to invent a full cryptography system. Keep the hash/decoding fixes practical and explain what they do and do not prove.

Prefer the smallest reliable fixes over a full rewrite.

## Explanation

**Frontend (`LabDashboard.tsx`):**
The `useEffect` that loaded experiments depended on `experiments` while also
calling `setExperiments` inside itself, creating an infinite reload/duplicate
loop. Changed the dependency array to `[]` so it runs once on mount.
Separately, `handleSubmit` called `saveResult(...)` without `await`, so the
UI showed "saved" even when the save request failed. Wrapped the whole
submit flow in `try/catch` with `await` on every async call.

**Backend (`server.js`):**
The `/api/results/:wallet` route mutated `result.wallet = wallet` inside the
`.filter()` callback before comparing, overwriting every stored result's
wallet with whatever address was queried and corrupting the in-memory data.
Removed the mutation so the filter only compares, never writes.

**Solidity (`LabRegistry.sol`):**
`getAllExperiments` and `getResultCount` were missing the `view` modifier,
so ethers treated these reads as transactions requiring a wallet signature.
Added `view` to both. Also added a `require` check (via a private
`_experimentExists` helper) in `submitResult` so it reverts for an
`experimentId` that doesn't exist, instead of silently accepting it.

**Web3 integration (`labContract.ts`):**
`loadExperiments` awaited `contract.getAllExperiments()` and then called
`tx.wait()` on the result, treating a (soon-to-be) read-only call as a
transaction. Removed `tx.wait()` once the contract method was marked
`view`. Also split contract access into a read-only path (`Contract`
backed by a `Provider`) and a write path (`Contract` backed by a
`Signer`), so viewing experiments no longer requires a connected wallet
at all, only submitting a result does.

**Decoding / crypto (`encodedAbi.ts`, `crypto.ts`, `server.js`):**
The ABI embedded in `encodedAbi.ts` as base64 was maintained by hand and
had drifted from the contract — its `getAllExperiments`/`getResultCount`
signatures didn't declare `view`, so even after fixing the Solidity
source, ethers would still have treated calls as transactions. Re-encoded
the ABI with the corrected signatures. Separately, the frontend
(`crypto.ts`) and backend (`server.js`) computed the result payload hash
with the note/wallet/experimentId fields in a different order, so the
hashes never matched and every save was rejected as a "payload hash
mismatch". Aligned both to `wallet:experimentId:note`. Note: this hash
only proves the note wasn't altered between signing and the backend
request — it is not itself stored immutably on-chain, so it does not
protect against the backend later changing the stored note.