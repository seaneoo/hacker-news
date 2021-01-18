const path = require("path");
// const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const HtmlPlugin = require("html-webpack-plugin");
const dist = path.resolve(__dirname, "dist");

module.exports = {
  entry: "./src/index.ts",

  output: {
    path: dist,
    filename: "bundle.[contenthash].js",
  },

  devtool: "inline-source-map",
  devServer: {
    contentBase: dist,
    compress: true,
    port: 3000,
  },

  // optimization: { minimizer: [new UglifyJsPlugin()] },

  module: {
    rules: [
      {
        // TypeScript
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: "/node_modules/",
      },

      {
        // CSS
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
    ],
  },

  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },

  plugins: [
    new HtmlPlugin({
      template: "./public/index.html",
    }),
  ],
};
