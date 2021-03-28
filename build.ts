import * as esbuild from 'esbuild';
import * as tsc from 'typescript';

const entrypoint = 'src/vue-p5.ts';

const esbuildCommonOptions: esbuild.BuildOptions = {
  bundle: true,
  define: { 'process.env.NODE_ENV': '"production"' },
  entryPoints: [entrypoint],
  external: ['vue', 'p5'],
  minify: true,
  sourcemap: true,
  target: 'es2015',
};

esbuild.buildSync({
  ...esbuildCommonOptions,
  format: 'cjs',
  outdir: 'dist/commonjs',
});

esbuild.buildSync({
  ...esbuildCommonOptions,
  format: 'iife',
  outdir: 'dist/iife',
});

const emitResult = tsc.createProgram({
  rootNames: [entrypoint],
  options: {
    declaration: true,
    declarationMap: true,
    emitDeclarationOnly: true,
    esModuleInterop: true,
    isolatedModules: true,
    module: tsc.ModuleKind.CommonJS,
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
