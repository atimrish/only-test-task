import {Configuration} from "webpack";
import CssMinimizerPlugin from "css-minimizer-webpack-plugin";

export const webpackOptimizations: Configuration["optimization"] = {
	minimizer: [new CssMinimizerPlugin()],
};
