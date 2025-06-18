import * as s from "./NestedSlider.module.scss";
import {Wrapper} from "@src/shared/ui/wrapper";
import {Swiper, SwiperSlide} from "swiper/react";
import {SliderDatesSlide} from "../../model";
import {useEffect, useState} from "react";
import { debounce } from "@src/shared/lib/debounce";

const getSlidesPerView = () => {
	const width = document.body.getBoundingClientRect().width
	return width < 1440 ? 1.5 : 3
}

export const NestedSlider = (p: SliderDatesSlide) => {
	const [slidesPerView, setSlidesPerView] = useState(getSlidesPerView)

	useEffect(() => {
		const bodyWidthChecker = debounce(() => {
			setSlidesPerView(getSlidesPerView())
		}, 200)

		const observer = new ResizeObserver(() => {
			bodyWidthChecker()
		});

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

			<Swiper nested slidesPerView={slidesPerView}>
				{p.nestedSlides.map((slide) => (
					<SwiperSlide>
						<Wrapper>
							<h3 className={s.year}>{slide.year}</h3>
							<div className={s.paragraph}>{slide.paragraph}</div>
						</Wrapper>
					</SwiperSlide>
				))}
			</Swiper>
		</div>
	);
};
