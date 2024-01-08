const webpack = require("webpack");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");

module.exports = {
  mode: "development",
  devServer: {
    hot: true,
    open: true,
    port: process.env.PORT,
  },

  devtool: "inline-source-map",
  plugins: [
    new webpack.DefinePlugin({
      "process.env.PORT": JSON.stringify(process.env.PORT),
    }),
    new ReactRefreshWebpackPlugin(),
  ],
};
