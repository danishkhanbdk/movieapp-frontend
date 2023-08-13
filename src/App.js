import './App.css'
import Homepage from './Components/Homepage'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './Components/Login/Login'
import Signup from './Components/Signup/Signup'
import ErrorPage from './Components/ErrorPage/ErrorPage'
import userContext from './Context/userContext'
import {  useState } from 'react'
import AdminDashboard from './Components/Admin/AdminDashboard'
import UserDashboard from './Components/User/UserDashboard'
import AllMovie from './Components/Admin/AllMovie'
import AddMovieForm from './Components/Admin/AddMovieForm'
import DeleteMovie from './Components/Admin/DeleteMovie'
import AllTicket from './Components/Admin/Bookings'
import AllMovies from './Components/User/AllMovies'
import BookTickets from './Components/User/BookTickets'

function App() {
  const [userData, setUserData] = useState(null)

  return (
    <>
      <Router>
        <userContext.Provider value={{ userData, setUserData }}>
          <Routes>
            <Route path='/' element={<Homepage />} />
            <Route path='/login' element={<Login />} />
            <Route path='/forAdmin' element={<AdminDashboard />}/>
            <Route path='/signup' element={<Signup />} />
            <Route path='/forAdmin/allmovie' element={<AllMovie />} />
            <Route path='/forAdmin/deletemovie' element={<DeleteMovie />} />
            <Route path='/forAdmin/addmovieform' element={<AddMovieForm />} />
            <Route path='/forAdmin/allticket' element={<AllTicket />} />
            <Route path='/forUser' element={<UserDashboard />} />
            <Route path='/forUser/booktickets' element={<BookTickets />} />
            <Route path='/forUser/allmovies' element={<AllMovies />} />
            <Route path='*' element={<ErrorPage />} />
          </Routes>
        </userContext.Provider>
      </Router>
    </>
  )
}

export default App
