// react
import useInput from "@/hooks/useInput";

const SignUp = () => {
	const username = useInput();
	const password = useInput();
	const password2 = useInput();

	const createUser = async (username, password) => {
		await fetch("http://localhost:8080/api/auth/registration", {
			method: "POST",
			cache: "no-cache",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				username,
				password,
			}),
		})
			.then((res) => res.json())
			.then((data) => console.log(data));
	};

	const registration = (e) => {
		e.preventDefault();
		if (password.value === password2.value) {
			createUser(username.value, password.value);
		}
	};

	return (
		<main className="sign-up wrapper">
			<form onSubmit={registration}>
				<input
					minlength="4"
					maxLength="16"
					value={username.value}
					onChange={username.onChange}
					required
					type="text"
					placeholder="Username"
				/>
				<input
					minlength="4"
					maxLength="16"
					value={password.value}
					onChange={password.onChange}
					required
					type="text"
					placeholder="Password"
				/>
				<input
					minlength="4"
					maxLength="16"
					value={password2.value}
					onChange={password2.onChange}
					required
					type="text"
					placeholder="Confirm the password"
				/>
				<button type="submit" className="btn">
					Sign up
				</button>
			</form>
		</main>
	);
};

export default SignUp;
