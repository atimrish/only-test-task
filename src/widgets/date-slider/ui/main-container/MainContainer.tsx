import {Wrapper} from "@src/shared/ui/wrapper";
import {CIRCLE_MOVE_DURATION} from "@src/widgets/date-slider/config";
import {SliderDatesWidgetProps} from "@src/widgets/date-slider/model";
import {Slider as DateSlider} from "@src/widgets/date-slider/ui/slider";
import {gsap} from "gsap";
import {useEffect, useRef, useState} from "react";
import {SwiperRef} from "swiper/react";
import {Circle} from "../circle/Circle";
import * as s from "./MainContainer.module.scss";

//swiper css
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

export const MainContainer = (p: SliderDatesWidgetProps) => {
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
		if (swiperRef.current) {
			swiperRef.current.swiper.slideTo(activeIndex);
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

					<Circle activeIndex={activeIndex} setActiveIndex={setActiveIndex} slides={p.slides} />
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
