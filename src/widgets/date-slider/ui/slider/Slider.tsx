import {Wrapper} from "@src/shared/ui/wrapper";
import {formatPageIndex} from "@src/widgets/date-slider/lib/format-page-index";
import {NavigationButton} from "@src/widgets/date-slider/ui/navigation-button";
import {gsap} from "gsap";
import {Ref, SetStateAction, useState} from "react";
import {EffectFade, Navigation, Pagination} from "swiper/modules";
import {Swiper, SwiperRef, SwiperSlide} from "swiper/react";
import {SliderDatesWidgetProps} from "../../model";
import {NestedSlider} from "../nested-slider/NestedSlider";
import * as s from "./Slider.module.scss";

export const Slider = (
	p: SliderDatesWidgetProps & {
		ref?: Ref<SwiperRef>;
		activeIndex: number,
		setActiveIndex: React.Dispatch<SetStateAction<number>>
	}
) => {
	const [countSlides, setCountSlides] = useState(0);

	return (
		<div className="swiper-container">
			<div className={s.slider_desktop}>
				<Wrapper>
					<div className={s.slider_controls}>
						<div className={s.slider_controls_left}>
							<div className={s.slider_controls_left_page_index}>
								{formatPageIndex(p.activeIndex + 1)}/{formatPageIndex(countSlides)}
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
					</div>
				</Wrapper>
			</div>

			<Swiper
				onSwiper={(swiper) => {
					setCountSlides(swiper.slides.length);
				}}
				ref={p.ref}
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
							opacity: 0,
							y: 40,
						},
						{y: 0, opacity: 1, duration: 1.5}
					);

					p.setActiveIndex(swiper.activeIndex);
				}}>
				{p.slides.map((slide) => (
					<SwiperSlide>
						<NestedSlider {...slide} />
					</SwiperSlide>
				))}
			</Swiper>

			<div className={s.slider_mobile}>
				<Wrapper>
					<div className={s.slider_controls}>
						<div className={s.slider_controls_left}>
							<div className={s.slider_controls_left_page_index}>
								{formatPageIndex(p.activeIndex + 1)}/{formatPageIndex(countSlides)}
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
			</div>
		</div>
	);
};
