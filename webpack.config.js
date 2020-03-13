// Import path for resolving file paths
var path = require('path');
module.exports = {
  target: "node",
  mode: 'production',
  // Specify the entry point for our app.
  entry: [
    path.join(__dirname, 'src/handlers/index.js')
  ],
  // Specify the output file containing our bundled code
  output: {
    libraryTarget: 'commonjs',
    path: __dirname,
    filename: 'build/index.js'
  },
}
