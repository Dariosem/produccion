import axios from "axios";
import { config } from '../utils/config'

export const getUserById = async (id) => {
    try {
        const token =`Bearer ${localStorage.getItem('token')}`;
        return await axios.get(
            `${config.apiUrl}/users/${id}`,
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