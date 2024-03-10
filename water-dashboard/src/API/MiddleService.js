import axios from 'axios';

class CustomMiddleService {

    postData = async (path, data) => {
        try {
            let response = await axios.post(path, data);
            if (response.status == 'success') {
                return response.data;
            } else {
                return false;
            }
        }
        catch (error) {
            console.error(error);
        }
    }

    getData = async (path) => {
        try {
            let response = await axios.get(path);
            if (response.status == 'success') {
                return response.data;
            } else {
                return false;
            }
        }
        catch (e) {
            console.error(e);
        }
    }

}

const MiddleService = new CustomMiddleService();

export default MiddleService;
