import webpack, { Configuration } from 'webpack';
import path from 'path';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import TerserPlugin from 'terser-webpack-plugin';

const ASSET_PATH: string = process.env.ASSET_PATH || '/';

var extensions: string[] = ['.ts', '.png'];
var options: Configuration = {
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
  entry: {
    service_worker: path.join(__dirname, 'src', 'service_worker.ts'),
    content_script: path.join(__dirname, 'src', 'content_script.ts'),
  },
  output: {
    clean: true,
    path: path.resolve(__dirname, 'build'),
    filename: '[name].bundle.js',
    publicPath: ASSET_PATH,
  },
  module: {
    rules: [
      { test: /\.(ts|tsx)$/, loader: 'ts-loader', exclude: /node_modules/ },
    ],
  },
  resolve: {
    extensions,
  },
  plugins: [
    // expose and write the allowed env vars on the compiled bundle
    new webpack.EnvironmentPlugin(['NODE_ENV']),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: 'manifest.json',
          to: path.join(__dirname, 'build'),
          transform: function (content, path) {
            // generates the manifest file using the package.json informations
            return Buffer.from(
              JSON.stringify({
                description: process.env.npm_package_description,
                version: process.env.npm_package_version,
                ...JSON.parse(content.toString()),
              })
            );
          },
        },
        {
          from: 'src/icons/icon-*.png',
          to: `${path.join(__dirname, 'build')}/[name][ext]`,
        },
      ],
    }),
  ],
  infrastructureLogging: {
    level: 'info',
  },
};

if (process.env.NODE_ENV === 'development') {
  options.devtool = 'source-map';
} else {
  options.optimization = {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        extractComments: false,
      }),
    ],
  };
}

module.exports = options;
