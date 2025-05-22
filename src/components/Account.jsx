/* TODO - add your code to create a functional React component that renders account details for a logged in user. Fetch the account data from the provided API. You may consider conditionally rendering a message for other users that prompts them to log in or create an account.  */

import axios from "axios"
import { Link } from "react-router-dom"
import "./books.css"

const Account = ({ user, reservations, setReservations }) => {

    const returnBook = async (reservationId) => {
        try {
            const token = window.localStorage.getItem("token")
            if (!token) {
                throw new Error("No token found")
            }

            await axios.delete(`https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/reservations/${reservationId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })

            const updatedReservations = reservations.filter(
                (res) => res.id !== reservationId
            )
            setReservations(updatedReservations)
            console.log("Returned reservation:", reservationId)
        } catch (error) {
            console.error("Error returning book", error)
        }
    }

    if (!user?.id) {
        return (
            <div className="account-container">
                <h1>Account Details</h1>
                <p className="return-message">
                    Please <Link to="/login">log in</Link> or <Link to="register">create an account</Link>
                    to view your account details.
                </p>
            </div>
        )
    }

    return (
        <div className="account-container">
            <h1>{user.firstname}'s Account</h1>

            <div className="account-info">
                <h3>Info:</h3>
                <p>User ID: {user.id}</p>
                <p>Name: {user.firstname} {user.lastname}</p>
                <p>Email: {user.email}</p>
            </div>

            <hr />

            <h2>Reserved Books:</h2>
            {reservations && reservations.length > 0 ? (
                <div className="booksContainer">
                    {reservations.map ((reservation) => (
                        <div key={reservation.id} className="book">
                            <img src={reservation.coverimage} alt={reservation.title} />

                            <Link to={`/books/${reservation.book_id}`}>
                                <h3>{reservation.title}</h3>
                            </Link>

                            <p>Author: {reservation.author}</p>

                            <button onClick={() => returnBook(reservation.id)}>Return Book</button>
                        </div>
                    ))}
                </div>
                ) : (
                    <h3>
                        Looks like you haven’t reserved any books. <br />
                        Don’t miss out—explore our library and reserve a book to get started today!
                    </h3>
                    )}
                <hr />
            <Link to="/">Back to all books.</Link>
        </div>
    )
}

export default Account