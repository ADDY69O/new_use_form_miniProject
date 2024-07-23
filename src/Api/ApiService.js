import BaseApiService from "./BaseApiService";
import { LocalStoargeKeys } from "../Components/Constant/Constant";

class ApiService extends BaseApiService {
  constructor(baseURL) {
    super(baseURL);
  }

  async loginUser(data) {
    let responseData = await this.post("user/login", data);
    console.log(responseData);
    responseData.token
      ? this.setStorageData(LocalStoargeKeys.USERINFO, responseData.token) &&
        this.showMessage(responseData.message, "success")
      : this.showMessage(responseData.message, "error");
    return true;
  }

  async registerUser(data) {
    let responseData = await this.post("user/register", data);
    this.setStorageData(LocalStoargeKeys.USERINFO, responseData.token);
    this.showMessage(responseData.message, "success");
    return true;
  }
}

export default new ApiService(`${process.env.REACT_APP_API}`);
