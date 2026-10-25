const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const webpack = require("webpack");

const root = path.resolve(__dirname, "../..");

module.exports = (env, argv) => {
  const isProd = argv.mode === "production";
  return {
    entry: path.resolve(root, "apps/client/src/main.ts"),
    output: {
      path: path.resolve(root, "dist"),
      filename: isProd ? "bundle.[contenthash].js" : "bundle.js",
      clean: true,
      assetModuleFilename: "assets/[hash][ext][query]",
    },
    resolve: {
      extensions: [".ts", ".tsx", ".js"],
      alias: {
        "@core": path.resolve(root, "packages/core/src"),
        "@game": path.resolve(root, "packages/game/src"),
        "@shared": path.resolve(root, "packages/shared/src"),
        "@ui": path.resolve(root, "packages/ui/src"),
        "@net": path.resolve(root, "packages/net/src"),
        "@audio": path.resolve(root, "packages/audio/src"),
      },
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: {
            loader: "ts-loader",
            options: { transpileOnly: true },
          },
          exclude: /node_modules/,
        },
        {
          test: /\.(png|jpg|jpeg|gif|svg|glb|gltf|hdr|exr|ogg|mp3|wav)$/i,
          type: "asset/resource",
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: path.resolve(root, "apps/client/index.html"),
        title: "O Mundo de Zephyria",
      }),
      new CopyWebpackPlugin({
        patterns: [
          { from: path.resolve(root, "assets"), to: "assets", noErrorOnMissing: true },
        ],
      }),
      new webpack.EnvironmentPlugin({
        API_BASE_URL: "http://localhost:3000",
        TELEMETRY_ENABLED: false,
        NODE_ENV: isProd ? "production" : "development",
      }),
    ],
    devServer: {
      static: path.resolve(root, "dist"),
      port: 8080,
      hot: true,
      open: false,
    },
    devtool: isProd ? "source-map" : "eval-source-map",
  };
};
