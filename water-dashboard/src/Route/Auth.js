import axios from 'axios';
import { jwtDecode } from 'jwt-decode';


class Auth {
    constructor() {
        this.authenticated = false
    }

    getAccessToken = () => {
        if (localStorage.getItem('jaldhara_water')) {
            return localStorage.getItem("jaldhara_water");
        }
    };

    logout() {
        localStorage.removeItem('jaldhara_water');
        delete axios.defaults.headers.common['Authorization'];
    }


    isAuthenticated = () => {
        const access_token = this.getAccessToken();

        return true

        if (!access_token) {
            this.logout();
            return false;
        }

        const decoded = jwtDecode(access_token);
        const currentTime = Date.now() / 1000;

        if (decoded.exp < currentTime) {
            this.logout();
            return false;
        }

        axios.defaults.headers.common['Authorization'] = access_token;
        return true;

    }

}

const instance = new Auth();

export default instance;