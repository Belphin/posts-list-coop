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
	const password = useInput()
	const password2 = useInput()

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
				console.log(data); ////
				if(data.message == "User was created"){
					localStorage.setItem("username", username)
					localStorage.setItem("password", password)
					logInOut()
					document.querySelector("header .logo").click()
				}
			})
	}

	const registration = (e) => {
		e.preventDefault()
		if(password.value === password2.value) createUser(username.value, password.value)
	}

	return (
		<main className="login wrapper">
			<form onSubmit={registration}>
				<input
					minLength="4"
					maxLength="16"
					value={username.value}
					onChange={username.onChange}
					required
					type="text"
					placeholder="Username"
				/>
				<input
					minLength="4"
					maxLength="16"
					value={password.value}
					onChange={password.onChange}
					required
					type="password"
					placeholder="Password"
				/>
				<input
					minLength="4"
					maxLength="16"
					value={password2.value}
					onChange={password2.onChange}
					required
					type="password"
					placeholder="Confirm the password"
				/>
				<button className="btn">Sign up</button>
			</form>
		</main>
	)
}

export default SignUp