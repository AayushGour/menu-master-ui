import axios from "axios";
import { baseUrl, brandRoute, menuRoute, menuTypeRoute, restaurantRoute } from "../../../utility/api-urls";
import { apiActions } from "../../../utility/constants";

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

