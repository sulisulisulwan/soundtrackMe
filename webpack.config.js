module.exports = {
  mode: 'development',
  devtool: 'source-map',
  entry: ['@babel/polyfill', __dirname + '/frontend/client/src/index.jsx'],
  output: {
    filename: 'bundle.js',
    path: __dirname + '/frontend/client/public'
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