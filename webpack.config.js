module.exports = {
  mode: 'development',
  devtool: 'source-map',
  entry: ['@babel/polyfill', __dirname + '/frontend/src/dev/Dev.jsx'],
  output: {
    filename: 'dev.js',
    path: __dirname + '/frontend/public'
  },
  module: {
    rules: [
      {
        test: [/\.jsx$/],
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-react', '@babel/preset-env']
          }
        }
      }
    ]
  }
}