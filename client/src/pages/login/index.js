// axios
import axios from "axios"
// react
import { useState, useRef } from "react"
// redux
import { useDispatch, useSelector } from "react-redux"
// next
import { useRouter } from "next/router"

const Login = () => {
	const router = useRouter()

	// redux
	const dispatch = useDispatch()
	const loggedReducer = useSelector((state) => state.loggedReducer)
	const logInOut = () => dispatch({ type: loggedReducer.logged ? "LOG_OUT" : "LOG_IN" })

	const [username, setUsername] = useState("")
	const [password, setPassword] = useState("")
	const usernameRef = useRef()
	const passwordRef = useRef()
	const errorRef = useRef()

	const login = async (e) => {
		e.preventDefault()
		const data = { username, password }
		const config = {
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			}
		}
		await axios.post(`http://localhost:8080/api/auth/login/`, data, config)
			.then(res => res.data)
			.then(data => {
				if(!data.message) {
					localStorage.setItem("username", data.username)
					localStorage.setItem("token", data.token)
					logInOut()
					router.push("/")
				}
				else if (data.message == "Incorrect login or password") {
					usernameRef.current.style.outline = ".125rem solid red"
					passwordRef.current.style.outline = ".125rem solid red"
					errorRef.current.style.display = "block"
				}
			})
			.catch(e => console.log(e))
	}

	const hideError = () => {
		usernameRef.current.style.outline = "none"
		passwordRef.current.style.outline = "none"
		errorRef.current.style.display = "none"
	}

	return (
		<main className="login wrapper">
			<form
				onSubmit={login}>
				<input
					ref={usernameRef}
					minLength="4"
					maxLength="16"
					value={username}
					onChange={(e) => {
						setUsername(e.target.value)
						hideError()
					}}
					required
					type="text"
					placeholder="Username"
				/>
				<input
					ref={passwordRef}
					minLength="4"
					maxLength="16"
					value={password}
					onChange={(e) => {
						setPassword(e.target.value)
						hideError()
					}}
					required
					type="password"
					placeholder="Password"
				/>
				<div ref={errorRef} className="error">Incorrect login or password</div>
				<button className="btn">Log in</button>
			</form>
		</main>
	)
}

export default Login
