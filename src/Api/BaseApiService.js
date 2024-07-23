import axios from "axios";
import { toast } from "react-toastify";

class BaseApiService {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  async post(endPoints, data) {
    await axios
      .post(this.baseUrl + endPoints, data)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        this.showMessage(error.response.data.message, "error");
      });
  }

  async _get(endPoints) {
    await axios
      .post(this.baseUrl + endPoints)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        this.showMessage(error.response.data.message, "error");
      });
  }

  showMessage(msg, type) {
    type == "success"
      ? toast.success(msg)
      : toast.error(msg || "Internal Server error");
  }

  getStorageData(key) {
    return localStorage.getItem(key);
  }

  setStorageData(key, value) {
    localStorage.setItem(key, value);
  }
}
export default BaseApiService;
