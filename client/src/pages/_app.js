// redux
import { Provider } from "react-redux"
import { store } from "@/store"
// style
import '@/style/index.css'
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