// style
import '@/style/index.css'
// redux
import { Provider } from "react-redux"
import { store } from "@/store/store"
// components
import Header from "@/components/Header"

const App = ({ Component, pageProps }) => {
  return(
    <Provider store={store}>
      <Header />
      <Component {...pageProps} />
    </Provider>
  )
}

export default App