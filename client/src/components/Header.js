// react
import { useEffect, useRef } from "react"
// redux
import { useDispatch, useSelector } from "react-redux"
import { logout } from "@/store/userSlice"
// next
import { useRouter } from "next/router"
import Link from "next/link"

const Header = () => {
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()
  
  const router = useRouter()
  
  const checkboxRef = useRef()
  const menuRef = useRef()

  useEffect(()=>{
    // if(localStorage.getItem("username")) logInOut()
    // hide menu on outside click
    document.addEventListener("click", (e)=>{
      if(e.target.contains(menuRef.current) && e.target != menuRef.current) checkboxRef.current.checked = false
    })
  }, [])

  return(
    <header className="wrapper">
      <Link className="logo" href="/"><h2>LOGO</h2></Link>
      { user.logged?
          <nav>
            <Link className="btn outline" href="/post/editor">New post</Link>
            <input ref={checkboxRef} type="checkbox" id="menuBtn" />
            <button className="menuBtn" htmlFor="menuBtn" onClick={()=>{const btn = document.querySelector("#menuBtn"); btn.checked = !btn.checked}} />
            <ul ref={menuRef} className="menu">
              <li>{ user.username }</li>
              <div className="divider" />
              <li className="action" onClick={()=>{
                dispatch(logout())
                router.push("/")
              }}>Sign Out</li>
            </ul>
          </nav>
        :
          <nav>
            <Link className="btn outline" href="/login">Log in</Link>
            <Link className="btn" href="/signup">Sign Up</Link>
          </nav>
      }
    </header>
  )
}

export default Header