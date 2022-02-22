import React, { useState } from 'react'
import {
  NavbarContainer,
  LeftContainer,
  RightContainer,
  NavbarExtendedContainer,
  NavbarInnerContainer,
  NavbarLinkContainer,
  NavbarLink,
  Logo,
  OpenLinksButton,
  NavbarLinkExtended,
} from '../styles/Navbar.style'
import LogoImg from '../assets/sl.png'

function Navbar() {
  const [extendNavbar, setExtendNavbar] = useState(false)

  const changeExtendNavbar = () => {
    setExtendNavbar(false)
  }
  return (
    <NavbarContainer extendNavbar={extendNavbar}>
      <NavbarInnerContainer>
        <LeftContainer>
          <NavbarLinkContainer>
            <NavbarLink to='/'> Home</NavbarLink>
            <NavbarLink to='/add'> Add</NavbarLink>
            {/* <NavbarLink to="/contact"> Contact Us</NavbarLink>
            <NavbarLink to="/about"> About Us</NavbarLink> */}
            <OpenLinksButton
              onClick={() => {
                setExtendNavbar((curr) => !curr)
              }}
            >
              {extendNavbar ? <>&#10005;</> : <> &#8801;</>}
            </OpenLinksButton>
          </NavbarLinkContainer>
        </LeftContainer>
        <RightContainer>
          <Logo src={LogoImg}></Logo>
        </RightContainer>
      </NavbarInnerContainer>
      {extendNavbar && (
        <NavbarExtendedContainer>
          <NavbarLinkExtended to='/' onClick={changeExtendNavbar}>
            Home
          </NavbarLinkExtended>
          <NavbarLinkExtended to='/add' onClick={changeExtendNavbar}>
            Add
          </NavbarLinkExtended>
          {/* <NavbarLinkExtended to="/contact"> Contact Us</NavbarLinkExtended>
          <NavbarLinkExtended to="/about"> About Us</NavbarLinkExtended> */}
        </NavbarExtendedContainer>
      )}
    </NavbarContainer>
  )
}

export default Navbar

// import { AppBar, Toolbar, makeStyles } from '@material-ui/core'
// import { NavLink } from 'react-router-dom'

// const useStyle = makeStyles({
//   header: {
//     background: '#111111',
//   },
//   tabs: {
//     color: '#FFFFFF',
//     marginRight: 20,
//     textDecoration: 'none',
//     fontSize: 20,
//   },
// })

// const NavBar = () => {
//   const classes = useStyle()
//   return (
//     <AppBar position='static' className={classes.header}>
//       <Toolbar>
//         <NavLink className={classes.tabs} to='/' exact>
//           All Announcements
//         </NavLink>
//         <NavLink className={classes.tabs} to='add' exact>
//           Add Announcement
//         </NavLink>
//       </Toolbar>
//     </AppBar>
//   )
// }

// export default NavBar
