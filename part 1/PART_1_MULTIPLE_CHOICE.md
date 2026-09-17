# Part 1: Multiple Choice

Choose the best answer for each question.

## Question 1: Broken Code, Explain The Bug

The UI sometimes shows "Saved" even when the request failed.

```ts
async function saveResearchNote(note: ResearchNote) {
  setStatus("saving");

  api.saveNote(note);

  setStatus("saved");
}
```

What is the most likely bug?

A. The API call is not awaited, so the UI marks the operation as saved before the request succeeds or fails.

B. `setStatus` cannot be called twice inside one function.

C. `async` functions cannot accept typed parameters.

D. The note must be saved to localStorage before calling the API.

**Answer: A**

## Question 2: Broken Code, Explain The Bug

Loading experiments asks the wallet to approve a transaction.

```solidity
function getAllExperiments() public returns (Experiment[] memory) {
    return experiments;
}
```

```ts
const tx = await contract.getAllExperiments();
await tx.wait();
setExperiments(tx);
```

What is the most likely bug?

A. Solidity cannot return arrays of structs.

B. The function is read-only but is not marked `view`, and the frontend treats the read as a transaction.

C. `tx.wait()` is required for every contract call.

D. The contract must emit an event before returning data.

**Answer: B**

## Question 3: Broken Code, Choose The Best Fix

The backend endpoint lets a user read any lab result if they know another wallet address.

```ts
app.get("/api/results/:wallet", async (req, res) => {
  const results = await db.results.findMany({
    where: { wallet: req.params.wallet },
  });

  res.json(results);
});
```

What is the best fix?

A.

```ts
if (!req.headers.authorization) {
  return res.status(401).end();
}
```

B.

```ts
const user = requireUser(req);

if (user.wallet.toLowerCase() !== req.params.wallet.toLowerCase()) {
  return res.status(403).end();
}

const results = await db.results.findMany({
  where: { wallet: user.wallet },
});

res.json(results);
```

C.

```ts
const results = await db.results.findMany();
res.json(results);
```

D.

```ts
res.setHeader("Access-Control-Allow-Origin", "*");
res.json(results);
```

**Answer: B**

## Question 4: Broken Code, Choose The Best Fix

The UI mutates state directly. Sometimes React does not re-render after an experiment status changes.

```tsx
function markCompleted(id: string) {
  const experiment = experiments.find((item) => item.id === id);

  if (experiment) {
    experiment.status = "completed";
  }

  setExperiments(experiments);
}
```

What is the best fix?

A.

```tsx
function markCompleted(id: string) {
  experiments.forEach((experiment) => {
    if (experiment.id === id) {
      experiment.status = "completed";
    }
  });

  setExperiments(experiments);
}
```

B.

```tsx
function markCompleted(id: string) {
  setExperiments((prev) =>
    prev.map((experiment) =>
      experiment.id === id
        ? { ...experiment, status: "completed" }
        : experiment,
    ),
  );
}
```

C.

```tsx
function markCompleted(id: string) {
  window.location.reload();
}
```

D.

```tsx
function markCompleted(id: string) {
  setTimeout(() => {
    experiment.status = "completed";
  }, 0);
}
```
**Answer: B**