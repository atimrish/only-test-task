import {CIRCLE_MOVE_DURATION, CIRCLE_RADIUS, POINT_RADIUS} from "@src/widgets/date-slider/config";
import {SliderDatesSlide} from "@src/widgets/date-slider/model";
import {gsap} from "gsap";
import {SetStateAction, useEffect, useRef} from "react";
import * as s from "./Circle.module.scss";

type CircleProps = {
	slides: SliderDatesSlide[];
	activeIndex: number;
	setActiveIndex: React.Dispatch<SetStateAction<number>>;
};

export const Circle = (p: CircleProps) => {
	const ANGLE = 360 / p.slides.length;
	const circleRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (circleRef.current) {
			const children = circleRef.current.children;

			Array.from(children).forEach((el, index) => {
				//распределяем по кругу
				const radians = (ANGLE * index * Math.PI) / 180;
				const x = Math.cos(radians) * CIRCLE_RADIUS + CIRCLE_RADIUS - POINT_RADIUS;
				const y = Math.sin(radians) * CIRCLE_RADIUS + CIRCLE_RADIUS - POINT_RADIUS;
				const rotate = (p.activeIndex + 1) * -ANGLE;

				gsap.to(el, {
					x: Math.round(x),
					y: Math.round(y),
					rotate: -rotate,
					duration: CIRCLE_MOVE_DURATION,
					ease: "power1.out",
				});
				gsap.to(circleRef.current, {
					rotate,
					duration: CIRCLE_MOVE_DURATION,
					ease: "power1.out",
				});
			});
		}
	}, [p.slides, p.activeIndex]);

	return (
		<div className={s.circle}>
			<div className={s.circle_opacity}></div>
			<div className={s.circle_points} ref={circleRef}>
				{p.slides.map((slide, index) => (
					<div className={s.circle_points_point} key={index}>
						<div
							className={s.circle_points_point_hidden}
							data-active={index === p.activeIndex}
							onClick={(e) => {
								p.setActiveIndex(index);
								const titleElem = e.currentTarget.children[0];

								gsap.fromTo(
									titleElem,
									{
										opacity: 0,
										delay: CIRCLE_MOVE_DURATION,
										ease: "power1.out",
									},
									{
										opacity: 1,
										duration: CIRCLE_MOVE_DURATION,
									}
								);
							}}>
							{index + 1}

							<div className={s.circle_points_point_hidden_title}>{slide.title}</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};
