import path from "path";
import webpack from "webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";
import DevServer from "webpack-dev-server";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import CssMinimizerPlugin from "css-minimizer-webpack-plugin";

interface WebpackEnv {
	mode?: webpack.Configuration["mode"];
	port?: number;
}

export default (env: WebpackEnv): webpack.Configuration => {
	const isProduction = env.mode === "production";

	return {
		mode: env.mode || "development",
		entry: "./src/index.tsx",
		devtool: "inline-source-map",
		module: {
			rules: [
				{
					test: /\.module.s[ac]ss$/,
					use: [
						MiniCssExtractPlugin.loader,
						{
							loader: "css-loader",
							options: {
								importLoaders: 1,
								modules: true,
							},
						},
						"sass-loader",
					],
				},
				{
					test: /\.css$/,
					use: [MiniCssExtractPlugin.loader, "css-loader"],
				},
				{
					test: /\.tsx?$/,
					use: "ts-loader",
					exclude: /node_modules/,
				},
				{
					test: /\.svg$/i,
					issuer: /\.[jt]sx?$/,
					use: [
						{
							loader: "@svgr/webpack",
							options: {
								icon: true,
							},
						},
					],
				},
				{
					test: /\.(png|jpg|jpeg|gif)$/i,
					type: "asset/resource",
				},
			],
		},
		resolve: {
			extensions: [".ts", ".tsx", ".js"],
			alias: {
				"@src": path.resolve("src"),
			},
		},
		output: {
			filename: "bundle-[contenthash:8].js",
			path: path.resolve("dist"),
			clean: true,
		},
		plugins: [
			new HtmlWebpackPlugin({
				template: path.resolve("src", "index.html"),
				minify: isProduction,
			}),
			new MiniCssExtractPlugin({filename: "style-[contenthash:8].css"}),
		],
		optimization: {
			minimizer: [new CssMinimizerPlugin()],
		},
		devServer: {
			port: env.port || 8000,
		},
	};
};
