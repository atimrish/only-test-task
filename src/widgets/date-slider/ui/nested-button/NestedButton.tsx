import ArrowIcon from "@src/shared/ui/assets/images/arrow.svg";
import {ButtonHTMLAttributes, memo} from "react";
import * as s from "./NestedButton.module.scss";

type NestedButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
	variant: "prev" | "next";
};

export const NestedButton = memo((p: NestedButtonProps) => {
	let className = s.button;

	if (p.className) {
		className += " " + p.className;
	}

	return (
		<button {...p} data-variant={p.variant} className={className}>
			<ArrowIcon />
		</button>
	);
});
