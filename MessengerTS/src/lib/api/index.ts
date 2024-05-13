import { Options } from "./AxiosManager";
import Auth from "./auth";

class Api {
  public readonly auth: Auth;

  constructor(options: Options) {
    this.auth = new Auth(options);
  }
}

export default Api;
