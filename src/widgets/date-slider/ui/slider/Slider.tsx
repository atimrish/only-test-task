import {useState} from "react";
import {Navigation, Pagination, EffectFade} from "swiper/modules";
import {Swiper, SwiperSlide} from "swiper/react";
import {NavigationButton} from "@src/widgets/date-slider/ui/navigation-button";
import {gsap} from "gsap";
import {formatPageIndex} from "@src/widgets/date-slider/lib/format-page-index";
import * as s from "./Slider.module.scss";
import {NestedSlider} from "../nested-slider/NestedSlider";
import {Wrapper} from "@src/shared/ui/wrapper";
import {SliderDatesWidgetProps} from "../../model";

export const Slider = (p: SliderDatesWidgetProps) => {
	const [activeIndex, setActiveIndex] = useState(0);
	const [countSlides, setCountSlides] = useState(0);

	return (
		<Swiper
			onSwiper={(swiper) => setCountSlides(swiper.slides.length)}
			modules={[Pagination, Navigation, EffectFade]}
			allowTouchMove={false}
			effect="fade"
			fadeEffect={{
				crossFade: true,
			}}
			pagination={{
				clickable: true,
				renderBullet: (_, className) => `<span class=${className}></span>`,
				el: "." + s.slider_controls_pagination,
				bulletClass: s.slider_controls_pagination_bullet,
				bulletActiveClass: s.slider_controls_pagination_bullet_active,
			}}
			navigation={{
				prevEl: "." + s.slider_controls_left_buttons_prev,
				nextEl: "." + s.slider_controls_left_buttons_next,
			}}
			onSlideChange={(swiper) => {
				gsap.fromTo(
					swiper.slides[swiper.activeIndex],
					{
						y: 20,
					},
					{y: 0, duration: 0.5}
				);

				setActiveIndex(swiper.activeIndex);
			}}>
			{p.slides.map((slide) => (
				<SwiperSlide>
					<NestedSlider {...slide} />
				</SwiperSlide>
			))}

			<Wrapper>
				<div className={s.slider_controls}>
					<div className={s.slider_controls_left}>
						<div className={s.slider_controls_left_page_index}>
							{formatPageIndex(activeIndex + 1)}/{formatPageIndex(countSlides)}
						</div>

						<div className={s.slider_controls_left_buttons}>
							<NavigationButton
								variant="prev"
								type="button"
								className={s.slider_controls_left_buttons_prev}
							/>
							<NavigationButton
								variant="next"
								type="button"
								className={s.slider_controls_left_buttons_next}
							/>
						</div>
					</div>

					<div className={s.slider_controls_pagination}></div>

					<div className={s.slider_controls_left_hidden}>
						<div className={s.slider_controls_left_buttons}>
							<NavigationButton variant="prev" type="button" />
							<NavigationButton variant="next" type="button" />
						</div>
					</div>
				</div>
			</Wrapper>
		</Swiper>
	);
};
