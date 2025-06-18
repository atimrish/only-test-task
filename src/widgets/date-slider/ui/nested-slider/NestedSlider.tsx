import * as s from "./NestedSlider.module.scss";
import {Wrapper} from "@src/shared/ui/wrapper";
import {Swiper, SwiperSlide} from "swiper/react";
import {SliderDatesSlide} from "../../model";
import {useEffect, useState} from "react";
import {debounce} from "@src/shared/lib/debounce";
import {Navigation} from "swiper/modules";
import {NestedButton} from "../nested-button";

const getSlidesPerView = () => {
	const width = document.body.getBoundingClientRect().width;
	return width < 1440 ? 1.5 : 3;
};

export const NestedSlider = (p: SliderDatesSlide) => {
	const [slidesPerView, setSlidesPerView] = useState(getSlidesPerView);

	useEffect(() => {
		const bodyWidthChecker = debounce(() => setSlidesPerView(getSlidesPerView()), 200);
		const observer = new ResizeObserver(() => bodyWidthChecker());
		observer.observe(document.body);

		return () => {
			observer.disconnect();
		};
	});

	return (
		<div className={s.nested}>
			<Wrapper>
				<h3 className={s.heading}>{p.title}</h3>
				<hr className={s.hr} />
			</Wrapper>

			<Swiper
				modules={[Navigation]}
				nested
				slidesPerView={slidesPerView}
				slidesPerGroup={slidesPerView}
				navigation={{
					prevEl: "." + s.nested_controls_prev,
					nextEl: "." + s.nested_controls_next,
				}}>
				{p.nestedSlides.map((slide) => (
					<SwiperSlide>
						<div className={s.nested_slide}>
							<h3 className={s.year}>{slide.year}</h3>
							<div className={s.paragraph}>{slide.paragraph}</div>
						</div>
					</SwiperSlide>
				))}
			</Swiper>

			<div className={s.nested_controls}>
				<NestedButton variant="prev" className={s.nested_controls_prev} />
				<NestedButton variant="next" className={s.nested_controls_next} />
			</div>
		</div>
	);
};
