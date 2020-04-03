const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const globule = require('globule')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const app = {
  mode: 'production',
  // devtool: 'eval-source-map',
  entry: {
    main: './src/javascripts/index.js',
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'javascripts/[name]-[hash].js',
  },
  performance: {
    maxEntrypointSize: 500000,
    maxAssetSize: 500000,
  },
  module: {
    rules: [
      {
        test: /\.(css|scss|sass)$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: 'css-loader',
            options: { sourceMap: true },
          },
          {
            loader: "postcss-loader",
            options: {
              plugins: [
                require("autoprefixer"),
              ],
            },
          },
          {
            loader: 'sass-loader',
          },
        ],
      },
      {
        test: /\.(png|jpg|jpeg)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              esModule: false,
              name: 'images/[name]-[hash].[ext]',
              publicPath: path => '../' + path,
            },
          },
          {
            loader: 'image-webpack-loader',
            options: {
              mozjpeg: {
                progressive: true,
                quality: 65,
              },
            },
          },
        ],
      },
      {
        test: /\.pug/,
        use: [
          {
            loader: 'html-loader',
          },
          {
            loader: 'pug-html-loader',
            options: {
              pretty: true,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'stylesheets/[name]-[hash].css',
    }),
    new CleanWebpackPlugin(),
  ],
};

const templates = globule.find(
  './src/templates/**/*.pug', {
    ignore: [
      './src/templates/**/_*.pug'
    ]
  }
)

templates.forEach((template) => {
  const fileName = template.replace('./src/templates/', '').replace('.pug', '.html')
  app.plugins.push(
    new HtmlWebpackPlugin({
      filename: `${fileName}`,
      template: template,
    })
  )
})

module.exports = app