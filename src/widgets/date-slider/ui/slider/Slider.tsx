import {Wrapper} from "@src/shared/ui/wrapper";
import {formatPageIndex} from "@src/widgets/date-slider/lib/format-page-index";
import {NavigationButton} from "@src/widgets/date-slider/ui/navigation-button";
import {gsap} from "gsap";
import {Ref, SetStateAction, useState} from "react";
import {EffectFade, Navigation, Pagination} from "swiper/modules";
import {Swiper, SwiperRef, SwiperSlide} from "swiper/react";
import {SliderDatesWidgetProps} from "@src/widgets/date-slider/model";
import {NestedSlider} from "@src/widgets/date-slider/ui/nested-slider/NestedSlider";
import * as s from "./Slider.module.scss";

const SLIDE_FADE_DURATION = 1.5;
const SLIDE_FADE_START_Y = 40;
const SLIDE_FADE_END_Y = 0;

export const Slider = (
	p: SliderDatesWidgetProps & {
		ref?: Ref<SwiperRef>;
		activeIndex: number;
		setActiveIndex: React.Dispatch<SetStateAction<number>>;
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
				preventInteractionOnTransition={true}
				fadeEffect={{
					crossFade: true,
				}}
				speed={500}
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
						{opacity: 0, y: SLIDE_FADE_START_Y},
						{opacity: 1, y: SLIDE_FADE_END_Y, duration: SLIDE_FADE_DURATION}
					);

					p.setActiveIndex(swiper.activeIndex);
				}}>
				{p.slides.map((slide, index) => (
					<SwiperSlide key={index}>
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
