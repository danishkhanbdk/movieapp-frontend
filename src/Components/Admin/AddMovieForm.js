import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import NavbarComp from '../Navbar/NavbarComp'
import { createAxios, getTokenFromLocalStorage } from '../../Hooks/UseAxios'
import Table from 'react-bootstrap/Table'
import styled from 'styled-components/macro'
import 'react-pro-sidebar/dist/css/styles.css'
import Form from 'react-bootstrap/Form'
import axios from 'axios'

const ErrorBox = styled.div`
  height: 30px;
  margin: 1rem 0;
  /* border: 1px solid red; */
  color: red;
  width: 100%;
  padding: 2px 0;
  text-align: center;
`

const Container = styled.section`
  /* border: 1px solid olive; */
  max-width: 1000px;
  margin: 0 auto;
  box-sizing: border-box;
  margin-top: 5rem;
  min-height:82vh ;
`

const Footer = styled.footer`
  background-color: #212529;
  height: 3.6vh;
`

export default function AddMovieForm() {
  const navigate = useNavigate()
  const token = getTokenFromLocalStorage()
  const [error, setError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  //check user role
  const user = localStorage.getItem('user')
  const parsedUser = JSON.parse(user)
  const userRole = parsedUser?.roles[0]
  useEffect(() => {
    if (!user || userRole !== 'ROLE_ADMIN') {
      navigate('/')
    }
  }, [userRole])

  const [movie, setMovie] = useState({
    movieName: '',
    theatreName: '',
    noOfTicketsAvailable: 0,
    ticketsStatus: ''
  });

  // const handleChange = (e) => {
  //   const {movieName, value} = e.target;
  //   setMovie((prevMovie) => ({...prevMovie, [movieName]: value}));
  // };

  // const onChange = (e) => {
  //   const {movieName, value} = e.target;
  //   setError(false)
  //   setMovie((prevMovie) => ({
  //     ...prevMovie,
  //     [movieName]: value,
  //   }))
  // };
  const onChange = (e) => {
    setError(false)
    setMovie((prevMovie) => ({
      ...prevMovie,
      [e.target.id]: e.target.value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    
    axios
      .post('https://movieapp-danish.azurewebsites.net/savemovie', movie)
      .then((response) => {
        console.log(response.data);
        alert("Movie Added!!!");
      })
      .catch((error) => {
        console.log(error);
      })
  };

  return (
    <>
      <NavbarComp />
      <Container>
      <h2 className='mt-5'>Add Movie</h2>
        <form className='row g-3 mt-5' noValidate>
          <div className='col-md-6'>
            <label htmlFor='movieName' className='form-label'>
              Movie Name
            </label>
            <input
              type='text'
              className='form-control'
              id='movieName'
              onChange={onChange}
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
              onChange={onChange}
              required
            />
          </div>
          <div className='col-md-6'>
            <label htmlFor='noOfTicketsAvailable' className='form-label'>
              Number Of Tickets Available
            </label>
            <input
              type='text'
              className='form-control'
              id='noOfTicketsAvailable'
              onChange={onChange}
              required
            />
          </div>
          <div className='col-md-6'>
            <label htmlFor='ticketsStatus' className='form-label'>
              Tickets Status
            </label>
            <input
              type='text'
              className='form-control'
              id='ticketsStatus'
              onChange={onChange}
              required
            />
          </div>

          <ErrorBox>{error && errorMessage}</ErrorBox>
          <div className='col-12'>
            <button
              type='submit'
              className='btn btn-primary'
              onClick={handleSubmit}
            >
              Add Movie
            </button>
          </div>
        </form>
      </Container>
      <Footer></Footer>
    </>
  )
}
