// production config
const { merge } = require("webpack-merge");
const { resolve } = require("path");

const commonConfig = require("./common");
const path = require('path')
const fs = require('fs')

module.exports = merge(commonConfig, {
  mode: "production",
  entry: {
    Input: path.resolve(__dirname, '../../src/components/Input'),
    InputSearch: path.resolve(__dirname, '../../src/components/InputSearch'),
    Tab: path.resolve(__dirname, '../../src/components/Tab'),
    Index: path.resolve(__dirname, '../../src/components/Index'),
  },
  output: {
    // filename: "js/bundle.[contenthash].min.js",
    path: resolve(__dirname, "../../lib"),
    filename: '[name]/index.js',
    library: 'my-custom-ui',
    libraryTarget: 'umd',
    publicPath: "/",
  },
  externals: {
    react: 'React',
  },
  devtool: "source-map",
  plugins: [

    {
      apply: (compiler) => {
          compiler.hooks.afterEmit.tap('AfterEmitPlugin', (compilation) => {
              // if (!fs.existsSync(path.resolve(__dirname, '../lib/theme'))) {
              //     fs.mkdirSync(path.resolve(__dirname, '../lib/theme'))
              // }
              // if (!fs.existsSync(path.resolve(__dirname, '../entry'))) {
              //     fs.mkdirSync(path.resolve(__dirname, '../entry'))
              // }

              for (let [entryName, entry] of compilation.entrypoints) {
                  let chunkStr = ''
                  entry.chunks.forEach((chunk, i) => {
                      if (i == entry.chunks.length - 1) {
                          return
                      }

                      chunkStr += `require('../lib/${chunk.id}/index')\n`;
                  })

                  const outTemplate = `
${chunkStr}
var mod = require('../lib/${entryName}')
module.exports.__esModule = mod.__esModule;
module.exports = mod;
              `
                  fs.writeFileSync(path.resolve(__dirname, `../../entry/${entryName}.js`), outTemplate)
              }
              return true;
          });
      }
    }
  ],

  optimization: {
    minimize: false,
    // namedChunks: true,
    chunkIds: 'named',
    runtimeChunk: true,
    splitChunks: {
        chunks: 'all',
        maxInitialRequests: Infinity,
        maxAsyncRequests: Infinity,
        enforceSizeThreshold: Infinity,
        minSize: 0,
        hidePathInfo: false,
        cacheGroups: {
            styles: {
                test: (module, chunks) => module.constructor.name === 'CssModule',
                name: "styles",
                chunks: "all",
                enforce: true
            },
        }
    },
},
});
