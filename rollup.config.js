export default {
  input: './src/placeholder.js',
  output: [
    {
      file: './dist/index.js',
      format: 'cjs',
    },
    {
      file: './dist/index.mjs',
      format: 'esm',
    },
  ],
}
