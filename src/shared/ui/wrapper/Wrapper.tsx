import {PropsWithChildren} from "react";
import * as s from "./Wrapper.module.scss";

export const Wrapper = (p: PropsWithChildren) => {
	return <div className={s.wrapper}>{p.children}</div>;
};
