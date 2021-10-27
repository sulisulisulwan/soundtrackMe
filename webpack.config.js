module.exports = {
  mode: 'development',
  devtool: 'source-map',
  entry: ['@babel/polyfill', __dirname + '/frontend/src/reset-password.jsx'],
  output: {
    filename: 'reset-password.js',
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