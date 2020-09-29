import axios from 'axios';

const apiUrl = "http://reactdasboard-001-site1.dtempurl.com/api/Cliente";

export const post = (cliente) => {
    return axios.post(apiUrl, cliente)
        .then(
            response => {
                return response.data;
            }
        );
}

export const put = (cliente) => {
    return axios.put(apiUrl, cliente)
        .then(
            response => {
                return response.data;
            }
        );
}

export const remove = (id) => {
    return axios.delete(apiUrl + "/" + id)
        .then(
            response => {
                return response.data;
            }
        );
}

export const getAll = () => {
    return axios.get(apiUrl)
        .then(
            response => {
                return response.data;
            }
        );
}

export const getById = (id) => {
    return axios.get(apiUrl + "/" + id)
        .then(
            response => {
                return response.data;
            }
        );
}