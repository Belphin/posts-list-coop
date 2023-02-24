// axios
import axios from "axios"
// react
import { useState, useRef } from "react"
// redux
import { useDispatch } from "react-redux"
import { login } from "@/store/userSlice"
// next
import { useRouter } from "next/router"

const Login = () => {
	const dispatch = useDispatch()
	const router = useRouter()

	const [username, setUsername] = useState("")
	const [password, setPassword] = useState("")
	const usernameRef = useRef()
	const passwordRef = useRef()
	const errorRef = useRef()

	const submitForm = async (e) => {
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
				dispatch(login({
					username: data.username,
					token: data.token
				}))
				router.push("/")
			})
			.catch(e => {
				if(e.response.data.message == "Incorrect login or password") showError()
				else console.log(e)
			})
	}

	const hideError = () => {
		usernameRef.current.style.outline = "none"
		passwordRef.current.style.outline = "none"
		errorRef.current.style.display = "none"
	}

	const showError = () => {
		usernameRef.current.style.outline = ".125rem solid red"
		passwordRef.current.style.outline = ".125rem solid red"
		errorRef.current.style.display = "block"
	}

	return (
		<main className="login wrapper">
			<form
				onSubmit={submitForm}>
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
