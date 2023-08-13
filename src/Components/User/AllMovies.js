import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import NavbarComp from '../Navbar/NavbarComp'
import { createAxios, getTokenFromLocalStorage } from '../../Hooks/UseAxios'
import Table from 'react-bootstrap/Table'
import styled from 'styled-components/macro'
import 'react-pro-sidebar/dist/css/styles.css'


const Container = styled.section`
  /* border: 1px solid olive; */
  max-width: 1000px;
  margin: 0 auto;
  box-sizing: border-box;
  margin-top: 8rem;
`

export default function AllMovies() {
  const navigate = useNavigate()
  const token = getTokenFromLocalStorage()
  const [error, setError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  //check user role
  const user = localStorage.getItem('user')
  const parsedUser = JSON.parse(user)
  const userRole = parsedUser?.roles[0]
  useEffect(() => {
    if (!user || userRole !== 'ROLE_USER') {
      navigate('/')
    }
  }, [userRole])

  const [movies, setMovies] = useState([]);

  // useEffect(() => {
  //   fetchMovies();
  // }, []);

  const fetchMovies = async () => {
  //  try {
  //   const response = await axios.get('http://localhost:8081/api/v1.0/moviebooking/all')
  //   setMovies(response.data?.data);
  //  } catch(error){
  //   console.log(error);
  //  }
   const accessToken = parsedUser?.accessToken
    //console.log(accessToken)
    //const apiUrl = 'http://localhost:8081/api/v1.0/moviebooking'
    const apiUrl = 'https://movieapp-danish.azurewebsites.net'
    const authAxios = createAxios(apiUrl, accessToken)


    const response = await authAxios.get('/all', {
      validateStatus: function(status){
        return status<500;
      }
    })
      setMovies(response.data);
  };

  useEffect(() => {
     fetchMovies()
  }, [])

  return (
    <>
      <NavbarComp />
      <Container>
        <Table striped bordered hover variant='light'>
          <thead>
            <tr>
              <th>Movie Name</th>
              <th>Theatre Name</th>
              <th>Number Of Tickets Available</th>
              <th>Tickets Status</th>
            </tr>
          </thead>
          <tbody>
            {movies?.map((item,index) => {
              return (
                <tr key={index}>
                  <td>{item.movieName}</td>
                  <td>{item.theatreName}</td>
                  <td>{item.noOfTicketsAvailable}</td>
                  <td>{item.ticketsStatus}</td>
                </tr>
              )
            })}
          </tbody>
        </Table>
      
      </Container>
    </>
  )
}
