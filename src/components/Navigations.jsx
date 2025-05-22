/* TODO - add your code to create a functional React component that renders a navigation bar for the different views in your single page application. You may consider conditionally rendering some options - for example 'Login' should be available if someone has not logged in yet. */

import { Link, useNavigate } from "react-router-dom"
import "./books.css"

const NavBar = ({ user, setUser }) => {
    const navigate = useNavigate()

    const logout = () => {
        window.localStorage.removeItem("token")
        setUser(null)
        navigate("/")
    }

    return (
        <nav className="navbar">
            <div className="navbar-left">
                <Link to="/" className="navbar-brand">Home</Link>
            </div>
            

            {user?.id ? (
                <div className="navbar-links">
                    <span className="navbar-user">Welcome, {user.firstname}!</span>
                    <Link to="/about/account">Account</Link>
                    <button onClick={logout}>Logout</button>
                </div>
            ) : (
                <div className="navbar-links">
                    <Link to="/login">Login</Link>
                    <Link to="/register">Register</Link>
                </div>
            )}
        </nav>
    )
}

export default NavBar