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
            <button className="menuBtn" htmlFor="menuBtn" onClick={()=>{const btn = document.querySelector("#menuBtn"); btn.checked = !btn.checked}}>
              <svg width="62" height="73" viewBox="0 0 62 73" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M55.995 66.996V60.328C55.995 56.7921 54.5904 53.4011 52.0901 50.9009C49.5899 48.4006 46.1989 46.996 42.663 46.996H19.332C15.7961 46.996 12.4051 48.4006 9.90485 50.9009C7.40462 53.4011 6 56.7921 6 60.328V66.996" stroke="black" stroke-width="9" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M44.329 20.332C44.329 22.9688 43.5471 25.5464 42.0822 27.7389C40.6172 29.9313 38.535 31.6401 36.0989 32.6492C33.6628 33.6582 30.9822 33.9222 28.3961 33.4078C25.8099 32.8934 23.4344 31.6237 21.5699 29.7591C19.7053 27.8946 18.4356 25.5191 17.9212 22.9329C17.4068 20.3468 17.6708 17.6662 18.6798 15.2301C19.6889 12.794 21.3977 10.7118 23.5901 9.24685C25.7826 7.78191 28.3602 7 30.997 7C34.5329 7 37.9239 8.40462 40.4241 10.9049C42.9244 13.4051 44.329 16.7961 44.329 20.332Z" stroke="black" stroke-width="9" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>
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