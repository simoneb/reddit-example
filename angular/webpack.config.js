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
      test: /\.js$/,
      exclude: /(node_modules|bower_components)/,
      loader: 'babel', // 'babel-loader' is also a legal name to reference
      query: {
        presets: ['es2015', 'stage-0']
      }
    }]
  }
};