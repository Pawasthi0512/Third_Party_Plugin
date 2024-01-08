const HtmlWebpackPlugin = require("html-webpack-plugin");
const InlineChunkHtmlPlugin = require("react-dev-utils/InlineChunkHtmlPlugin");
const path = require("path");
const Dotenv = require("dotenv-webpack");
require("dotenv").config();

module.exports = {  
  entry: {
    ui: "./src/index.tsx",
    code: "./src/host/index.jsx",
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js", ".jsx"],
  },
  module: {
    rules: [
      { test: /\.tsx?$/, use: "ts-loader", exclude: /node_modules/ },

      { test: /\.css$/, use: ["style-loader", { loader: "css-loader" }] },

      { test: /\.(png|jpg|gif|webp|svg)$/, loader: "url-loader" },

      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-react", "@babel/preset-env"],
          },
        },
      },
    ],
  },

  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "../dist"),
    publicPath: "",
  },
  mode: "development",
  plugins: [
    new Dotenv(),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
      filename: "index.html",
      chunks: ["ui"],
      cache: false,
    }),
    new InlineChunkHtmlPlugin(HtmlWebpackPlugin, [/ui/]),
  ],
};
