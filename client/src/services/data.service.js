import axios from "axios";
import { config } from '../utils/config'

export const getAll = async (model, search = '') => {
    try {
        let url = search === '' ? `${config.apiUrl}/${model}` : `${config.apiUrl}/${model}/search/${search}`;
        const token =`Bearer ${localStorage.getItem('token')}`;
        return await axios.get(
            url,
            {
                headers: {
                    Authorization: token
                }
            }
        );
    } catch (error) {
        console.log('Error en servicio => ', error);
        return error.response
    }
}

export const getAllFiltered = async (model, filter = {}) => {
    try {
        let url = `${config.apiUrl}/${model}/filter`;
        const token =`Bearer ${localStorage.getItem('token')}`;
        return await axios.post(
            url,
            filter,
            {
                headers: {
                    Authorization: token
                }
            }
        );
    } catch (error) {
        console.log('Error en servicio => ', error);
        return error.response
    }
}

export const getModelByDni = async (model, dni) => {
    try {
        const token =`Bearer ${localStorage.getItem('token')}`;
        return await axios.get(
            `${config.apiUrl}/${model}/${dni}`,
            {
                headers: {
                    Authorization: token
                }
            }
        );
    } catch (error) {
        console.log('Error en servicio => ', error);
        return error.response
    }
}

export const getModelById = async (model, id) => {
    try {
        const token =`Bearer ${localStorage.getItem('token')}`;
        return await axios.get(
            `${config.apiUrl}/${model}/${id}`,
            {
                headers: {
                    Authorization: token
                }
            }
        );
    } catch (error) {
        console.log('Error en servicio => ', error);
        return error.response
    }
}

export const getModel = async (url) => {
    try {
        const token =`Bearer ${localStorage.getItem('token')}`;
        return await axios.get(
            `${config.apiUrl}/${url}`,
            {
                headers: {
                    Authorization: token
                }
            }
        );
    } catch (error) {
        console.log('Error en servicio => ', error);
        return error.response
    }
}

export const createModel = async (model, data) => {
    try {
        const token =`Bearer ${localStorage.getItem('token')}`;
        return await axios.post(
            `${config.apiUrl}/${model}`,
            data,
            {
                headers: {
                    'Content-Type':'multipart/form-data',
                    'Authorization': token
                }
            }
        );
    } catch (error) {
        console.log('Error en servicio => ', error);
        return error.response
    }
}

export const updateModel = async (model, data, id = null) => {
    try {
        const modelId = id ? id : data._id;
        const token =`Bearer ${localStorage.getItem('token')}`;
        const url = `${config.apiUrl}/${model}/${modelId}`;
        return await axios.patch(
            url,
            data,
            {
                headers: {
                    'Content-Type':'multipart/form-data',
                    'Authorization': token
                },
                
            }
        );
    } catch (error) {
        console.log('Error en servicio => ', error);
        return error.response
    }
}

export const deleteModel = async (model, id) => {
    try {
        const token =`Bearer ${localStorage.getItem('token')}`;
        return await axios.delete(
            `${config.apiUrl}/${model}/${id}`,
            {
                headers: {
                    Authorization: token
                },
                
            }
        );
    } catch (error) {
        console.log('Error en servicio => ', error);
        return error.response
    }
}


export const fileUpload = async (model, file) => {
    try {
        const fd = new FormData();
        fd.append('image', file)
        const token =`Bearer ${localStorage.getItem('token')}`;
        return await axios.post(
            `${config.apiUrl}/${model}/upload`,
            fd,
            {
                headers: {
                    'Authorization': token
                }
            }
        );
    } catch (error) {
        console.log('Error en servicio => ', error);
        return error.response
    }
}

export const fileDelete = async (model, files) => {
    try {
        const token =`Bearer ${localStorage.getItem('token')}`;

        return await axios.post(
            `${config.apiUrl}/${model}/file-delete`,
            files,
            {
                headers: {
                    'Authorization': token
                }
            }
        );
    } catch (error) {
        console.log('Error en servicio => ', error);
        return error.response
    }
}


