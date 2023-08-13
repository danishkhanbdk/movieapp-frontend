import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import NavbarComp from '../Navbar/NavbarComp'
import { createAxios, getTokenFromLocalStorage } from '../../Hooks/UseAxios'
import Table from 'react-bootstrap/Table'
import styled from 'styled-components/macro'
import 'react-pro-sidebar/dist/css/styles.css'
import { Button } from 'react-bootstrap'


const Container = styled.section`
  /* border: 1px solid olive; */
  max-width: 1000px;
  margin: 0 auto;
  box-sizing: border-box;
  margin-top: 8rem;
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
  margin-top: 8rem;

  @media (max-width: 800px) {
    width: 100%;
  }
`

const RightContainer = styled.div`
  float: right;
  width: 50%;
  display: flex;
  justify-content: center;
  margin-top: 8rem;
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

export default function AllTicket() {
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
  const [movies, setMovies] = useState([]);
  const [tickets, setTickets]= useState([]);

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
  const apiUrl = 'http://localhost:8081/api/v1.0/moviebooking'
  const authAxios = createAxios(apiUrl, accessToken)


  const data = await authAxios.get('/all', {
    validateStatus: function(status){
      return status<500;
    }
  })
  setMovies(data?.data);
  };

  useEffect(() => {
     fetchMovies()
  }, [])

  const fetchTickets = async(movieName) => {
    const accessToken = parsedUser?.accessToken
  //console.log(accessToken)
  const apiUrl = 'https://movieapp-danish.azurewebsites.net/'
  const authAxios = createAxios(apiUrl, accessToken)


  const data = await authAxios.get(`/getallbookedtickets/${movieName}`, {
    validateStatus: function(status){
      return status<500;
    }
  })
  setTickets(data?.data);
  }

  return (
    <>
      <NavbarComp />
        <RightContainer>
        <Table striped bordered hover variant='light'>
          <thead>
            <tr>
              <th>ID</th>
              <th>Movie Name</th>
              <th>Theatre Name</th>
              <th>Tickets </th>
              <th>Seat Numbers</th>
            </tr>
          </thead>
          <tbody>
            {tickets?.map((item,index) => {
              return (
                <tr key={index}>
                  <td>{item.loginId}</td>
                  <td>{item.movieName}</td>
                  <td>{item.theatreName}</td>
                  <td>{item.noOfTickets}</td>
                  <td>
                    {Array.isArray(item.seatNumber)
                        ? item.seatNumber.join(', ')
                        : 'N/A'}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </Table>
        </RightContainer>
        <LeftContainer>
        <Table striped bordered hover variant='light'>
          <thead>
            <tr>
              <th>Movie Name</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {movies?.map((item,index) => {
              return (
                <tr key={index}>
                  <td>{item.movieName}</td>
                  <td>
                    <Button
                        variant="success"
                        onClick={() => fetchTickets(item.movieName)}
                    >
                        Booking
                    </Button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </Table>
        </LeftContainer>
    </>
  )
}
