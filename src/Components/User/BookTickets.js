import React,{ useEffect, useState }  from 'react'
import { useNavigate } from 'react-router-dom'
import NavbarComp from '../Navbar/NavbarComp'
import { createAxios, getTokenFromLocalStorage } from '../../Hooks/UseAxios'
import styled from 'styled-components/macro'

const Container = styled.section`
  /* border: 1px solid olive; */
  max-width: 1000px;
  margin: 0 auto;
  padding-top: 5rem;
  box-sizing: border-box;
  `

export default function BookTickets(){
    const navigate = useNavigate()
    const token = getTokenFromLocalStorage()
    const [ticket,setTicket] = useState({
      loginId: '',
      movieName: '',
      theatreName: '',
      noOfTickets: '',
      seatNumber: []
    })

  //check user role
  const user = localStorage.getItem('user')
  const parsedUser = JSON.parse(user)
  const userRole = parsedUser?.roles[0]
  useEffect(() => {
    if (!user || userRole !== 'ROLE_USER') {
      navigate('/')
    }
  }, [userRole])

  const handleChange = (e) => {
    const { id, value} = e.target;
    if(id === 'seatNumber'){
      const seatNumber = value.split(",").map((num) => num.trim());
      setTicket((prevTicket) => ({...prevTicket, [id]: seatNumber}));
    }else{
      setTicket((prevTicket) => ({ ...prevTicket, [id]: value}));
    }
  };

  const handleSubmit = async (movieName) => {
    // axios
    //   .post(`http://localhost:8081/api/v1.0/moviebooking/${movieName}/add`, ticket)
    //   .then((response) => {
    //     console.log(response.data);
    //     alert("Ticket Booked!")
    //   })
    //   .catch((error) =>{
    //     console.error(error);
    //   });

    const token = parsedUser.accessToken
    console.log(parsedUser)
    //const apiUrl = 'http://localhost:8081/api/v1.0/moviebooking'
    const apiUrl = 'https://movieapp-danish.azurewebsites.net'
    const authAxios = createAxios(apiUrl, token)

    const data = await authAxios.post(`/${movieName}/add`, ticket)
    alert('Tickets Booked!');
  };

  return(
    <>
    <NavbarComp />
    <Container>
    <h2 className='mt-5'>Book Ticket</h2>
        <form className='row g-3 mt-5' noValidate>
        <div className='col-md-6'>
            <label htmlFor='loginId' className='form-label'>
              Login ID
            </label>
            <input
              type='text'
              className='form-control'
              id='loginId'
              value={ticket.loginId}
              onChange={handleChange}
              required
            />
          </div>
          <div className='col-md-6'>
            <label htmlFor='movieName' className='form-label'>
              Movie Name
            </label>
            <input
              type='text'
              className='form-control'
              id='movieName'
              value={ticket.movieName}
              onChange={handleChange}
              required
            />
            <div className='valid-feedback'>Looks good!</div>
          </div>
          <div className='col-md-6'>
            <label htmlFor='theatreName' className='form-label'>
              Theatre Name
            </label>
            <input
              type='text'
              className='form-control'
              id='theatreName'
              value={ticket.theatreName}
              onChange={handleChange}
              required
            />
          </div>
          <div className='col-md-6'>
            <label htmlFor='noOfTickets' className='form-label'>
              Number of Tickets
            </label>
            <input
              type='text'
              className='form-control'
              id='noOfTickets'
              value={ticket.noOfTickets}
              onChange={handleChange}
              required
            />
          </div>
          <div className='col-md-6'>
            <label htmlFor='seatNumber' className='form-label'>
              Seat Numbers
            </label>
            <input
              type='text'
              className='form-control'
              value={ticket.seatNumber}
              id='seatNumber'
              onChange={handleChange}
              required
            />
          </div>

          {/* <ErrorBox>{error && errorMessage}</ErrorBox> */}
          <div className='col-12'>
            <button
              type='submit'
              className='btn btn-primary'
              onClick={() => handleSubmit(ticket.movieName)}
            >
              Book
            </button>
          </div>
        </form>
    </Container>
    
    </>
  )
}