import * as esbuild from 'esbuild';
import * as tsc from 'typescript';
import GlobalsPlugin from 'esbuild-plugin-globals';

async function build() {
  const entrypoint = 'src/vue-p5.ts';

  const esbuildCommonOptions: esbuild.BuildOptions = {
    bundle: true,
    entryPoints: [entrypoint],
    minify: true,
    sourcemap: true,
    target: 'es2015',
  };

  // for Node
  await esbuild.build({
    ...esbuildCommonOptions,
    format: 'esm',
    outdir: 'dist/esm',
    external: ['vue', 'p5', '@vue/composition-api'],
  });

  // for browsers
  await esbuild.build({
    ...esbuildCommonOptions,
    format: 'iife',
    outdir: 'dist/iife',
    globalName: 'VueP5',
    plugins: [GlobalsPlugin({
      vue: 'Vue',
      p5: 'p5',
      '@vue/composition-api': 'VueCompositionAPI',
    })],
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
}

build().catch(e => {
  console.error(e);
  process.exit(1);
});
