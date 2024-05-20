import { User } from "../../../types";
import AxiosManager, { Options } from "../AxiosManager";
import Me from "./me";

class Users extends AxiosManager {
  public readonly me: Me;

  constructor(options: Options) {
    super(options);
    this.me = new Me(options);
  }

  public readonly list = async () => {
    const { data: resData } = await this.instance.get<{
      data: User[];
    }>("/users");
    return resData.data;
  };
}

export default Users;
