import {Configuration} from "webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import path from "path";

export const webpackPlugins: (isProduction: boolean) => Configuration["plugins"] = (isProduction) => [
	new HtmlWebpackPlugin({
		template: path.resolve("src", "index.html"),
		minify: isProduction,
	}),
	new MiniCssExtractPlugin({filename: "style-[contenthash:8].css"}),
];
