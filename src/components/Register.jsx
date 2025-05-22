/* TODO - add your code to create a functional React component that renders a registration form */

import axios from "axios"
import { Link, useNavigate } from "react-router-dom"
import "./books.css"

const Register = () => {
    const navigate = useNavigate()

    const signup = async (formData) => {
        const firstname = formData.get("firstname")
        const lastname = formData.get("lastname")
        const email = formData.get("email")
        const password = formData.get("password")
        const user = {
            firstname,
            lastname,
            email,
            password
        }
        try {
            const { data } = await axios.post('https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/users/register', user)
            console.log(data)
            alert("Thanks for signing up!")
            navigate('/')
        } catch (error) {
            console.error(error)
            alert("Registration failed. Please try again.")
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const formData = new FormData(e.target)
        signup(formData)
    }

    return (
        <div className="register-container">
            <h2>Welcome! Your next favorite book is waiting. Let's get you signed up!</h2>
            <form onSubmit={handleSubmit} className="register-form">
                <label>
                    Name:
                    <input type="text" name="firstname" placeholder="Firstname" required />
                    <input type="text" name="lastname" placeholder="Lastname" required />
                </label>
                <br />
                <label>
                    Email:
                    <input type="email" name="email" required />
                </label>
                <br />
                <label>
                    Password:
                    <input type="password" name="password" required />
                </label>
                <br />
                <button type="submit">Register</button>
            </form>
            <h3>Already have an account? <Link to="login">Login Here!</Link></h3>
        </div>
    )
}

export default Register