import axios from "axios";
import { baseUrl, categoryRoute, menuRoute } from "../../utility/api-urls";
import { apiActions } from "../../utility/constants";

export const getMenuDetails = async (params) => {
    const config = {
        url: baseUrl + menuRoute,
        method: 'post',
        data: {
            ...params,
            userid: Number(localStorage.getItem('userID')),
            action: apiActions.READ,
        }
    }
    return axios(config);
}

export const getCategoryDetails = async (params) => {
    const config = {
        url: baseUrl + categoryRoute,
        method: 'post',
        data: {
            ...params,
            userid: localStorage.getItem('userID'),
            action: apiActions.READ,
        }
    }
    return axios(config);
}