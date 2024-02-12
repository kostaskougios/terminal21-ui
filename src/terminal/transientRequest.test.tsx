import { shouldProcessTransientRequestWith } from "./transientRequest";

test("request not processed", () => {
  expect(shouldProcessTransientRequestWith("req1")).toBe(true);
});

test("request already processed", () => {
  shouldProcessTransientRequestWith("req2");
  expect(shouldProcessTransientRequestWith("req2")).toBe(false);
});
