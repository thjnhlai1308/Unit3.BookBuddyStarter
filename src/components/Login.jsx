/* TODO - add your code to create a functional React component that renders a login form */

import axios from "axios"
import { Link, useNavigate } from "react-router-dom"
import "./books.css"

const LoginForm = ({ authenticate }) => {
    const navigate =useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        const formData = new FormData(e.target)
        const email = formData.get("email")
        const password = formData.get("password")

        try {
            const { data } = await axios.post("https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/users/login",
                { email, password }
            )
            window.localStorage.setItem("token", data.token)
            await authenticate(data.token)
            navigate("/")
        } catch (error) {
            alert("Login failed. Please try again.")
            console.error(error)
        }
    }

    return (
        <div className="login-container">
            <form onSubmit={handleSubmit}>
                <label>
                    Email:
                    <input type="email" name="email" required />
                </label>
                <label>
                    Password:
                    <input type="password" name="password" required />
                </label>
                <button>Login</button>
            </form>
            <h3>
                New here?
                <Link to="/register">Create an account</Link> to enjoy all the features.
            </h3>
        </div>
    )
} 

export default LoginForm