import React from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import"./Navbar.css"
import {

  
  signOut,
 
} from "firebase/auth";
import { auth } from "../firebase";
import { Button } from "@mui/material";
function Navbar() {
  const user = localStorage.getItem('userID');
  const email = localStorage.getItem("Email");
  const name = localStorage.getItem('Name');
  const photoURL = localStorage.getItem('PhotoUrl');
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem('userID');
      navigate('/owner');
      alert("Successfully logged out");
    } catch (error) {
      console.log(error);
    }
  };
  console.log(handleLogout)
  console.log(user,email,name,photoURL,"user dataaaaa");
  

  return (
    <div className="Navbar">
    <div   style={{
          
         display: "flex",
          marginLeft: "auto",
          alignItems:"center",
          justifyContent:"center",
          gap:"1rem"
         
        }}>
      <img
        src={user&&photoURL? photoURL :"https://cdn-icons-png.flaticon.com/128/3135/3135715.png"}
        style={{
          height: 50,
          width: 50,
          borderRadius: 50,
          marginLeft: 10,
          marginRight: 10,
        }}
      />
      <h3>{user&&name?name:""}</h3>
      <div >
        {/* {user?.email ? (
          <button onClick={handleLogout}>logout</button>
        ) : (
          <Link to="/signin">SignIn</Link>
        )} */}
        {user&& <Button  onClick={handleLogout}  variant="contained">Logout</Button>}
      </div>
      </div>
    </div>
  );
}

export default Navbar;
