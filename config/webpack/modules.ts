import {Configuration} from "webpack";
import MiniCssExtractPlugin from "mini-css-extract-plugin";

export const webpackModules: Configuration["module"] = {
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
};
