import {Configuration} from "webpack";
import path from "path";

export const webpackOutput: Configuration["output"] = {
	filename: "bundle-[contenthash:8].js",
	path: path.resolve("dist"),
	clean: true,
};
