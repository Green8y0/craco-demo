const path = require('path')
const CracoLessPlugin = require('craco-less')
const { loaderByName } = require('@craco/craco')

module.exports = {
  webpack: {
    alias: {
      '@': path.resolve(__dirname, 'src/')
    },
    configure: (config) => {
      config.externals = {
        'react': 'React',
        // 'react-dom': 'ReactDom'
      }
      return config
    }
  },
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        modifyLessModuleRule(lessModuleRule, context) {
          // Configure the file suffix
          lessModuleRule.test = /\.module.less$/

          // Configure the generated local ident name.
          const cssLoader = lessModuleRule.use.find(loaderByName('css-loader'))
          cssLoader.options.modules = {
            localIdentName: '[local]_[hash:base64:5]',
          }
          return lessModuleRule
        },
        modifyLessRule(lessRule, context) {
          // You have to exclude these file suffixes first,
          // if you want to modify the less module's suffix
          lessRule.exclude = /\.less$/;
          return lessRule;
        },
      },
    },
  ]
}