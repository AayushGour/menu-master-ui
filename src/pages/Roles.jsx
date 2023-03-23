import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Roles.css";
function Roles() {
  const [roll, setRoll] = useState([]);
  useEffect(() => {
    // const queryParams = new URLSearchParams(window.location.search);
    // const id = queryParams.get("id");
    // console.log(id);
    axios
      .post(`https://www.thequana.com/apimobile/mmowner`, {
        xversion: "hRs6",
        xuserid: 21,
        xaction: "arr_baseline",
        xtype: "Role",
        Status: 1,
      })
      .then((Response) => {
        console.log("Response from server for plans", Response.data);
        // console.log("Response from server for plans", Response.data.status);

        if (Response?.data?.status) {
          setRoll(Response?.data?.data);
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
  return (
    <div>
      <p>welcome to Roles</p>
      {roll.map((item, index) => {
        // console.log(item);
        return (
          <div
            className="wrap1"
            // style={{
            //   width: 80,
            //   height: 50,
            //   backgroundColor: "yellow",
            //   display: "flex",
            //   flex: 1,
            //   flexWrap: "wrap",
            //   flexDirection: "column",
            //   marginTop: 50,
            // }}
          >
            <p>{item?.Role}</p>
          </div>
        );
      })}
    </div>
  );
}

export default Roles;
