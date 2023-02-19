// hooks
import useInput from "@/hooks/useInput"

const Login = () => {
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
        console.log(data);
			})
	}

  return (
		<main className="login wrapper">
			<form onSubmit={login}>
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