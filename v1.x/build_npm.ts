import { build, emptyDir } from "https://deno.land/x/dnt@0.40.0/mod.ts";
import config from "./deno.json" with { type: "json" };

await emptyDir("./npm");

await build({
  entryPoints: ["./mod.ts"],
  outDir: "./npm",
  shims: {
    // see JS docs for overview and more options
    deno: true,
  },
  package: {
    // package.json properties
    name: "@vue-p5/vue-p5",
    version: config.version,
    description: "Vue component for p5.js",
    license: "LGPL-2.1",
    repository: {
      type: "git",
      url: "git+https://github.com/kinrany/vue-p5.git",
    },
    bugs: {
      url: "https://github.com/kinrany/vue-p5/issues",
    },
  },
  postBuild() {
    // steps to run after building and before running the tests
    // Deno.copyFileSync("LICENSE", "npm/LICENSE");
    // Deno.copyFileSync("README.md", "npm/README.md");
  },
});
