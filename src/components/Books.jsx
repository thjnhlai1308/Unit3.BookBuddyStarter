/* TODO - add your code to create a functional React component that displays all of the available books in the library's catalog. Fetch the book data from the provided API. Users should be able to click on an individual book to navigate to the SingleBook component and view its details. */

import "./books.css"
import axios from "axios"
import { useNavigate, Link } from "react-router-dom"

const AllBooks = ({allBooks, setAllBooks, user, reservations, setReservations}) => {
    const navigate = useNavigate()

    const checkRes = (bookId) => {
        return reservations.find((reservation) => {
            return reservation.books_id == bookId
        })
    }

    const addToRes = async (bookId, userId) => {
        try {
            const token = localStorage.getItem('token')
            if (!token) throw new Error('No token found, user not logged in')

                const response = await axios.post('https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/reservations', 
                    { bookId, userId }, {
                        headers: {
                            Authorization: `Bearer ${token}`
                        },
                    }
                )

                console.log("Reservation added", response.data)

                setReservations(prev => [
                    ...prev, {
                        id: response.data.id,
                        books_id: bookId,
                        users_id: userId
                    }
                ])
        } catch (error) {
            if (error.response) {
                console.error("Server error:", error.response.data)
                if (error.response.data.name === "AlreadyReserved") {
                    alert("THis book is already reserved.")
                    return
                }
            } else {
                console.error(error)
            }
            alert("Failed to reserve the book.")
        } 
    } 

    return (
        <div className="booksContainer">
            {
                allBooks.map ((book) => {
                    return (
                        <div key={book.id} className="book">
                            <img src={book.coverimage} alt={book.author} />

                            <Link to={`/books/${book.id}`}>
                                <h3>{book.title}</h3>                            
                            </Link>

                            <p>Author: {book.author}</p>


                            {
                                user && user.id ? (
                                    <div>
                                        {
                                            checkRes(book.id) ? (
                                                <button disabled={true}>Reserved</button>
                                            ) : (
                                                <button onClick={() => addToRes(book.id, user.id)}>Reserve this Book</button>
                                            )
                                        }
                                    </div>
                                ) : (
                                    null
                                )
                            }

                        </div>
                    )
                })
            }

        </div>
    )
}

export default AllBooks