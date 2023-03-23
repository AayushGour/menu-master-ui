import React, { useContext, useState } from "react";
import { storage } from "../firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

import FileUploadIcon from "@mui/icons-material/FileUpload";
import axios from "axios";
import { Exportvalues } from "../context/Context";
import { useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
const Upload = () => {
  const [imageUrl, setImageUrl] = useState(null);

  // console.log(route.params.page,route.params.data,route)
  // let page = route.params.page;
  // let data = route.params.data;
  const { state } = useLocation();
  let page = state?.page;
  console.log(page, "page");

  //console.log(page)
  let data = state?.data;
  // console.log(data)

  const { action, setaction } = useContext(Exportvalues);

  const storedUserID = localStorage.getItem("userID");

  const handleImageUpload = async () => {
    var Cid = "Image" + Date.now();

    //   const storageRef =  storage.ref().child(`/uploads/${Cid}`);
    //   console.log(storageRef)

    //   try {
    //     await storageRef.put(file);

    //     fetchuploader(Cid,page);

    //   } catch (error) {
    //     console.error(error);
    //   }

    const imageRef = ref(storage, `images/${Cid}`);
    const snapshot = await uploadBytes(imageRef, imageUrl);
    alert("Image Uploaded Successfully");
    const path = await getDownloadURL(snapshot.ref);

    console.log(path);

    fetchuploader(page, path);
  };

  const fetchuploader = (page, path) => {
    // const path = await storage().ref(`/uploads/${Cid}`).getDownloadURL();
    // console.log('Image url is', path);
    // setImageUrl(path);

    console.log(page, "pageeeeeeeeeeeeeeeeee");
    console.log(path, "patheeeeeeeeeeeeeeeee");

    //UploadPathToQuana(path);
    console.log(imageUrl, "imgae url");
    switch (page) {
      case "brand":
        console.log("brand hit");
        UpdateImgBrand(path);
        break;
      case "rest":
        console.log("rest hit");
        UpdateImgRest(path);
        break;
      case "MT":
        console.log("MT hit");
        UpdateImgMT(path);
        break;
      case "cat":
        console.log("cat hit");
        UpdateImgCat(path);
        break;
      case "menu":
        console.log("menu hit");
        UpdateImgMenu(path);
        break;
      default:
        console.log("Invalid image edit request");
    }
  };

  const UpdateImgBrand = (path) => {
    axios
      .post("https://mm-dev-app-5e72r.ondigitalocean.app/routes/brand", {
        userid: storedUserID,
        action: "update",
        brand: data.brand,
        BImage: path,
        brandid: data.brandid,
      })
      .then((res) => {
        console.log(res.data);
        alert("Image upload complete");
        setaction(!action);
      });
  };

  const UpdateImgRest = (path) => {
    axios
      .post("https://mm-dev-app-5e72r.ondigitalocean.app/routes/rest", {
        action: "update",
        rest: data.rest,
        RImage: path,
        restid: data.restid,
      })
      .then((res) => {
        console.log(res.data);
        alert("Image upload complete");
        setaction(!action);
      });
  };

  const UpdateImgMT = (path) => {
    axios
      .post("https://mm-dev-app-5e72r.ondigitalocean.app/routes/menutype", {
        menutype: data.menutype,
        MTImage: path,
        mtid: data.mtid,
        action: "update",
      })
      .then((res) => {
        console.log(res.data);
        alert("Image upload complete");
        setaction(!action);
      });
  };

  const UpdateImgCat = (path) => {
    axios
      .post("https://mm-dev-app-5e72r.ondigitalocean.app/routes/cat", {
        cat: data.cat,
        CImage: path,
        catid: data.catid,
        action: "update",
      })
      .then((res) => {
        console.log(res.data);
        alert("Image upload complete");
        setaction(!action);
      });
  };

  const UpdateImgMenu = (path) => {
    axios
      .post("https://mm-dev-app-5e72r.ondigitalocean.app/routes/menu", {
        menu: data.menu,
        MImage: path,
        spice: data.spice,
        price: data.price,
        veg: data.veg,
        description: data.description,
        ingredients: data.ingredients,
        menuid: data.menuid,
        action: "update",
      })
      .then((res) => {
        console.log(res.data);
        alert("Image upload complete");
        setaction(!action);
      });
  };
  return (
    <div>
      <input
        type="file"
        onChange={(event) => {
          setImageUrl(event.target.files[0]);
        }}
      />
      <button onClick={handleImageUpload}>Upload Image</button>
      {/* <FileUploadIcon
      onClick={handleImageUpload}
      style={{
          height: 30,
          width: 100,
          backgroundColor: 'yellow',
          alignSelf: 'center',
          borderRadius: 20,
          justifyContent: 'center',
          marginTop: 30,
        }}
      
      
      
      >



      </FileUploadIcon> */}

      {imageUrl !== null ? (
        <img
          src={{}}
          style={{
            height: 100,
            width: 100,
            alignSelf: "center",
            marginTop: 50,
          }}
        />
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default Upload;
