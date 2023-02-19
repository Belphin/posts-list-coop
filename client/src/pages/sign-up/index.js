// react
import { useRef } from "react"
// redux
import { useDispatch, useSelector } from "react-redux"
// hooks
import useInput from "@/hooks/useInput"

const SignUp = () => {
  const dispatch = useDispatch()

  // logged
  const loggedReducer = useSelector(state => state.loggedReducer)
  const logInOut = () => dispatch({ type: loggedReducer.logged? "LOG_OUT" : "LOG_IN" })

	const username = useInput()
	const usernameRef = useRef()
	const password = useInput()
	const password2 = useInput()
	const passwordRef = useRef()
	const userExists = useRef()
	const diffPass = useRef()

	const createUser = async (username, password) => {
		await fetch("http://localhost:8080/api/auth/registration", {
			method: "POST",
			cache: "no-cache",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ username, password }),
		})
			.then((res) => res.json())
			.then((data) => {
				if(data.message == "User was created"){
					localStorage.setItem("username", username)
					localStorage.setItem("password", password)
					logInOut()
					document.querySelector("header .logo").click()
				}
				else if(data.message == "User already registered"){
					usernameRef.current.style.outline = ".125rem solid red"
					userExists.current.style.display = "block"
				}
			})
	}

	const registration = (e) => {
		e.preventDefault()
		if(password.value === password2.value) createUser(username.value, password.value)
		else{
			passwordRef.current.style.outline = ".125rem solid red"
			diffPass.current.style.display = "block"
		}
	}

	return (
		<main className="login wrapper">
			<form onSubmit={registration}>
				<input
					ref={usernameRef}
					minLength="4"
					maxLength="16"
					value={username.value}
					onChange={(e)=>{
						username.onChange(e)
						usernameRef.current.style.outline = "none"
						userExists.current.style.display = "none"
					}}
					required
					type="text"
					placeholder="Username"
				/>
				<div ref={userExists} className="error">User already exists</div>
				<input
					ref={passwordRef}
					minLength="4"
					maxLength="16"
					value={password.value}
					onChange={(e)=>{
						password.onChange(e)
						passwordRef.current.style.outline = "none"
						diffPass.current.style.display = "none"
					}}
					required
					type="password"
					placeholder="Password"
				/>
				<input
					ref={passwordRef}
					minLength="4"
					maxLength="16"
					value={password2.value}
					onChange={(e)=>{
						password2.onChange(e)
						passwordRef.current.style.outline = "none"
						diffPass.current.style.display = "none"
					}}
					required
					type="password"
					placeholder="Confirm the password"
				/>
				<div ref={diffPass} className="error">Passwords are different</div>
				<button className="btn">Sign up</button>
			</form>
		</main>
	)
}

export default SignUp