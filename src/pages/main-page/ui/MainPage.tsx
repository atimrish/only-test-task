import {SliderDatesWidgetProps} from "@src/widgets/date-slider/model";
import {SliderDatesWidget} from "@src/widgets/date-slider/ui";

const slides: SliderDatesWidgetProps["slides"] = [
	{
		title: "fdfs",
		nestedSlides: [
			{
				year: 2015,
				paragraph: "13 сентября — частное солнечное затмение, видимое в Южной Африке и части Антарктиды",
			},
			{
				year: 2016,
				paragraph:
					"Телескоп «Хаббл» обнаружил самую удалённую из всех обнаруженных галактик, получившую обозначение GN-z11",
			},
			{
				year: 2017,
				paragraph: "Компания Tesla официально представила первый в мире электрический грузовик Tesla Semi",
			},
		],
	},
	{
		title: "fdfs",
		nestedSlides: [
			{
				year: 2015,
				paragraph: "13 сентября — частное солнечное затмение, видимое в Южной Африке и части Антарктиды",
			},
			{
				year: 2016,
				paragraph:
					"Телескоп «Хаббл» обнаружил самую удалённую из всех обнаруженных галактик, получившую обозначение GN-z11",
			},
			{
				year: 2017,
				paragraph: "Компания Tesla официально представила первый в мире электрический грузовик Tesla Semi",
			},
		],
	},
];

export const MainPage = () => {
	return <SliderDatesWidget slides={slides} />;
};
