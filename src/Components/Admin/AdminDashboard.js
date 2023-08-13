import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import NavbarComp from '../Navbar/NavbarComp'
import { createAxios } from '../../Hooks/UseAxios'
import styled from 'styled-components/macro'

const Container = styled.section`
  /* border: 1px solid olive; */
  /* max-width: 1000px; */
  /* margin: 0 auto; */
  height: 90vh;
  box-sizing: border-box;
  /* background: rgb(248, 249, 255); */
  display: flex;
  justify-content: center;

  img {
    width: 90%;
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

const Footer = styled.footer`
  background-color: #212529;
  height: 3.6vh;
`

function AdminDashboard() {
  const navigate = useNavigate()

  //check user role
  const user = localStorage.getItem('user')
  const parsedUser = JSON.parse(user)
  console.log(parsedUser)
  const role = parsedUser?.roles[0]
  //console.log(role)
  useEffect(() => {
    if (!user || role !== 'ROLE_ADMIN') {
      navigate('/')
    }
  }, [role])

  const fetchAdminData = async () => {
    const accessToken = parsedUser.accessToken
    //console.log(accessToken)
    //const apiUrl = 'http://localhost:8081'
    const apiUrl = 'https://movieapp-danish.azurewebsites.net'
    const authAxios = createAxios(apiUrl, accessToken)

    const data = await authAxios.get('/forAdmin')
    
    //console.log(data)
  }
  useEffect(() => {
    if (user && role === 'ROLE_ADMIN') fetchAdminData()
  }, [])

  return (
    <>
      <NavbarComp />
      <Container>
        <img src='admindashboard.png' alt='logo' />
      </Container>
      <Footer></Footer>
    </>
  )
}
export default AdminDashboard
