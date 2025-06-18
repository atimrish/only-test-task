import {Wrapper} from "@src/shared/ui/wrapper";
import * as s from "./MainContainer.module.scss";
import {Slider as DateSlider} from "@src/widgets/date-slider/ui/slider";
import {SliderDatesWidgetProps} from "@src/widgets/date-slider/model";
import {useEffect, useRef, useState} from "react";
import {gsap} from "gsap";
import {SwiperRef} from "swiper/react";

//swiper css
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/effect-fade";

const CIRCLE_RADIUS = 530 / 2;
const POINT_RADIUS = 56 / 2;
const CIRCLE_MOVE_DURATION = 1;

export const MainContainer = (p: SliderDatesWidgetProps) => {
	const ANGLE = 360 / p.slides.length;
	const circleRef = useRef<HTMLDivElement>(null);
	const datesRef = useRef<HTMLDivElement>(null);
	const swiperRef = useRef<SwiperRef>(null);
	const [activeIndex, setActiveIndex] = useState(0);
	const currentNestedSlide = p.slides[activeIndex].nestedSlides;

	const previousDatesRef = useRef<{start: number; end: number}>({
		start: currentNestedSlide[0].year,
		end: currentNestedSlide[currentNestedSlide.length - 1].year,
	});

	useEffect(() => {
		if (swiperRef.current) {
			setActiveIndex(swiperRef.current.swiper.activeIndex);
		}
	}, []);

	useEffect(() => {
		if (circleRef.current) {
			const children = circleRef.current.children;

			Array.from(children).forEach((el, index) => {
				//распределяем по кругу
				const radians = (ANGLE * index * Math.PI) / 180;
				const x = Math.cos(radians) * CIRCLE_RADIUS + CIRCLE_RADIUS - POINT_RADIUS;
				const y = Math.sin(radians) * CIRCLE_RADIUS + CIRCLE_RADIUS - POINT_RADIUS;
				const rotate = (activeIndex + 1) * -ANGLE;

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
		if (datesRef.current) {
			//анимируем переходы дат
			const startEl = datesRef.current.children[0];
			const endEl = datesRef.current.children[1];

			gsap.fromTo(
				startEl,
				{
					innerText: previousDatesRef.current.start,
				},
				{
					snap: {innerText: 1},
					innerText: currentNestedSlide[0].year,
					duration: CIRCLE_MOVE_DURATION,
				}
			);

			gsap.fromTo(
				endEl,
				{
					innerText: previousDatesRef.current.end,
				},
				{
					snap: {innerText: 1},
					innerText: currentNestedSlide[currentNestedSlide.length - 1].year,
					duration: CIRCLE_MOVE_DURATION,
				}
			);

			//сохраняем прошлые значения для следующей анимации
			previousDatesRef.current.start = currentNestedSlide[0].year;
			previousDatesRef.current.end = currentNestedSlide[currentNestedSlide.length - 1].year;
		}
	}, [activeIndex]);

	return (
		<div className={s.main_desktop_padding}>
			<div className={s.main_container}>
				<div className={s.main_heading_block}>
					<Wrapper>
						<h2 className={s.main_heading}>Исторические даты</h2>
					</Wrapper>
				</div>

				<div className={s.main_dates_container}>
					<Wrapper>
						<div className={s.main_dates} ref={datesRef}>
							<div>{currentNestedSlide[0].year}</div>
							<div>{currentNestedSlide[currentNestedSlide.length - 1].year}</div>
						</div>
					</Wrapper>

					<div className={s.main_dates_container_circle}>
						<div className={s.main_dates_container_circle_opacity}></div>
						<div className={s.main_dates_container_circle_points} ref={circleRef}>
							{p.slides.map((slide, index) => (
								<div className={s.main_dates_container_circle_points_point} key={index}>
									<div
										className={s.main_dates_container_circle_points_point_hidden}
										data-active={index === activeIndex}
										onClick={(e) => {
											swiperRef.current?.swiper.slideTo(index);
											setActiveIndex(index);
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

										<div className={s.main_dates_container_circle_points_point_hidden_title}>
											{slide.title}
										</div>
									</div>
								</div>
							))}
						</div>
					</div>
				</div>

				<DateSlider
					slides={p.slides}
					ref={swiperRef}
					activeIndex={activeIndex}
					setActiveIndex={setActiveIndex}
				/>
			</div>
		</div>
	);
};
