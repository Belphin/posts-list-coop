// next
import Link from "next/link"
import { useEffect, useLayoutEffect, useRef } from "react"
// redux
import { useDispatch, useSelector } from "react-redux"

const Header = () => {
  // redux
  const dispatch = useDispatch()
  const loggedReducer = useSelector(state => state.loggedReducer)
  const logInOut = () => dispatch({ type: loggedReducer.logged? "LOG_OUT" : "LOG_IN" })

  const checkboxRef = useRef()
  const menuRef = useRef()

  useLayoutEffect(()=>{
    // redux logged = true if logged in
    if(localStorage.getItem("username")) logInOut()
  }, [])

  useEffect(()=>{
    // hide menu on outside click
    document.addEventListener("click", (e)=>{
      if(e.target.contains(menuRef.current) && e.target != menuRef.current) checkboxRef.current.checked = false
    })
  }, [])

  return(
    <header className="wrapper">
      <Link className="logo" href="/"><h2>LOGO</h2></Link>
      <nav>
        { loggedReducer.logged?
          <>
            <Link className="btn outline" href="/post/editor">New post</Link>
            <input ref={checkboxRef} type="checkbox" id="menuBtn" />
            <button className="menuBtn" htmlFor="menuBtn" onClick={()=>{const btn = document.querySelector("#menuBtn"); btn.checked = !btn.checked}} />
            <ul ref={menuRef} className="menu">
              <li>{ loggedReducer.username }</li>
              <div className="divider" />
              <li className="action" onClick={()=>{
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