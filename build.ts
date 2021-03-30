import * as esbuild from 'esbuild';
import * as tsc from 'typescript';

const entrypoint = 'src/vue-p5.ts';

const esbuildCommonOptions: esbuild.BuildOptions = {
  bundle: true,
  entryPoints: [entrypoint],
  external: ['vue', 'p5', '@vue/composition-api'],
  minify: true,
  sourcemap: true,
  target: 'es2015',
};

esbuild.buildSync({
  ...esbuildCommonOptions,
  format: 'esm',
  outdir: 'dist/esm',
});

esbuild.buildSync({
  ...esbuildCommonOptions,
  format: 'iife',
  outdir: 'dist/iife',
  globalName: 'VueP5',
});

const emitResult = tsc.createProgram({
  rootNames: [entrypoint],
  options: {
    declaration: true,
    declarationMap: true,
    emitDeclarationOnly: true,
    esModuleInterop: true,
    isolatedModules: true,
    module: tsc.ModuleKind.ES2015,
    moduleResolution: tsc.ModuleResolutionKind.NodeJs,
    noEmitOnError: true,
    outDir: 'dist',
    rootDir: 'src',
    skipLibCheck: true,
    strict: true,
    target: tsc.ScriptTarget.ES2015,
  },
}).emit();

if (emitResult.emitSkipped) {
  console.error('Failed to build declaration files.', emitResult.diagnostics);
  process.exit(1);
}
