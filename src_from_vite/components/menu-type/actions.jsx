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

export const createCategory = async (params) => {
    const config = {
        url: baseUrl + categoryRoute,
        method: 'post',
        data: {
            ...params,
            userid: localStorage.getItem('userID'),
            action: apiActions.CREATE,
        }
    }
    return axios(config);
}

export const updateCategory = async (params) => {
    const config = {
        url: baseUrl + categoryRoute,
        method: 'post',
        data: {
            ...params,
            // userid: localStorage.getItem('userID'),
            action: apiActions.UPDATE,
        }
    }
    return axios(config);
}

export const createMenuItem = async (params) => {
    const config = {
        url: baseUrl + menuRoute,
        method: 'post',
        data: {
            ...params,
            userid: localStorage.getItem('userID'),
            action: apiActions.CREATE,
        }
    }
    return axios(config);
}

export const updateMenuItem = async (params) => {
    const config = {
        url: baseUrl + menuRoute,
        method: 'post',
        data: {
            ...params,
            action: apiActions.UPDATE,
        }
    }
    return axios(config);
}

export const updateMenuItemAvailability = async (params) => {
    const config = {
        url: baseUrl + menuRoute,
        method: 'post',
        data: {
            ...params,
            action: apiActions.AVAILABLE,
        }
    }
    return axios(config);
}

export const rearrangeMenuItem = async (params) => {
    const config = {
        url: baseUrl + menuRoute,
        method: 'post',
        data: {
            ...params,
            action: apiActions.RANK,
        }
    }
    return axios(config);
}

export const deleteMenuItem = async (params) => {
    const config = {
        url: baseUrl + menuRoute,
        method: 'post',
        data: {
            ...params,
            action: apiActions.DELETE,
        }
    }
    return axios(config);
}

