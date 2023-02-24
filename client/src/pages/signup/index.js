// axios
import axios from "axios"
// react
import { useRef, useState } from "react"
// redux
import { useDispatch } from "react-redux"
import { login } from "@/store/userSlice"
// next
import { useRouter } from "next/router"

const SignUp = () => {
	const dispatch = useDispatch()
	const router = useRouter()

	const [username, setUsername] = useState("")
	const [password, setPassword] = useState("")
	const [password_2, setPassword_2] = useState("")
	const usernameRef = useRef()
	const passwordRef = useRef()
	const userExists = useRef()
	const diffPass = useRef()

	const submitForm = async (e) => {
		e.preventDefault()
		const data = { username, password }
		if(password === password_2){
			await axios.post("http://localhost:8080/api/auth/registration", data)
				.then(res => res.data)
				.then(data => {
					dispatch(login({
						username: data.username,
						token: data.token
					}))
					router.push("/")
				})
				.catch(e => {
					if(e.response.data.message == "User already registered") showUserExistsError()
					else console.log(e)
				})
		}
		else showDiffPassError()
	}

	const showUserExistsError = () => {
		usernameRef.current.style.outline = ".125rem solid red"
		userExists.current.style.display = "block"
	}

	const showDiffPassError = () => {
		passwordRef.current.style.outline = ".125rem solid red"
		diffPass.current.style.display = "block"
	}

	const hideErrors = () => {
		usernameRef.current.style.outline = "none"
		userExists.current.style.display = "none"
		passwordRef.current.style.outline = "none"
		diffPass.current.style.display = "none"
	}

	return (
		<main className="login wrapper">
			<form onSubmit={submitForm}>
				<input
					ref={usernameRef}
					minLength="4"
					maxLength="16"
					value={username}
					onChange={(e) => {
						setUsername(e.target.value)
						hideErrors()
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
						hideErrors()
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
						hideErrors()
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