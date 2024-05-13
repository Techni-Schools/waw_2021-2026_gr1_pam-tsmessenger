import AxiosManager, { Options } from "../AxiosManager";

class Auth extends AxiosManager {
  constructor(options: Options) {
    super(options);
  }

  public login = async (data: { email: string; password: string }) => {
    const { data: resData } = await this.instance.post<{
      data: { token: string };
    }>("/auth/login", data);
    return resData.data;
  };
}

export default Auth;
