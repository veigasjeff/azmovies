const path = require('path');

module.exports = {
  entry: './src/index.js', // Main JS file
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'public'), // Change this to 'public'
  },
  module: {
    rules: [
      {
        test: /\.css$/, // Handles CSS files
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|jpg|gif)$/, // Handles image files
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'images/',
            },
          },
        ],
      },
    ],
  },
};
