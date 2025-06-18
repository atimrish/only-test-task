export type SliderDatesWidgetProps = {
	slides: SliderDatesSlide[];
};

export type SliderDatesSlide = {
	title: string;
	nestedSlides: SliderDateNestedSlide[];
};

type SliderDateNestedSlide = {
	year: number;
	paragraph: string;
};
