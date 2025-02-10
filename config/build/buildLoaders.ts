import webpack from 'webpack'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import { BuildOptions } from './types/config'
import { buildBabelLoader } from './loaders/buildBabelLoader'

export function buildLoaders(options: BuildOptions): webpack.RuleSetRule[] {
    const { isDev } = options
    const fileLoader = {
        test: /\.(png|jpg|gif|woff|woff2)$/,
        use: [
            {
                loader: 'file-loader',
            },
        ],
    }

    const svgLoader = {
        test: /\.svg$/,
        use: [
            {
                loader: '@svgr/webpack',
                options: {
                    icon: true,
                    svgoConfig: {
                        plugins: [
                            {
                                name: 'convertColors',
                                params: {
                                    currentColor: true,
                                },
                            },
                        ],
                    },
                },
            },
        ],
    }

    const cssLoaders = {
        test: /\.s[ac]ss$/i,
        exclude: /node_modules/,
        use: [
            isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
            {
                loader: 'css-loader',
                options: {
                    modules: {
                        namedExport: false,
                        auto: (resPath: string) =>
                            Boolean(resPath.includes('.module.')),
                        localIdentName: isDev
                            ? '[path][name]__[local]--[hash:base64:5]'
                            : '[hash:base64:8]',
                    },
                },
            },
            'sass-loader',
        ],
    }

    const codeBabelLoader = buildBabelLoader({ ...options, isTsx: false })
    const tsxCodeBabelLoader = buildBabelLoader({ ...options, isTsx: true })

    return [
        fileLoader,
        svgLoader,
        codeBabelLoader,
        tsxCodeBabelLoader,
        cssLoaders,
    ]
}
