import React, { useContext, useEffect, useState } from "react";
import logo from "../../../../public/logo.png"
import {
  Navbar,
  MobileNav,
  Typography,
  IconButton,
  Button
} from "@material-tailwind/react";
import { Link, NavLink, useNavigate } from "react-router-dom";


import toast from 'react-hot-toast';
import { Tooltip } from "react-tooltip";
import { AuthContext } from "../../../Providers/AuthProvider";


const Header = () => {
  const [openNav, setOpenNav] = React.useState(false);
  const { user, logOut } = useContext(AuthContext);
  const navigate = useNavigate();
  const [theme, setTheme] = useState('light')

  useEffect(() => {
    localStorage.setItem('theme', theme)
    const localTheme = localStorage.getItem('theme')
    document.querySelector('html').setAttribute('data-theme', localTheme)
  }, [theme])

  const handleToggle = e => {
    // console.log(e.target.value)
    if (e.target.checked) {
      setTheme('dark')
    }
    else {
      setTheme('light')
    }
  }


  const handleSignOut = () => {
    logOut()
      .then(() => {
        toast.success('log out successfully')
        navigate('/login')
      })
      .catch()
  }


  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false),
    );
  }, []);

  const navList = (
    <ul className="mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      <Typography
        as="li"
        variant="large"
        color="blue-gray"
        className={`p-1 text-sm`}
      >
        <NavLink
          style={({ isActive, isTransitioning }) => {
            return {
              fontWeight: isActive ? "bold" : "",
              color: isActive ? "red" : "black",
              viewTransitionName: isTransitioning ? "slide" : "",
            };
          }}
          to="/" className="flex items-center text-[#150B2BB3]">
          Home
        </NavLink>
      </Typography>

      <Typography
        as="li"
        variant="large"
        color="blue-gray"
        className={`p-1 text-sm`}
      >
        <NavLink
          style={({ isActive, isTransitioning }) => {
            return {
              fontWeight: isActive ? "bold" : "",
              color: isActive ? "red" : "black",
              viewTransitionName: isTransitioning ? "slide" : "",
            };
          }}
          to="/allProduct" className="flex items-center text-[#150B2BB3]">
          All Product
        </NavLink>
      </Typography>


      <Typography
        as="li"
        variant="large"
        color="blue-gray"
        className={`p-1 text-sm lg:hidden`}
      >
        <NavLink
          style={({ isActive, isTransitioning }) => {
            return {
              fontWeight: isActive ? "bold" : "",
              color: isActive ? "red" : "black",
              viewTransitionName: isTransitioning ? "slide" : "",
            };
          }}
          to="/register" className="flex items-center text-[#150B2BB3] ">
          Register
        </NavLink>
      </Typography>

    </ul>
  );

  return (
    <div className="max-h-[768px]  lg:max-w-7xl mx-auto ">
      <Navbar className="sticky top-0 z-10  py-2 lg:px-8 lg:py-5 shadow-none rounded-none
      bg-white-[0px] border-none">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Typography
              as="a"
              className="mr-7 cursor-pointer py-1.5 font-medium"
            >
              <NavLink to="/" className={``}>

                <img src={logo} className="w-[130px] h-[27px] rounded-full" />

              </NavLink>
            </Typography>
          </div>

          <div className="flex items-center gap-4">
            <div className="mr-2 hidden lg:block">{navList}</div>
          </div>

          <div className="flex items-center gap-2">
        
            {
              user ?
                <>
                  <div className="flex items-center space-x-2">
                    <img data-tooltip-id="my-tooltip" data-tooltip-content={user.displayName} src={user.photoURL} alt="" className="w-[60px] h-[60px] object-cover rounded-full" />
                    <Tooltip id="my-tooltip" />
                    <Button onClick={handleSignOut} className={`bg-[#59C6D2]`}>Log out</Button>
                  </div>
             

                </>
                :
                <>
                  <div>
                    <Link to="/login">  <Button className={`bg-[#59C6D2]`}>Log in</Button></Link>
                  </div>
                  <div className="gap-4  hidden lg:block">
                    <Link to="/register">  <Button className={`bg-[#23BE0A]`}>Register</Button></Link>
                  </div>
                </>
            }
            <IconButton
              variant="text"
              className=" h-6 w-6 text-black hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
              ripple={false}
              onClick={() => setOpenNav(!openNav)}
            >
              {openNav ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  className="h-6 w-6"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </IconButton>
            <div>
            </div>
          </div>
        </div>
        <MobileNav open={openNav} className={`flex justify-center`}>{navList}</MobileNav>
      </Navbar>
    </div>
  );
};

export default Header;