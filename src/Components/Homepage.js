import React from 'react'
import NavbarComp from './Navbar/NavbarComp'
import styled from 'styled-components/macro'
import './MainCSS.css';

const Container = styled.section`
  height: 90vh;
  /* width: 100vw; */
  display: flex;
  justify-content: center;
  img {
    width: 90%;
    /* height: 100%; */
  }

  @media (max-width: 500px) {
    align-items: center;
    img {
      width: 100%;
      height: 50%;
    }
  }
`

const Footer = styled.footer`
  background-color: #212529;
  height: 3.6vh;
`

export default function Homepage() {
  return (
    <section>
      <NavbarComp />
      <Container>
          {/* <img src='movie.png' alt='logo'/> */}
          <div className="container-fluid">
          <header>
            <h1 >Welcome to the Movie App!</h1>
          </header>
          <section>
            <p>OH YES, the past can hurt. But you can either run from it, or learn from it.</p>
            <p> - Rafiki, from The Lion King</p>
          </section>
        </div>
      </Container>
      <Footer>
       <p>&copy; {new Date().getFullYear()} Movie App!</p>
      </Footer>
    </section>
  )
}
