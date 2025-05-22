/* TODO - add your code to create a functional React component that renders details for a single book. Fetch the book data from the provided API. You may consider conditionally rendering a 'Checkout' button for logged in users. */

import axios from "axios"
import { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"
import "./books.css"

const SingleBook = ({ user }) => {
    const { id } = useParams()
    const [ book, setBook ] = useState(null)

    useEffect(() => {
        const fetchBook = async () => {
            try {
                const { data } = await axios.get(`https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/books/${id}`)
                setBook( data )
            } catch (error) {
                console.error("Error fetching book", error)
            }
        }
        fetchBook()
    }, [id])

    return (
        <div className="single-book-container">
          {book ? (
            <div className="book-details-card">
              <img src={book.coverimage} alt={book.title} className="book-cover" />
              <h3>{book.title}</h3>
              <p>Author: {book.author}</p>
              <p>Description: {book.description}</p>
              <p>Available: {book.available}</p>
            </div>
          ) : (
            <p>Loading book details...</p>
          )}
          <Link to="/">Back to all books</Link>
        </div>
    );
};
    
export default SingleBook;