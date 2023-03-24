import axios from "axios";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { baseUrl, brandRoute, menuRoute, menuTypeRoute, restaurantRoute } from "../../../utility/api-urls";
import { apiActions } from "../../../utility/constants";
import { storage } from "../auth/firebase";

export const getBrandList = async () => {
    const config = {
        url: baseUrl + brandRoute,
        method: 'post',
        data: {
            userid: localStorage.getItem('userID'),
            action: apiActions.READ
        }
    }
    return axios(config);
}

export const createBrand = async (brandDetails) => {
    const config = {
        url: baseUrl + brandRoute,
        method: 'post',
        data: {
            userid: localStorage.getItem('userID'),
            cUser: localStorage.getItem('userID'),
            action: apiActions.CREATE,
            rank1: 1,
            status1: 0,
            BImage: null,
            ...brandDetails,
        }
    }
    return axios(config);
};

export const getRestaurantsList = async (brandId) => {
    const config = {
        url: baseUrl + restaurantRoute,
        method: 'post',
        data: {
            userid: localStorage.getItem('userID'),
            action: apiActions.READ,
            brandid: brandId
        }
    }
    return axios(config);
}

export const getMenuTypeDetails = async (params) => {
    const config = {
        url: baseUrl + menuTypeRoute,
        method: 'post',
        data: {
            userid: localStorage.getItem('userID'),
            action: apiActions.READ,
            ...params
        }
    }
    return axios(config);
}


export const createMenuTypeDetails = async (params) => {
    const config = {
        url: baseUrl + menuTypeRoute,
        method: 'post',
        data: {
            userid: localStorage.getItem('userID'),
            action: apiActions.CREATE,
            ...params
        }
    }
    return axios(config);
}

export const updateMenuTypeDetails = async (params) => {
    const config = {
        url: baseUrl + menuTypeRoute,
        method: 'post',
        data: {
            // userid: localStorage.getItem('userID'),
            action: apiActions.UPDATE,
            ...params
        }
    }
    return axios(config);
}

export const handleFileUpload = async (imageUrl) => {
    var Cid = "Image" + Date.now();

    const imageRef = ref(storage, `images/${Cid}`);
    const snapshot = await uploadBytes(imageRef, imageUrl);

    const path = await getDownloadURL(snapshot.ref);

    return path
}