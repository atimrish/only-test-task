import {createRoot} from "react-dom/client";
import {App} from "@src/app/App";
import '@src/app/styles/index.module.scss'

const rootElement = document.getElementById("root") as HTMLDivElement;
const root = createRoot(rootElement);
root.render(<App />);
