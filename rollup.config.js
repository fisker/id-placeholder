export default {
  input: './src/placeholder.js',
  output: [
    {
      file: './dist/index.cjs',
      format: 'cjs',
      exports: 'auto',
    },
    {
      file: './dist/index.mjs',
      format: 'esm',
    },
  ],
}
