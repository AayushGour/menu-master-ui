import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Dashboard.css";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();
  const [plans, setPlans] = useState([]);
  useEffect(() => {
    // const queryParams = new URLSearchParams(window.location.search);
    // const id = queryParams.get("id");
    // console.log(id);
    axios
      .post(`https://www.thequana.com/apimobile/mmowner`, {
        xversion: "hRs6",
        xuserid: 21,
        xaction: "arr_baseline",
        xtype: "Plan",
        Status: 1,
      })
      .then((Response) => {
        console.log("Response from server for plans", Response.data);
        // console.log("Response from server for plans", Response.data.status);

        if (Response?.data?.status) {
          setPlans(Response?.data?.data);
        }
        // console.log(Response.data?.data[0]?.restaurant[0]?.name);
        // console.log(Response.data?.data?.restaurant[0]?.name);
        // setShopName(Response.data?.data?.restaurant[0]?.name);
        // setMenu_type(Response.data?.data?.menu_type);
        // setImgLink(Response.data?.data?.arr_links?.menuitem_image);
        // setSpcLink(Response.data?.data?.arr_links?.menuitem_icons);
        // caller(0);
      });
  }, []);
  // console.log("dashboard", plans);

  return (
    <div>
      <p>welcome to plans dashboard</p>
      <button
        onClick={() => {
          navigate("/brand");
        }}
      >
        skip
      </button>
      {plans.map((item, index) => {
        // console.log(item);
        return (
          <div
            className="wrap"
            // style={{
            //   width: 80,
            //   height: 50,
            //   backgroundColor: "yellow",
            //   display: "flex",
            //   flex: 1,
            //   flexWrap: "wrap",
            //   flexDirection: "column",
            // }}
          >
            <p>{item?.Plan}</p>
          </div>
        );
      })}
    </div>
  );
}

export default Dashboard;
