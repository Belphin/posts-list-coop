// redux
import { useDispatch, useSelector } from "react-redux"

const Header = () => {
  const dispatch = useDispatch()

  // logged
  const logged = useSelector(state => state.logged)
  const logInOut = () => dispatch({ type: logged.logged? "LOG_OUT" : "LOG_IN" })

  return(
    <header className="wrapper">
      <h2>LOGO</h2>
      <nav>
        { logged.logged && <button className="add">Add post</button> }
        <button
          onClick={logInOut}
          style={{
            background: logged.bg,
            color: logged.text
          }}
        >{ logged.logged? "Log Out" : "Log In" }</button>
      </nav>
    </header>
  )
}

export default Header