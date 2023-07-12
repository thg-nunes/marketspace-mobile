module.exports = function (api) {
  api.cache(true)
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          root: ['./src'],
          alias: {
            '@screens': './src/screens',
            '@routes': './src/routes',
            '@assets': './src/assets',
            '@hooks': './src/hooks',
            '@utils': './src/utils',
            '@services': './src/services',
            '@components': './src/components'
          }
        }
      ]
    ]
  }
}
