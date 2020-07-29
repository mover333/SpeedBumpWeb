import * as webpack from 'webpack'
import * as path from 'path'
import * as HtmlWebpackPlugin from 'html-webpack-plugin'
import { GenerateSW } from 'workbox-webpack-plugin'

const config: webpack.Configuration = {
    mode: 'development',
    entry: {
        app: ['./src/App.tsx', 'webpack-hot-middleware/client'],
        vendor: ['react', 'react-dom'],
    },
    output: {
        path: path.resolve(__dirname, './frontEnd'),
        filename: 'js/[name].bundle.js',
        devtoolModuleFilenameTemplate: 'file:///[absolute-resource-path]', // for vscode debugger
    },
    devtool: 'source-map',
    resolve: {
        extensions: ['.js', '.jsx', '.json', '.ts', '.tsx'],
    },
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                exclude: /node_modules/,
                loader: 'awesome-typescript-loader',
                query: {
                    configFileName: './src/tsconfig.frontend.json',
                },
            },
            {
                enforce: 'pre',
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'source-map-loader',
            },
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: 'fonts/',
                        },
                    },
                ],
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, '../src', 'index.html'),
        }),
        new webpack.HotModuleReplacementPlugin(),
        new GenerateSW({
            clientsClaim: true,
            skipWaiting: true,
        }),
    ],

    // When importing a module whose path matches one of the following, just
    // assume a corresponding global variable exists (CDN) and use that instead.
    // This is important because it allows us to avoid bundling all of our
    // dependencies, which allows browsers to cache those libraries between builds.
    externals: {
        react: 'React',
        'react-dom': 'ReactDOM',
    },
}

export default config
