import path from 'path'
import webpack from 'webpack'
import HTMLWebpackPlugin from 'html-webpack-plugin'

const PATHS = {
  app: path.join(__dirname, 'app'),
  build: path.join(__dirname, 'dist'),
}

const HTMLWebpackPluginConfig = new HTMLWebpackPlugin({
  template: PATHS.app + '/index.html',
  filename: 'index.html',
  inject: 'body',
})

const LAUNCH_COMMAND = process.env.npm_lifecycle_event

const isProduction = LAUNCH_COMMAND === 'production'
process.env.BABEL_ENV = LAUNCH_COMMAND

const productionPlugin = new webpack.DefinePlugin({
  'process.env': {
    NODE_ENV: JSON.stringify('production'),
  },
})

const baseConfig = {
  entry: [
    PATHS.app,
  ],
  output: {
    path: PATHS.build,
    filename: 'index_bunle.js',
  },
  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' },
      { test: /\.css$/, loader: 'style-loader!css-loader' },
    ],
  },
  resolve: {
    alias: {
      containers: path.resolve('./app/containers'),
    },
  },
}

const developmentConfig = {
  devtool: 'cheap-module-inline-source-map',
  devServer: {
    contentBase: PATHS.build,
    hot: true,
    inline: true,
    progress: true,
  },
  plugins: [HTMLWebpackPluginConfig, new webpack.HotModuleReplacementPlugin()],
}

const productionConfig = {
  devtool: 'cheap-module-inline-source-map',
  plugins: [HTMLWebpackPluginConfig, productionPlugin],
}

export default Object.assign({}, baseConfig,
  isProduction === true ? productionConfig : developmentConfig
)
