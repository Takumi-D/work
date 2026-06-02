import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App";
import { Provider } from "react-redux"
import { BrowserRouter } from "react-router-dom";

import store from "./store/store";
import "./style/reset.scss";
import "./style/index.scss";
import "./style/form.scss";


const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
    <Provider store={store}>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </Provider>
)
