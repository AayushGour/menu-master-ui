import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

function QR() {
  const storedUserID = localStorage.getItem("userID");
  const location = useLocation();
  console.log(location.state, "location");
  const restId = location.state;
  const [url, setUrl] = useState();
  useEffect(() => {
    const websiteURL = window.location.href;

    axios
      .post("https://mm-dev-app-5e72r.ondigitalocean.app/routes/allmenu", {
        userid: storedUserID,
        restid: restId,

        action: "build",
      })
      .then((Response) => {
        // setDispMenu(Response?.data);
        setUrl(Response?.data?.data?.restaurant[0].url);
        console.log(Response?.data?.data?.restaurant[0].url);
      });
    console.log(websiteURL);
  }, []);
  return (
    <div>
      <p>QR for Restaurent: </p>
      <p>QR for Table: </p>
      <img
        src={`https://chart.googleapis.com/chart?chs=200x200&cht=qr&chl=${url}`}
        style={{ height: 250, width: 250, alignSelf: "center" }}
      />
    </div>
  );
}

export default QR;
