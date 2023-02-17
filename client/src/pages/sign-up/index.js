// react
import { useLayoutEffect } from "react"

const SignUp = () => {
  const createUser = async (username, password) => {
    const data = {
      username: username,
      password: password
    }
    await fetch("http://localhost:8080/api/auth/registration", {
      method: "POST",
      cache: "no-cache",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data),
    })
      .then(res => res.json())
      .then(data => console.log(data))
  }

  useLayoutEffect(()=>{
    createUser("testName", "testPassword")
  }, [])

  return (
    <main className="sign-up wrapper">
      <form>
        <input required type="text" placeholder="Name" />
        <input required type="email" placeholder="Username" />
        <input required type="text" placeholder="Password" />
        <button className="btn">Sign up</button>
      </form>
    </main>
  )
}
 
export default SignUp