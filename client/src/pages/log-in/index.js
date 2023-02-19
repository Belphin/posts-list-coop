// redux
import { useDispatch, useSelector } from "react-redux"
// hooks
import useInput from "@/hooks/useInput"

const Login = () => {
  const dispatch = useDispatch()

  // logged
  const loggedReducer = useSelector(state => state.loggedReducer)
  const logInOut = () => dispatch({ type: loggedReducer.logged? "LOG_OUT" : "LOG_IN" })

	const username = useInput()
	const password = useInput()

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
				if(!data.message){
					localStorage.setItem("username", data.username)
					localStorage.setItem("password", data.password)
					logInOut()
					document.querySelector("header .logo").click()
				}
			})
	}

  return (
		<main className="login wrapper">
			<form onSubmit={(e)=>{login(e, username.value, password.value)}}>
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
				<button className="btn">Log in</button>
			</form>
		</main>
  )
}
 
export default Login