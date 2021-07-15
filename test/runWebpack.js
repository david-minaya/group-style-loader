import path from 'path';
import Webpack from 'webpack';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import execute from './helpers/execute';
import { createFsFromVolume, Volume } from 'memfs';

export function runWebpack(entry, options) {

  const webpack = Webpack({
    context: path.resolve(__dirname, 'src'),
    entry: path.resolve(__dirname, 'src', entry),
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'bundle.js'
    },
    plugins: [new MiniCssExtractPlugin()],
    module: {
      rules: [
        {
          test: /\.css$/,
          use: [
            {
              loader: path.resolve(__dirname, '../src/loader.js'),
              options
            },
            MiniCssExtractPlugin.loader,
            {
              loader: "css-loader",
              options: {
                modules: true
              }
            }
          ]
        }
      ]
    }
  });

  webpack.outputFileSystem = createFsFromVolume(new Volume());
  webpack.outputFileSystem.join = path.join.bind(path);

  return new Promise((resolve, reject) => {

    webpack.run((err, stats) => {

      if (err) reject(err);
      if (stats.hasErrors()) reject(stats.toJson().errors);

      try {
        resolve(execute('bundle.js', webpack.outputFileSystem, stats));
      } catch (err) {
        reject(err);
      }
    });
  });
};
