import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "antd/dist/antd.css";
import { applyMiddleware, createStroe } from "redux";
import { Provider } from "react-redux";
import promiseMiddleWare from "redux-promise";
import ReduxThunk from "redux-thunk";
import Reducer from "/_reducers";
const createStoreWithMiddleware = applyMiddleware(
    promiseMiddleWare,
    ReduxThunk
)(createStroe); //store 가 promise와 function을 받을 수 있게 함
ReactDOM.render(
    <Provider
        store={createStoreWithMiddleware(
            Reducer,
            window.__REDUX_DEVTOOLS_EXTENSION__ &&
                window.__REDUX_DEVTOOLS_EXTENSION__()
        )}
    >
        <App />
    </Provider>,
    document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
