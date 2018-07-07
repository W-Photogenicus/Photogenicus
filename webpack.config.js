const path = require('path');

module.exports = {
  mode: 'development',
  entry: './client/index.js',
  output: {
    path: path.resolve(__dirname, 'build'),
    publicPath: '/build/',
    filename: 'webpack-bundle.js'
  },
  module: {
    rules: [    
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
        loader: "babel-loader",
        options: {
          presets: ['babel-preset-env', 'babel-preset-react']
        }
        } 
      },
      { test: /\.(css|scss)$/,
        use: [
          { loader: "style-loader" },
          { loader: "css-loader" }
        ]
      }
    ]
  }
}

