import axios from "axios";
import { config } from '../utils/config'

export const getLogin = async (dni, password) => {
    try {
        return await axios.post(
            `${config.apiUrl}/auth/login`,
            {
                dni, password
            }
        );
    } catch (error) {
        console.log('Error en servicio => ', error);
        return error.response
    }
}