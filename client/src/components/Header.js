// redux
import { useDispatch, useSelector } from "react-redux"

const Header = () => {
  const dispatch = useDispatch()

  // logged
  const logged = useSelector(state => state.logged.logged)
  const bg = useSelector(state => state.logged.bg)
  const logInOut = () => dispatch({ type: logged? "LOG_OUT" : "LOG_IN" })

  return(
    <header>
      <h2>LOGO</h2>
      <div>
        {logged && <span>Hi, User</span>}
        <button onClick={logInOut} style={{background: bg}}>{ logged? "Log Out" : "Log In" }</button>
      </div>
    </header>
  )
}

export default Header