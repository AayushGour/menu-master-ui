// import React, { useContext, useEffect } from "react";
// import GoogleButton from "react-google-button";
// import { ContextInfo } from "../context/Context";
// import { useNavigate } from "react-router-dom";
// import "./SignIn.css"

// import axios from "axios";

// function SignIn() {

//   const { googleSignIn ,user} = ContextInfo();

//   const navigate = useNavigate();

//   // const handlegoogleSignIn = async () => {
//   //   await googleSignIn();
//   //   try {
//   //   } catch (error) {
//   //     console.log(error);
//   //   }
//   // };
//   const handlegoogleSignIn = async () => {
//     try {

//       const userCredential = await googleSignIn();
//       const { user } = userCredential;

//       const [postDataResponse] = await Promise.all([
//         axios.post(`https://plankton-app-ovujs.ondigitalocean.app/routes/users`, {
//           action: "createRead",
//           email: user.email,
//         }),
//         // any other async requests that you want to make
//       ]);

//       // handle postDataResponse and any other responses here

//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     if (user?.email !==null) {

//       console.log("user is", user?.email);

//     }
// console.log(user,'userrrrrrrrrrrrr')
//     // if (user.email !== null && user.phoneNumber !== null) {
//     //   console.log("user is", user.phoneNumber);
//     //   console.log("user is", user.email);
//     //   navigate("/account");
//     // }
//   }, []);
//   navigate("/brand");

//   return (
//     <div className="center" >
//       <h1>Sign-in</h1>
//       <div  className="googlebtn">
//         <GoogleButton onClick={handlegoogleSignIn} className="googlebtn"/>
//       </div>
//     </div>
//   );
// }

// export default SignIn;
import {
    GoogleAuthProvider, onAuthStateChanged, signInWithPopup
} from "firebase/auth";
import React, { useContext, useEffect } from "react";
import { Exportvalues } from "../../../utility/Context";
import { auth } from "./firebase";

import { Button, Card, TextField } from "@mui/material";
import axios from "axios";
import GoogleButton from "react-google-button";
import { useNavigate } from "react-router-dom";
import BackgroundImage1 from "../../../assets/img/welcome-background-1.jpg"
import BackgroundImage2 from "../../../assets/img/welcome-background-2.jpg"
import MenuMasterLogo from "../../../assets/img/menu-master-logo.png"
import { routeNames } from "../../../utility/constants";
import "./signin.scss";

const SignIn = () => {
    const { userID, setUserID } = useContext(Exportvalues);
    const { Email, setEmail } = useContext(Exportvalues);

    const { Name, setName } = useContext(Exportvalues);
    const navigate = useNavigate();
    const { PhotoUrl, setPhotoUrl } = useContext(Exportvalues);
    console.log(userID, "iddddddddddddd");
    const storedUserID = localStorage.getItem("userID");

    const handleGoogleSignIn = async () => {
        const provider = new GoogleAuthProvider();
        try {
            await signInWithPopup(auth, provider).then(
                onAuthStateChanged((user) => {
                    if (user) {
                        let email = user.email;
                        axios
                            .post(
                                "https://mm-dev-app-5e72r.ondigitalocean.app/routes/users",
                                {
                                    action: "createRead",
                                    email: email,
                                }
                            )
                            .then((Response) => {
                                console.log(
                                    "Login Data@@@@@@@@@@@@@@@@@@@@@@@@@@",
                                    Response.data[0].userid
                                );

                                setUserID(Response.data[0].userid);
                                alert("Login Successfull");
                            });
                    }
                })
            );
            // Handle successful authentication
        } catch (error) {
            // Handle authentication errors
            console.log(error);
        }
    };
    // navigate('/brand');

    useEffect(() => {
        if (storedUserID) {
            console.log("Storedid", storedUserID);
            navigate(`${routeNames.DASHBOARD}/${routeNames.RESTAURANTS}`, { replace: true });
        } else {
            navigate(routeNames.SIGNIN);
        }
    }, [storedUserID]);

    useEffect(() => {
        const subscribe = onAuthStateChanged(auth, (user) => {
            onAuthStateChanged(auth, (user) => {
                if (user) {
                    let email = user.email;
                    axios
                        .post("https://mm-dev-app-5e72r.ondigitalocean.app/routes/users", {
                            action: "createRead",
                            email: email,
                        })
                        .then((Response) => {
                            console.log(Response?.data[0].userid);
                            setUserID(Response?.data[0].userid);
                            localStorage.setItem("userID", Response.data[0].userid);
                            localStorage.setItem("Email", user?.email);
                            localStorage.setItem("Name", user?.displayName);
                            localStorage.setItem("PhotoUrl", user?.photoURL);

                            console.log(
                                Email,
                                Name,
                                PhotoUrl,
                                "emailllllllll",
                                user?.email,
                                user?.displayName,
                                user?.photoURL
                            );

                            navigate(`${routeNames.DASHBOARD}/${routeNames.RESTAURANTS}`);
                        });
                }
            });
        });
        const storedUserID = localStorage.getItem("userID");
        console.log("storedUserID:", storedUserID);
        if (userID === storedUserID) {
            setUserID(storedUserID);
        }
        return subscribe;
    }, [userID, Email, Name, PhotoUrl]);

    console.log(userID, "userIddd");
    return (
        <div className="signin-container">
            <div className="welcome-carousel-item">
                <img src={BackgroundImage1} alt="carousel-item-1" />
            </div>
            <div className="welcome-carousel-item">
                <img src={BackgroundImage2} alt="carousel-item-2" />
            </div>
            <Card className="mm-card">
                <img className="mm-logo" src={MenuMasterLogo} alt="Menu Master logo" />
                <form className="form">
                    <TextField
                        id="standard-basic"
                        label="Username"
                        variant="outlined"
                        style={{ width: "80%" }}
                    />
                    <TextField
                        id="standard-basic"
                        label="Password"
                        variant="outlined"
                        style={{ width: "80%" }}
                    />
                    <button className="mm-btn mt-3 primary">Login</button>
                    <div className="googlebtn my-4">
                        <GoogleButton onClick={handleGoogleSignIn} className="googlebtn" />
                    </div>
                </form>
            </Card>
        </div>
    );
};

export default SignIn;
