import ArrowIcon from "@src/shared/ui/assets/images/arrow.svg";
import {ButtonHTMLAttributes, memo} from "react";
import * as s from "./NavigationButton.module.scss";

type NavigationButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
	variant: "prev" | "next";
};

export const NavigationButton = memo((p: NavigationButtonProps) => {
	let className = s.button;

	if (p.className) {
		className += " " + p.className;
	}

	return (
		<button {...p} className={className} data-direction={p.variant}>
			<ArrowIcon />
		</button>
	);
});
