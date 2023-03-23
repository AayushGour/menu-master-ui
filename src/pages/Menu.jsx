import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import "./Menu.css";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Exportvalues } from "../context/Context";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import Vegs from "../assets/vegs.png";
import nonVeg from "../assets/non-veg.png";
import { TextField } from "@mui/material";

function Menu() {
  const navigate = useNavigate();
  const location = useLocation();
  const Brandid = location.state.brandid;
  const restId = location.state.restid;
  const mtId = location.state.mtid;
  const catId = location.state.catid;
  console.log("Restaurant and type", location.state);
  const [DispMenu, setDispMenu] = useState([]);
  const [AddFlag, setAddFlag] = useState(false);
  const [UpdateId, setUpdateId] = useState(null);
  const [action, setaction] = useState(false);
  const [Name, setName] = useState("");
  const [Desc, setDesc] = useState("");
  const [Price, setPrice] = useState();
  const [Spice, setSpice] = useState();
  const [Ingred, setIngred] = useState("");
  const [UpAddVeg, setUpAddVeg] = useState(null);

  const [UpName, setUpName] = useState("");
  const [UpDesc, setUpDesc] = useState("");
  const [UpPrice, setUpPrice] = useState();
  const [UpSpice, setUpSpice] = useState();
  const [UpIngred, setUpIngred] = useState("");
  const [AddVeg, setAddVeg] = useState(1);
  const { Rests, setRests } = useContext(Exportvalues);
  const { Brand, setBrand } = useContext(Exportvalues);
  const { MenuType, setMenuType } = useContext(Exportvalues);
  const storedUserID = localStorage.getItem("userID");
  const { Cat, setCat } = useContext(Exportvalues);

  const [Img, setImg] = useState();
  useEffect(() => {
    axios
      .post(`https://mm-dev-app-5e72r.ondigitalocean.app/routes/menu`, {
        userid: storedUserID,
        restid: restId,
        brandid: Brandid,
        mtid: mtId,
        catid: 1,

        action: "read",
      })
      .then((Response) => {
        // console.log("Response from server for MENU", Response.data.data);
        // if (Response?.data?.status) {
        //   setDispMenu(Response?.data?.data);
        // }
        console.log(Response, "ress");
        setDispMenu(Response?.data);
      });
  }, [action]);
  // console.log(MenuType.mtid);
  console.log(DispMenu, "Dispmenuuuu");
  const AddMenu = () => {
    setAddFlag(true);
  };
  const UpdateMenu = (item) => {
    setUpdateId(item?.menuid);
    setUpName(item?.menu);
    setUpDesc(item?.description);
    setUpPrice(item?.price);
    setUpSpice(item?.spice);
    setUpIngred(item?.ingredients);
    setUpAddVeg(item?.veg);
    setImg(item?.MImage);
  };
  const selectMenu = (item) => {
    console.log(item);
    setCat(item);
    setMenuType(item);
    setRests(item);
  };
  const submitMenu = () => {
    axios
      .post(`https://mm-dev-app-5e72r.ondigitalocean.app/routes/menu`, {
        menu: Name,
        mtid: mtId,
        brandid: Brandid,
        restid: restId,
        catid: 1,
        userid: storedUserID,
        notes: "blah",
        MImage: "null",
        veg: AddVeg,
        spice: Spice,
        price: 100,
        description: Desc,
        ingredients: Ingred,
        favourite: 1,
        status1: 1,
        rank1: 1,
        cUser: storedUserID,
        action: "create",
      })
      .then((res) => {
        console.log(res.data.status);
        setaction(!action);
        setAddFlag(false);
      });
  };

  const deleteMenu = (item) => {
    console.log(item);
    axios
      .post(`https://mm-dev-app-5e72r.ondigitalocean.app/routes/menu`, {
        menuid: item.menuid,
        action: "delete",
      })
      .then((res) => {
        console.log(res.data);
        setaction(!action);
      });
  };
  const handleChange = (event) => {
    setAddVeg(event.target.value);
  };

  const UpdateItem = () => {
    axios
      .post(`https://mm-dev-app-5e72r.ondigitalocean.app/routes/menu`, {
        menu: UpName,
        MImage: Img,
        spice: UpSpice,
        price: UpPrice,
        veg: 1,
        description: UpDesc,
        ingredients: UpIngred,
        menuid: UpdateId,
        action: "update",
        // TypeId: location.state.Id,
      })
      .then((res) => {
        console.log(res.data);
        setUpdateId(null);
        setaction(!action);
      });
  };

  return (
    <div className="submenu">
      <div className="menu">
        {AddFlag == false ? (
          <div style={{ marginTop: 10 }}>
            <button onClick={AddMenu}>Add Menu</button>
          </div>
        ) : (
          <div></div>
        )}
        {DispMenu.length > 0 && (
          <button
            style={{ marginLeft: 10 }}
            onClick={() => {
              navigate("/publish", { state: restId, replace: true });
            }}
          >
            <span onClick={(item) => selectMenu(item)}>generate Qr</span>
          </button>
        )}

        {AddFlag == false ? (
          DispMenu.map((item, index) => {
            // console.log(item);
            return (
              <div style={{ marginTop: 20 }}>
                {console.log(item)}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    border: "1px solid black",

                    gap: "1rem",
                  }}
                >
                  <div style={{ marginRight: "auto" }}>
                    {item.MImage !== null ? (
                      <img
                        src={item.MImage}
                        style={{
                          width: 100,
                          height: 100,
                          marginLeft: 10,
                          borderRadius: 5,
                        }}
                      />
                    ) : (
                      <img
                        src="https://img.favpng.com/23/20/7/computer-icons-information-png-favpng-g8DtjAPPNhyaU9EdjHQJRnV97_t.jpg"
                        style={{ width: 100, height: 100, marginLeft: 10 }}
                      />
                    )}

                    <FileUploadIcon
                      onClick={() => {
                        navigate("/upload", {
                          state: { page: "menu", data: item },
                        });
                      }}
                    ></FileUploadIcon>
                    <hr
                      style={{
                        display: "inline-block",
                        height: "100px",
                        border: "none",
                        borderLeft: "1px solid black",
                        margin: 0,
                        padding: 0,
                      }}
                    />
                  </div>

                  <div className="wrap20">
                    <div className="menuItems">
                      {/* <p style={{ marginBottom: -10 }}>Name: {item?.menu}</p>
                      <p style={{ marginBottom: -10 }}>
                        SpiceId: {item?.spice}
                      </p>
                      <p style={{ marginBottom: -10 }}>Price: {item?.price}</p>
                      <p style={{ marginBottom: -10 }}>
                        Description: {item?.description}
                      </p>
                      <p>Ingredients: {item?.ingredients}</p>
                      <p>VegId:{item?.veg}</p> */}

                      <img
                        style={{
                          width: 25,
                          height: 25,
                          marginTop: 2,
                          marginRight: "1rem",
                        }}
                        src={item?.veg === 1 ? Vegs : nonVeg}
                        alt="veg"
                      />
                      <span
                        style={{
                          marginRight: "auto",
                          fontSize: "30px",
                          fontWeight: 700,
                        }}
                      >
                        {item.menu}
                      </span>
                      <span style={{ fontSize: "24px", fontWeight: 300 }}>
                        {item.price} /-
                      </span>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        marginRight: "11rem",
                      }}
                    >
                      <span>
                        <i>{item.description}</i>
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      deleteMenu(item);
                    }}
                  >
                    Delete
                  </button>

                  <button
                    style={{ marginLeft: 10 }}
                    onClick={() => {
                      UpdateMenu(item);
                    }}
                  >
                    edit
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          <div>
            <div className="wrap30" style={{ flex: 1 }}>
              <p>Add new menu</p>

              <textarea
                name="postContent"
                rows={2}
                cols={40}
                placeholder="Name"
                onChange={(event) => {
                  setName(event.target.value);
                }}
              />

              <textarea
                name="postContent"
                rows={4}
                cols={40}
                placeholder="Description"
                onChange={(event) => {
                  setDesc(event.target.value);
                }}
              />
              <textarea
                name="postContent"
                rows={2}
                cols={40}
                placeholder="Price"
                onChange={(event) => {
                  setPrice(event.target.value);
                }}
              />
              <textarea
                name="postContent"
                rows={2}
                cols={40}
                placeholder="Spice"
                onChange={(event) => {
                  setSpice(event.target.value);
                }}
              />
              <textarea
                name="postContent"
                rows={4}
                cols={40}
                placeholder="Ingredients"
                onChange={(event) => {
                  setIngred(event.target.value);
                }}
              />
              <select value={AddVeg} onChange={handleChange}>
                <option value={1}>Veg</option>
                <option value={2}>Non-Veg</option>
              </select>
            </div>

            <button type="submit" onClick={submitMenu}>
              Submit
            </button>
            <button
              type="submit"
              onClick={() => {
                setAddFlag(false);
              }}
              style={{ marginLeft: 20 }}
            >
              cancel
            </button>
          </div>
        )}
      </div>
      <div className="editwin">
        {DispMenu.map((item, index) => {
          return (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-start",
              }}
            >
              {UpdateId == item?.menuid && (
                <div style={{}}>
                  <div className="wrap40">
                    <TextField
                      defaultValue={UpName}
                      onChange={(event) => {
                        setUpName(event.target.value);
                      }}
                      label="Menu Name"
                      variant="outlined"
                    />
                    <TextField
                      defaultValue={UpSpice}
                      onChange={(event) => {
                        setUpSpice(event.target.value);
                      }}
                      label="Spice"
                      variant="outlined"
                    />
                    <TextField
                      defaultValue={UpPrice}
                      onChange={(event) => {
                        setUpPrice(event.target.value);
                      }}
                      label="Spice"
                      variant="outlined"
                    />
                    <TextField
                      defaultValue={UpDesc}
                      onChange={(event) => {
                        setUpDesc(event.target.value);
                      }}
                      label="Spice"
                      variant="outlined"
                    />
                    <TextField
                      defaultValue={UpIngred}
                      onChange={(event) => {
                        setUpIngred(event.target.value);
                      }}
                      label="Spice"
                      variant="outlined"
                    />{" "}
                    <select
                      value={UpAddVeg}
                      onChange={(event) => {
                        setUpAddVeg(event.target.value);
                      }}
                    >
                      <option value={1}>Veg</option>
                      <option value={2}>Non-Veg</option>
                    </select>
                  </div>
                  <button
                    style={{ marginLeft: 200 }}
                    onClick={() => {
                      setUpdateId(null);
                    }}
                  >
                    cancel
                  </button>

                  <button onClick={UpdateItem} style={{ marginLeft: 200 }}>
                    Done
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
export default Menu;
