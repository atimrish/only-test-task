import webpack from "webpack";
import { webpackDevServer } from "./config/webpack/dev-server";
import { webpackModules } from "./config/webpack/modules";
import { webpackOptimizations } from "./config/webpack/optimizations";
import { webpackOutput } from "./config/webpack/output";
import { webpackPlugins } from "./config/webpack/plugins";
import { webpackResolvers } from "./config/webpack/resolvers";
import {Configuration as DevServerConfiguration} from "webpack-dev-server";

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
		module: webpackModules,
		resolve: webpackResolvers,
		output: webpackOutput,
		plugins: webpackPlugins(isProduction),
		optimization: webpackOptimizations,
		devServer: webpackDevServer(env.port || 8000),
	};
};
