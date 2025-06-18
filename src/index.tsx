import {createRoot} from "react-dom/client";
import {App} from "@src/app/App";
import './index.module.scss'

//swiper css
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/effect-fade';

const rootElement = document.getElementById("root") as HTMLDivElement;
const root = createRoot(rootElement);
root.render(<App />);
