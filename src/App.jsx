import axios, { all } from "axios"
import { useEffect, useState } from "react"
import { Route, useLocation, Routes } from "react-router-dom"

import LoginForm from "./components/Login"
import AllBooks from "./components/Books"
import SingleBook from "./components/SingleBook"
import Register from "./components/Register"
import Account from "./components/Account"
import NavBar from "./components/Navigations"



function App() {
  const [allBooks, setAllBooks] = useState([])
  const [user,setUser] = useState(null)
  const [reservations, setReservations] = useState([])
  const location = useLocation()

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const { data } = await axios.get("https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/books")
        console.log("Fetched Books", data)
        setAllBooks(data)
      } catch (error) {
        console.error("Error fetching books", error)
      }
    }
    fetchBooks()
  }, [])

  useEffect(() => {
    const loggedInToken = window.localStorage.getItem("token")
    if(loggedInToken) {
      authenticate(loggedInToken)
    }
  }, [])

  const authenticate = async (token) => {
    try {
      if(!token) {
        throw Error("No token found")
      }
      const response = await axios.get("https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/users/me", {
        headers : {
          Authorization: `Bearer ${token}`
        }
      })
      console.log("Authenticated user", response.data)
      setUser(response.data)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const {data} = await axios.get("https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/reservations", {
          headers: {
            Authorization: `Bearer ${window.localStorage.getItem('token')}`
          }
        })
        console.log("Reservtions:", data)
        setReservations(data)
      } catch (error) {
        console.error(error)
      }
    }
    if (user?.id) {
      fetchReservations()
    }
  }, [user])



  return (
    <div>
      <div className="icon-text">
        <img id="logo-image" src="https://www.iconpacks.net/icons/2/free-opened-book-icon-3163-thumb.png" alt="Library Logo" />
        <h1 className="title">Library App</h1>
      </div>
      

      <NavBar user={user || {}} setUser={setUser} />

      {!user?.id && location.pathname !== "/register" && (
        <div>
          <h1>Welcome back! Please log in to continue.</h1>
          <LoginForm authenticate={authenticate} />
          <hr />
        </div>
      )}

      <Routes>
        <Route path="/" element={<AllBooks allBooks={allBooks} setAllBooks={setAllBooks} user={user} reservations={reservations} setReservations={setReservations} />} /> 
        <Route path="/books" element={<AllBooks allBooks={allBooks} setAllBooks={setAllBooks} user={user} reservations={reservations} setReservations={setReservations} />}/>
        <Route path="/books/:id" element={<SingleBook user={user} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/about/account" element={<Account user={user} reservations={reservations} setReservations={setReservations} />} />
      </Routes>
    </div>
  )
}

export default App
