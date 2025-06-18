import {Configuration as DevServerConfiguration} from "webpack-dev-server";

export const webpackDevServer: (port: number) => DevServerConfiguration = (port) => ({
	port,
});
