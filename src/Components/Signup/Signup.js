import React, { useState } from 'react'
import NavbarComp from '../Navbar/NavbarComp'
import styled from 'styled-components/macro'
import { useNavigate } from 'react-router-dom'
import { createAxios, getTokenFromLocalStorage } from '../../Hooks/UseAxios'
import 'react-datepicker/dist/react-datepicker.css'
import axios from 'axios'

const SignupContainer = styled.section`
  /* border: 1px solid olive; */
  max-width: 1000px;
  margin: 0 auto;
  box-sizing: border-box;
`

const ErrorBox = styled.div`
  height: 30px;
  margin: 1rem 0;
  /* border: 1px solid red; */
  color: red;
  width: 100%;
  padding: 2px 0;
  text-align: center;
`

export default function Signup() {
  const [error, setError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  // const token = getTokenFromLocalStorage()

  const [user, setUser] = useState({
    loginId: '',
    firstName: '',
    lastName: '',
    email: '',
    contactNumber: '',
    password: ''
  });
  const navigate = useNavigate()
  const onChange = (event) => {
    setUser({...user, [event.target.id]: event.target.value});
  };

  const submitForm = () => {
    axios
      .post('https://movieapp-danish.azurewebsites.net/register', user)
      .then((response) => {
        console.log(response.data)
        alert("User registered successfully!");
        navigate(-1);
      })
      .catch((error) => {
        console.error(error.response);
        alert("Login ID is already taken!")
      });

    // const apiUrl = 'http://localhost:8081/api/v1.0/moviebooking'
    // const authAxios = createAxios(apiUrl, token)


    // const data = await authAxios.post('/register')

    // if (data.data === 'User with username Already Existed') {
    //   setError(true)
    //   setErrorMessage('User with username already exist')
    // } else {
    //   window.alert('New user successfully created!')
    //   navigate(-1)
    // }
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    if (
      !user.firstName ||
      !user.lastName ||
      !user.loginId ||
      !user.email||
      !user.contactNumber ||
      !user.password
    ) {
      setError(true)
      setErrorMessage('Fields cannot be empty!')
    } else {
      setError(false)
      submitForm()
      console.log(user)
    }
  }
  return (
    <>
      <NavbarComp />
      <SignupContainer>
        <h2 className='mt-5'>User Registration</h2>
        <form className='row g-3 mt-5' noValidate>
        <div className='col-md-6'>
            <label htmlFor='loginId' className='form-label'>
              Login ID
            </label>
            <input
              type='text'
              className='form-control'
              id='loginId'
              value={user.loginId}
              onChange={onChange}
              required
            />
          </div>
          <div className='col-md-6'>
            <label htmlFor='firstName' className='form-label'>
              First Name
            </label>
            <input
              type='text'
              className='form-control'
              id='firstName'
              value={user.firstName}
              onChange={onChange}
              required
            />
            <div className='valid-feedback'>Looks good!</div>
          </div>
          <div className='col-md-6'>
            <label htmlFor='lastName' className='form-label'>
              Last Name
            </label>
            <input
              type='text'
              className='form-control'
              id='lastName'
              value={user.lastName}
              onChange={onChange}
              required
            />
          </div>
          <div className='col-md-6'>
            <label htmlFor='email' className='form-label'>
              Email Id
            </label>
            <input
              type='text'
              className='form-control'
              id='email'
              value={user.email}
              onChange={onChange}
              required
            />
          </div>
          <div className='col-md-6'>
            <label htmlFor='contactNumber' className='form-label'>
              Contact Number
            </label>
            <input
              type='text'
              className='form-control'
              value={user.contactNumber}
              id='contactNumber'
              onChange={onChange}
              required
            />
          </div>
          
          <div className='col-md-6'>
            <label htmlFor='password' className='form-label'>
              Password
            </label>
            <input
              type='password'
              className='form-control'
              id='password'
              value={user.password}
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
              Sign in
            </button>
          </div>
        </form>
      </SignupContainer>
    </>
  )
}
