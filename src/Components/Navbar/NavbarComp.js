import React, { useEffect, useState } from 'react'
import styled from 'styled-components/macro'
import { Link, useNavigate } from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'

const NavLink = styled.span`
  padding: 8px 12px;
  cursor: pointer;
  color: rgba(255, 255, 255, 0.55);

  &:hover {
    color: rgba(255, 255, 255, 0.75);
  }
  &:active {
    color: #fff;
  }

  @media (max-width:500px){
    display: block;
  }
`
export default function NavbarComp() {
  const getUser = localStorage.getItem('user')
  const parseUser = JSON.parse(getUser)
  const parsedToken = parseUser?.accessToken
  const userRole = parseUser?.roles[0]

  const [token, setToken] = useState(parsedToken)

  const navigate = useNavigate()

  const Logout = () => {
    localStorage.removeItem('user')
    setToken(null)
    navigate('/')
  }
  useEffect(() => {}, [token])

  return (
    <>
      <Navbar bg='dark' expand='lg' variant='dark' className='py-3'>
        <Container>
         
          <Navbar.Brand> Movie App!</Navbar.Brand>
         
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='me-auto'>
              <li>
              {userRole === 'ROLE_ADMIN' ? (
                <><Link to='/forAdmin' style={{ textDecoration: 'none' }}>
                    <NavLink>Home</NavLink>
                  </Link>
                  <Link to='/forAdmin/allmovie' style={{ textDecoration: 'none' }}>
                    <NavLink>All Movies</NavLink>
                  </Link>
                  <Link to='/forAdmin/deletemovie' style={{ textDecoration: 'none' }}>
                      <NavLink>Delete Movie</NavLink>
                  </Link>
                  <Link to='/forAdmin/addmovieform' style={{ textDecoration: 'none' }}>
                    <NavLink>Add Movie</NavLink>
                  </Link>
                  <Link to='/forAdmin/allticket' style={{ textDecoration: 'none' }}>
                    <NavLink>Bookings</NavLink>
                  </Link>
                  </>
                  ) : (userRole === 'ROLE_USER' ?(
                    <>
                    <Link to='/forUser' style={{ textDecoration: 'none' }}>
                      <NavLink>Home</NavLink>
                    </Link>
                    <Link to='/forUser/allmovies' style={{ textDecoration: 'none' }}>
                    <NavLink>Movies List</NavLink>
                  </Link>
                  <Link to='/forUser/booktickets' style={{ textDecoration: 'none' }}>
                      <NavLink>Book Tickets</NavLink>
                  </Link>
                  </>
                  ) : 
                    <><Link to='/' style={{ textDecoration: 'none' }}>
                    <NavLink>Home</NavLink>
                  </Link></>
                  )}
              </li>

            </Nav>
            <Nav>
              <li>
                {token == null ? (
                  <Link to='/login' style={{ textDecoration: 'none' }}>
                    <NavLink>Login</NavLink>
                  </Link>
                ) : (
                  <NavLink onClick={Logout}>Logout</NavLink>
                )}
              </li>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  )
}
