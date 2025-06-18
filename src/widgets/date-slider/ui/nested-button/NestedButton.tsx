import {ButtonHTMLAttributes} from "react";
import * as s from "./NestedButton.module.scss";
import ArrowIcon from '@src/shared/ui/assets/images/arrow.svg'

type NestedButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
	variant: "prev" | "next";
};

export const NestedButton = (p: NestedButtonProps) => {
	let className = s.button;

	if (p.className) {
		className += " " + p.className;
	}

	return (
		<button {...p} data-variant={p.variant} className={className}>
			<ArrowIcon/>
		</button>
	);
};
