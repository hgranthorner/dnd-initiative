const path = require('path')

module.exports = {
  devtool: 'eval',
  entry: path.resolve(__dirname, 'client', 'src'),
  output: {
    path: path.resolve(__dirname, 'client', 'dist'),
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['.js', '.json', '.ts', '.tsx']
  },
  module: {
    rules: [
      {
        test: /\.(t|j)sx?$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
      }
    ]
  }
}
