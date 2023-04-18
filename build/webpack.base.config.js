const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const { VueLoaderPlugin } = require('vue-loader');

module.exports = {
  entry: {
    app: './src/index.js',
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': path.join(process.cwd(), 'src'),
      'static': path.join(process.cwd(), 'static')
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          esModule: false,
          limit: 10000, // falls back to file-loader for files larger than this
          name: 'static/img/[name].[hash:7].[ext]'
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          esModule: false,
          limit: 10000, // falls back to file-loader for files larger than this
          name: 'static/fonts/[name].[hash:7].[ext]'
        }
      }
    ]
  },
  plugins: [
    new webpack.ProvidePlugin({
      Vue: ['vue/dist/vue.esm.js', 'default'],
      Vuex: ['vuex/dist/vuex.esm.js', 'default'],
      _: 'lodash',
      axios: ['axios/dist/browser/axios.cjs', 'default'],
      moment: 'moment',
    }),
    new VueLoaderPlugin(),
    new webpack.DefinePlugin({
      VERSION: JSON.stringify(JSON.parse(fs.readFileSync('package.json')).version),
    }),
  ],
  stats: {
    modules: false,
    children: false,
  },
};
