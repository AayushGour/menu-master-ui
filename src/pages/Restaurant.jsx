import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./Restaurant.css";
import { Exportvalues } from "../context/Context";
import { Button, TextField } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import TouchAppIcon from "@mui/icons-material/TouchApp";
import FileUploadIcon from "@mui/icons-material/FileUpload";

function Restaurant() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const Brandid = state?.brandid ?? 0;
  console.log(state?.brandid, "location state");
  const { Brand, setBrand } = useContext(Exportvalues);
  const { Rests, setRests } = useContext(Exportvalues);

  const [Types, setTypes] = useState([]);
  const [AddFlag, setAddFlag] = useState(false);
  const [UpdateId, setUpdateId] = useState(null);
  const [UpName, setUpName] = useState();
  const [Name, setName] = useState();
  const [action, setaction] = useState(false);
  const storedUserID = localStorage.getItem("userID");

  const [Img, setImg] = useState();

  console.log(Brandid, "rest brand");
  useEffect(() => {
    axios
      .post(`https://mm-dev-app-5e72r.ondigitalocean.app/routes/rest`, {
        userid: storedUserID,
        action: "read",
        brandid: Brandid,
      })
      .then((res) => {
        // if (res?.data?.status1) {
        //   console.log("Rest list", res.data.data);
        //   setRests(res.data.data);
        // }
        setTypes(res?.data);
      });
  }, [action]);
  console.log(Types);
  const UpdateRest = (item) => {
    setUpdateId(item?.restid);
    setUpName(item?.rest);
    setImg(item?.RImage);
  };

  const UpdateRestName = () => {
    axios
      .post(`https://mm-dev-app-5e72r.ondigitalocean.app/routes/rest`, {
        action: "update",
        rest: UpName,
        RImage: Img,
        restid: UpdateId,
      })
      .then((res) => {
        console.log(res.data);
        setaction(!action);
        setUpdateId(null);
      });
  };

  const AddRest = () => {
    setAddFlag(true);
  };

  const submitRest = () => {
    axios
      .post(`https://mm-dev-app-5e72r.ondigitalocean.app/routes/rest`, {
        rest: Name,
        userid: storedUserID,
        brandid: Brandid,
        RImage: "null",
        notes: "null",
        plan_id: 1,
        favourite: 0,
        status1: 1,
        rank1: 1,
        cUser: storedUserID,
        action: "create",
      })
      .then((res) => {
        console.log(res.data.status);
        setAddFlag(false);
        setaction(!action);
      });
  };
  const RestSelector = (item) => {
    setRests(item);
    navigate("menuType");
    // console.log(item);
  };
  const deleteRest = (item) => {
    console.log(item);
    axios
      .post(`https://mm-dev-app-5e72r.ondigitalocean.app/routes/rest`, {
        action: "delete",
        restid: item?.restid,
      })
      .then((res) => {
        console.log(res.data);
        setaction(!action);
      });
  };

  return (
    <div className="rest">
      {/* <p>welcome to Menu</p> */}
      {AddFlag == false ? (
        <div style={{ marginTop: 10 }}>
          <Button
            onClick={AddRest}
            variant="contained"
            startIcon={<AddCircleIcon />}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span style={{ marginTop: "0.2rem" }}>Add Restaurant</span>
          </Button>
        </div>
      ) : (
        <div></div>
      )}
      {AddFlag == false ? (
        Types.map((item, index) => {
          // console.log(item);
          return (
            <div style={{ marginTop: 20 }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",

                  gap: "1rem",
                }}
              >
                {UpdateId !== item?.restid && (
                  <div>
                    {item.RImage !== "null" ? (
                      <img
                        src={item.RImage}
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
                          state: { page: "rest", data: item },
                        });
                      }}
                    ></FileUploadIcon>
                  </div>
                )}
                {UpdateId == item?.restid ? (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "1rem",
                    }}
                  >
                    <div className="wrap4">
                      <div>
                        <TextField
                          defaultValue={UpName}
                          onChange={(event) => {
                            setUpName(event.target.value);
                          }}
                          label="Restaurant Name"
                          variant="outlined"
                        />
                      </div>
                    </div>
                    <Button
                      onClick={() => {
                        setUpdateId(null);
                      }}
                      variant="contained"
                      color="error"
                      size="small"
                    >
                      cancel
                    </Button>

                    <Button
                      onClick={UpdateRestName}
                      variant="contained"
                      color="warning"
                      size="small"
                    >
                      Done
                    </Button>
                  </div>
                ) : (
                  <div className="wrap2">
                    <div style={{ marginLeft: 10 }}>
                      <p
                        style={{
                          marginBottom: 10,
                          fontSize: "25px",
                          fontWeight: 600,
                        }}
                      >
                        Restaurant Name: {item?.rest}
                      </p>
                    </div>
                  </div>
                )}
                {UpdateId !== item?.restid && (
                  <Button
                    onClick={() => {
                      deleteRest(item);
                    }}
                    variant="contained"
                    color="error"
                    size="small"
                    startIcon={<DeleteIcon />}
                  >
                    Delete
                  </Button>
                )}

                {UpdateId !== item?.restid && (
                  <Button
                    style={{ marginLeft: 10 }}
                    variant="contained"
                    size="small"
                    color="warning"
                    startIcon={<EditIcon />}
                    onClick={() => {
                      UpdateRest(item);
                    }}
                  >
                    edit
                  </Button>
                )}
                {UpdateId !== item?.restid && (
                  <Button
                    variant="contained"
                    size="small"
                    color="success"
                    startIcon={<TouchAppIcon />}
                    style={{ marginLeft: 10 }}
                    onClick={() => {
                      navigate("/menutype", { state: item, replace: true });
                    }}
                  >
                    <span onClick={() => RestSelector(item)}>select</span>
                  </Button>
                )}
              </div>
              <hr />
            </div>
          );
        })
      ) : (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "1rem",
          }}
        >
          <div className="wrap3">
            <p>Add new Restaurant</p>
            <div style={{ marginTop: 10 }}>
              <TextField
                name="postContent"
                rows={2}
                cols={40}
                onChange={(event) => {
                  setName(event.target.value);
                }}
                label="Restaurant Name"
                variant="outlined"
              />
            </div>
          </div>
          <div
            style={{
              display: "flex",

              alignItems: "center",
              justifyContent: "center",
              gap: "1rem",
            }}
          >
            <Button
              type="submit"
              onClick={submitRest}
              variant="contained"
              size="small"
              color="success"
            >
              Submit
            </Button>
            <Button
              type="submit"
              onClick={() => {
                setAddFlag(false);
              }}
              style={{ marginLeft: 20 }}
              variant="contained"
              size="small"
              color="error"
            >
              cancel
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Restaurant;
