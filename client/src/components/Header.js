// next
import Link from "next/link"
import { useLayoutEffect } from "react"
// redux
import { useDispatch, useSelector } from "react-redux"

const Header = () => {
  const dispatch = useDispatch()

  // logged
  const loggedReducer = useSelector(state => state.loggedReducer)
  const logInOut = () => dispatch({ type: loggedReducer.logged? "LOG_OUT" : "LOG_IN" })

  useLayoutEffect(()=>{
    if(localStorage.getItem("username")) logInOut()
  }, [])

  return(
    <header className="wrapper">
      <Link className="logo" href="/"><h2>LOGO</h2></Link>
      <nav>
        { loggedReducer.logged?
          <>
            <Link className="btn outline" href="/post/editor">New post</Link>
            <input type="checkbox" id="menuBtn" />
            <button className="menuBtn" htmlFor="menuBtn" onClick={()=>{const btn = document.querySelector("#menuBtn"); btn.checked = !btn.checked}} />
            <ul className="menu">
              <li>{ loggedReducer.username }</li>
              <div className="divider" />
              <li onClick={()=>{
                localStorage.removeItem("_id")
                localStorage.removeItem("username")
                localStorage.removeItem("password")
                logInOut()
                document.querySelector("header .logo").click()
              }}>Sign Out</li>
            </ul>
          </>
          :
          <>
            <Link className="btn outline" href="/log-in">Log in</Link>
            <Link className="btn" href="/sign-up">Sign Up</Link>
          </>
        }
      </nav>
    </header>
  )
}

export default Header