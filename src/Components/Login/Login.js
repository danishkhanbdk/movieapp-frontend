import React, { useContext, useEffect, useState } from 'react'
import styled from 'styled-components/macro'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import userContext from '../../Context/userContext'
import NavbarComp from '../Navbar/NavbarComp'
import { Button, Form } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const LoginContainer = styled.main`
  /* border: 1px solid red; */
  height: 90vh;
`

const ErrorBox = styled.div`
  height: 30px;
  margin: 1rem 0;
  color: red;
  text-align: center;
`
const LeftContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 1rem;
  align-items: flex-end;
  float: left;
  width: 50%;
  height: 100%;

  @media (max-width: 800px) {
    width: 100%;
  }
`
const Footer = styled.footer`
  background-color: #212529;
  height: 3.6vh;
`
const FormWrapper = styled.div`
  width: 60%;

  @media (max-width: 800px) {
    width: 100%;
  }
`

const RightContainer = styled.div`
  float: right;
  width: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  /* border: 1px solid purple; */
  height: 100%;
  img {
    width: 100%;
    max-width: 800px;
  }

  @media (max-width: 800px) {
    display: none;
      
  }
`

export default function Login() {
  const [formData, setFormData] = useState({
    loginId: '',
    password: '',
  })

  const { loginId, password } = formData

  const [error, setError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  let navigate = useNavigate()

  const { userData, setUserData } = useContext(userContext)

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!loginId || !password) {
      setError(true)
      setErrorMessage('Fields cannot be empty!')
    }
    if (loginId && password) {
      setError(false)
      //const URL = 'http://localhost:8081/api/v1.0/moviebooking/login'
      const URL = 'https://movieapp-danish.azurewebsites.net/login'
      const postData = { loginId: loginId, password: password }

      await axios
        .post(URL, postData)
        .then((response) => {
          setError(false)
          console.log(response.data)
          const accessToken = response.data.accessToken
          const roles = response.data.roles
          //console.log(roles)
          if (accessToken) {
            const user = { accessToken, roles }
            setUserData(user)
            localStorage.setItem('user', JSON.stringify(response.data))
            //console.log(user?.roles)
            if (user?.roles[0] === 'ROLE_ADMIN') navigate('/forAdmin')
            if (user?.roles[0] === 'ROLE_USER') navigate('/forUser')
            //console.log(user?.roles[0])
            //console.log(user)
          }
        })
        .catch((error) => {
          setError(true)
          setErrorMessage('Invalid Credentials!')
          setFormData({ password: '' })
          console.log(error)
        })
    }
  }

  useEffect(() => {
    if (localStorage.getItem('user')) {
      setUserData(localStorage.getItem('user'))
    }
  }, [userData])

  return (
    <>
      <NavbarComp />
      <LoginContainer>
        <LeftContainer>
          <FormWrapper>
            <Form>
              <Form.Group controlId='formBasicEmail' className='mb-4'>
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Username'
                  name='loginId'
                  value={loginId || ''}
                  onChange={onChange}
                  required
                />
              </Form.Group>

              <Form.Group controlId='formBasicPassword'>
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type='password'
                  placeholder='Password'
                  name='password'
                  value={password || ''}
                  onChange={onChange}
                  required
                />
              </Form.Group>
              <ErrorBox>{errorMessage}</ErrorBox>
              <div className='d-grid '>
                <Button
                  className='btn btn-primary'
                  type='button'
                  onClick={handleSubmit}
                >
                  Login
                </Button>
              </div>
              <div className='d-grid '>
                <p>
                  Don't have an account? <Link to='/signup'>Sign Up</Link>
                </p>
              </div>
            </Form>
          </FormWrapper>
        </LeftContainer>

        <RightContainer>
          <img src='login.jpg' alt='logo' />
        </RightContainer>
      </LoginContainer>
      <Footer></Footer>
    </>
  )
}
