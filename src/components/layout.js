import * as React from "react"
import { Link } from "gatsby"
import styled from 'styled-components'

const Layout = ({ title, children }) => {
  const Logo = styled(Link)`
    font-size: 20px;
    font-weight: 900;
    margin: 0;
    padding: 0;
    text-decoration: none;
    color: #000;
  `

  return (
    <section>
      <header className="header">
        <div className="header-wrap">
          <Logo to="/">{title}</Logo>
        </div>
      </header>
      <main className="global-wrap">{children}</main>
      {/* <footer className="global-wrap">
        푸터
      </footer> */}
    </section>
  )
}

export default Layout
