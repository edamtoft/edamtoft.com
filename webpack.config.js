const path = require("path");

module.exports = {
  entry: {
    "index": "./_js/index.ts"
  },
  output: {
    path: path.resolve(__dirname, "assets"),
    filename: "[name].js"
  },
  resolve: {
    extensions: [".js", ".ts"]
  },
  module: {
    rules: [{ test: /\.ts$/, exclude: /node_modules/, loader: "ts-loader" }]
  }
};