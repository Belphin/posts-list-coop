// next
import Link from "next/link"
// redux
import { useDispatch, useSelector } from "react-redux"

const Header = () => {
  const dispatch = useDispatch()

  // logged
  const logged = useSelector(state => state.logged)
  const logInOut = () => dispatch({ type: logged.logged? "LOG_OUT" : "LOG_IN" })

  return(
    <header className="wrapper">
      <Link className="logo" href="/"><h2>LOGO</h2></Link>
      <nav>
        { logged.logged && <Link className="btn outline" href="/post/new">New post</Link> }
        <button className="btn" onClick={logInOut} style={{background: logged.bg, color: logged.text}}>{ logged.logged? "Log Out" : "Log In" }</button>
      </nav>
    </header>
  )
}

export default Header