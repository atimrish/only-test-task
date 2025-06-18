import {Wrapper} from "@src/shared/ui/wrapper";
import * as s from "./MainContainer.module.scss";
import {Slider as DateSlider} from "@src/widgets/date-slider/ui/slider";
import {SliderDatesWidgetProps} from "../../model";

export const MainContainer = (p: SliderDatesWidgetProps) => {
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
						<div className={s.main_dates}>
							<div>1999</div>
							<div>2004</div>
						</div>
					</Wrapper>

					<div className={s.main_dates_container_circle}></div>
				</div>

				<DateSlider slides={p.slides} />
			</div>
		</div>
	);
};
