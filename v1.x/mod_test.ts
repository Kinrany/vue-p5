import { assertEquals } from "https://deno.land/std@0.218.2/assert/mod.ts";
import { add } from "./mod.ts";

Deno.test("basic test", () => {
  assertEquals(add(1, 2), 3);
});
