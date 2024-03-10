import axios from 'axios';

class CustomMiddleService {
  async postData(path, data) {
    try {
      const response = await axios.post(path, data);
      return response.status === 200 ? response.data : false;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  async getData(path) {
    try {
      const response = await axios.get(path);
      return response.status === 200 ? response.data : false;
    } catch (error) {
      console.error(error);
      return false;
    }
  }
}

const MiddleService = new CustomMiddleService();

export default MiddleService;