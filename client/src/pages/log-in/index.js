// react
import { useEffect, useState, useRef } from "react"
// redux
import { useDispatch, useSelector } from "react-redux"
// hooks
import useInput from "@/hooks/useInput"

const Login = () => {
	// redux
	const dispatch = useDispatch()
	const loggedReducer = useSelector((state) => state.loggedReducer)
	const logInOut = () => dispatch({ type: loggedReducer.logged ? "LOG_OUT" : "LOG_IN" })

	const [localStorageUsername, setLocalStorageUsername] = useState()
	const username = useInput()
	const usernameRef = useRef()
	const password = useInput()
	const passwordRef = useRef()
	const errorRef = useRef()

	const login = async (e, username, password) => {
		e.preventDefault()
		await fetch("http://localhost:8080/api/auth/login", {
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
				if (!data.message) {
					localStorage.setItem("username", data.username)
					localStorage.setItem("password", data.password)
					logInOut()
					document.querySelector("header .logo").click()
				} else if (data.message == "Incorrect login or password") {
					usernameRef.current.style.outline = ".125rem solid red"
					passwordRef.current.style.outline = ".125rem solid red"
					errorRef.current.style.display = "block"
				}
			})
			.catch((e) => console.log(e))
	}

	const hideError = () => {
		usernameRef.current.style.outline = "none"
		passwordRef.current.style.outline = "none"
		errorRef.current.style.display = "none"
	}

	useEffect(()=>{
		setLocalStorageUsername(localStorage.getItem("username"))
	}, [])

	return (
		<>
			{ localStorageUsername?
					<div className="wrapper">Forbidden 403</div>
				:
					<main className="login wrapper">
						<form
							onSubmit={(e) => {
								login(e, username.value, password.value)
							}}>
							<input
								ref={usernameRef}
								minLength="4"
								maxLength="16"
								value={username.value}
								onChange={(e) => {
									username.onChange(e)
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
								value={password.value}
								onChange={(e) => {
									password.onChange(e)
									hideError()
								}}
								required
								type="password"
								placeholder="Password"
							/>
							<div ref={errorRef} className="error">
								Incorrect login or password
							</div>
							<button className="btn">Log in</button>
						</form>
					</main>
			}
		</>
	)
}

export default Login
