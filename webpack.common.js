const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  // Titik awal pembentukan dependencies
  entry: "./src/index.js",
  // Berkas yang dihasilkan
  output: {
    path: path.resolve(__dirname, ""),
    filename: "bundle.js"
  },
  module: {
    rules: [
      // Konfigurasi Loader CSS
      {
        test: /\.css$/,
        use: [{
            loader: "style-loader"
          }, {
            loader: 'css-loader'
          }]
      }
    ]
  },
  plugins: [
    // Konfigurasi Plugin HTML WebPack
    new HtmlWebpackPlugin({
      template: "./src/template.html",
      filename: "index.html"
    })
  ]
};
