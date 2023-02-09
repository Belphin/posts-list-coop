// react
import React from "react"
import ReactDOM from "react-dom/client"
// redux
import { Provider } from "react-redux"
import { store } from "./store"
// srtle
import "./style/index.css"
// components
import Header from "./components/Header"
import Main from "./components/Main"

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
  <Provider store={store}>
    <Header />
    <Main />
  </Provider>
)