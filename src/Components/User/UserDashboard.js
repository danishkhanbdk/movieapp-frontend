import React, { useEffect } from 'react'
import NavbarComp from '../Navbar/NavbarComp'
import { useNavigate } from 'react-router-dom'
import { createAxios } from '../../Hooks/UseAxios'
import styled from 'styled-components/macro'

const Container = styled.section`
  /* border: 1px solid olive; */
  /* max-width: 1000px; */
  margin: 0 auto;
  box-sizing: border-box;

  height: 90vh;
  box-sizing: border-box;
  /* background: rgb(248, 249, 255); */
  display: flex;
  justify-content: center;

  img {
    width: 90%;
    /* height: 80%; */
    /* max-width: 1100px; */
  }

  @media (max-width: 500px) {
    align-items: center;
    img {
      max-width: 380px;
      /* max-height: 50%; */
    }
  }
`

export default function UserDashboard() {
  const navigate = useNavigate()

  //check user role
  const user = localStorage.getItem('user')
  const parsedUser = JSON.parse(user)
  console.log(parsedUser)
  const roles = parsedUser?.roles[0]
  useEffect(() => {
    if (!user || roles !== 'ROLE_USER') {
      navigate('/')
    }
  }, [roles])

  const fetchAdminData = async () => {
    const accessToken = parsedUser?.accessToken
    //console.log(accessToken)
    //const apiUrl = 'http://localhost:8081/api/v1.0/moviebooking'
    const apiUrl = 'https://movieapp-danish.azurewebsites.net'
    const authAxios = createAxios(apiUrl, accessToken)


    const data = await authAxios.get('/forUser',{
      validateStatus: function(status){
        return status<500;
      }
    })

    // console.log(data)
  }
  useEffect(() => {
    if (user && roles === 'ROLE_USER') fetchAdminData()
  }, [])

  return (
    <>
      <NavbarComp />
      <Container>
        <img src='userdashboard.png' alt='logo' />
      </Container>
    </>
  )
}
