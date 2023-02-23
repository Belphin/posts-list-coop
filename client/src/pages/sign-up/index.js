// axios
import axios from "axios"
// react
import { useRef, useState } from "react"
// redux
import { useDispatch, useSelector } from "react-redux"
// next
import { useRouter } from "next/router"

const SignUp = () => {
	const router = useRouter()

	// redux
	const dispatch = useDispatch()
	const loggedReducer = useSelector((state) => state.loggedReducer)
	const logInOut = () => dispatch({ type: loggedReducer.logged ? "LOG_OUT" : "LOG_IN" })

	const [username, setUsername] = useState("")
	const [password, setPassword] = useState("")
	const [password_2, setPassword_2] = useState("")
	const usernameRef = useRef()
	const passwordRef = useRef()
	const userExists = useRef()
	const diffPass = useRef()

	const registration = async (e) => {
		e.preventDefault()
		if(password === password_2){
			await axios.post("http://localhost:8080/api/auth/registration",
				{ username, password },
				{
					headers: {
						Accept: "application/json",
						"Content-Type": "application/json",
					}
				}
			)
				.then(res => res.data)
				.then(data => {
					if(!data.message){
						localStorage.setItem("username", username)
						localStorage.setItem("token", data.token)
						logInOut()
						router.push("/")
					}
					else if(data.message == "User already registered") {
						usernameRef.current.style.outline = ".125rem solid red"
						userExists.current.style.display = "block"
					}
				})
				.catch(e => console.log(e.message))
		}
		else {
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
					value={username}
					onChange={(e) => {
						setUsername(e.target.value)
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
					value={password}
					onChange={(e) => {
						setPassword(e.target.value)
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
					value={password_2}
					onChange={(e) => {
						setPassword_2(e.target.value)
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