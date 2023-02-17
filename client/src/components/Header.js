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
        { logged.logged?
          <>
            <Link className="btn outline" href="/post/editor">New post</Link>
            <input type="checkbox" id="menuBtn" />
            <button className="menuBtn" htmlFor="menuBtn" onClick={()=>{const btn = document.querySelector("#menuBtn"); btn.checked = !btn.checked}} />
            <ul className="menu">
              <li>Profile</li>
              <div className="divider" />
              <li onClick={logInOut}>Sign Out</li>
            </ul>
          </>
          :
          <>
            <button className="btn outline" onClick={logInOut}>Log in</button>
            <Link className="btn" href="/sign-up">Sign Up</Link>
          </>
        }
      </nav>
    </header>
  )
}

export default Header