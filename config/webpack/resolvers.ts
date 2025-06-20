import {Configuration} from "webpack";
import path from "path";

export const webpackResolvers: Configuration["resolve"] = {
	extensions: [".ts", ".tsx", ".js"],
	alias: {
		"@src": path.resolve("src"),
		"@styles": path.resolve("src/app/styles"),
	},
};
