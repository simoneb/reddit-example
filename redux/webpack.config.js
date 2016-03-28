var path = require("path");

module.exports = {
  entry: {
    app: [path.resolve(__dirname, "app/main.js")]
  },
  output: {
    filename: "bundle.js"
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      exclude: /(node_modules|bower_components)/,
      loader: 'babel', // 'babel-loader' is also a legal name to reference
      query: {
        presets: ['react', 'es2015', 'stage-0']
      }
    }]
  }
};