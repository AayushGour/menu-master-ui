// import React, { useContext, createContext, useEffect, useState } from "react";
// import {
//   GoogleAuthProvider,
//   signInWithPopup,
//   signOut,
//   onAuthStateChanged,
// } from "firebase/auth";
// import { auth } from "../firebase";
// import axios from "axios";
// import { exportvalues } from "./ContextTab";

// const Context = createContext();

// export const ContextProvider = ({ children }) => {
//   const [user, setuser] = useState({});
//   const [Mobile, setMobile] = useState();
 

//   const googleSignIn = () => {
//     const provider = new GoogleAuthProvider();
//     signInWithPopup(auth, provider);
//   };

//   const logout = () => {
//     signOut(auth);
//   };

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
//       setuser(currentUser);
//       console.log("User", currentUser?.email);
     
//     });
//     return () => {
//       unsubscribe();
//     };
//   }, []);

//   return (
//     <Context.Provider value={{ googleSignIn, logout, user, Mobile, setMobile }}>
//       {children}
//     </Context.Provider>
//   );
// };

// export const ContextInfo = () => {
//   return useContext(Context);
// };

import React, {createContext, useState} from 'react';

export const Exportvalues = createContext();

const ContextProvider  = ({children}) => {
  const [userID, setUserID] = useState(null);
  const [Search, setSearch] = useState(null);
  const [Email, setEmail] = useState('');
  const [Name, setName] = useState('');
  const [PhotoUrl, setPhotoUrl] = useState('');
  const [Brands, setBrands] = useState([]);
  const [Rests, setRests] = useState([]);
  const [Brand, setBrand] = useState([]);
  const [Rest, setRest] = useState([]);
  const [MenuType, setMenuType] = useState();
  const [Cat, setCat] = useState();
  const [action, setaction] = useState(false);

  return (
    <Exportvalues.Provider
      value={{
        userID,
        setUserID,
        Search,
        setSearch,
        Email,
        setEmail,
        Name,
        setName,
        PhotoUrl,
        setPhotoUrl,
        Brands,
        setBrands,
        Rests,
        setRests,
        Brand,
        setBrand,
        Rest,
        setRest,
        MenuType,
        setMenuType,
        Cat,
        setCat,
        action,
        setaction,
      }}>
      {children}
    </Exportvalues.Provider>
  );
};

export default ContextProvider ;