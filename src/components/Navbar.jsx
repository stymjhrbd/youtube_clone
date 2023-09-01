import { Stack } from "@mui/material";
import { Link } from "react-router-dom";
import { GoogleLogin, googleLogout } from '@react-oauth/google';
import { logo } from "../utils/constants";
import { SearchBar } from "./";
import jwt_decode from 'jwt-decode';
import { useState, useEffect } from "react";

const SignIn = ({handleAuthSuccess}) => {
  return(<GoogleLogin
  onSuccess={handleAuthSuccess}
  onError={() => {
    console.log('Login Failed');
  }}
/>)
}

const ProfileObj = ({user, handleLogout}) => {
  const {name, email, picture} = user;
  return(
    <div className="flex gap-2 items-center">
      <img src={picture} alt={name} className="h-10 w-10 rounded-full object-contain"/>
      <h4 className="text-lg text-white font-semibold text-center">{name}</h4>
      <button className="h-10 w-[80px] bg-[#FC1503] rounded-md text-white text-md text-bold" onClick={handleLogout}>Logout</button>
    </div>
  )

}

const Navbar = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = () => {
      setUser(JSON.parse(localStorage.getItem('user')))
    }
    fetchUser();
  }, [])
  
  const handleAuthSuccess = (res) => {
    const userRes = jwt_decode(res.credential);
    const user = {
      name : userRes.name,
      email: userRes.email,
      picture: userRes.picture
    }
    // console.log(userRes)
    localStorage.setItem('user', JSON.stringify(user));
    window.location.reload();
  }

  const handleLogout = () => {
    googleLogout();
    localStorage.removeItem('user');
    window.location.reload();
  }
  return(
  <Stack direction="row" alignItems="center" p={2} sx={{ position:  "sticky", top: 0, justifyContent: "space-between" }} className="bg-black height-[200px]">
    <Link to="/" style={{ display: "flex", alignItems: "center" }}>
      <img src={logo} alt="logo" height={45} width={45}/>
      <h1 className="text-white ml-2 font-semibold text-lg"> Youtube</h1>
    </Link>
    <SearchBar />
    {/* {alert(JSON.parse(localStorage.getItem('user')))} */}
    {user ? <ProfileObj user={user}  handleLogout={handleLogout}/> : <SignIn handleAuthSuccess={handleAuthSuccess}/>}
  </Stack>
)};

export default Navbar;
