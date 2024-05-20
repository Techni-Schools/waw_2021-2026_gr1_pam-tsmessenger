import { User } from "../../../../types";
import AxiosManager, { Options } from "../../AxiosManager";

class Me extends AxiosManager {
  constructor(options: Options) {
    super(options);
  }

  public readonly retrieve = async () => {
    const { data: resData } = await this.instance.get<{
      data: User;
    }>("/users/me");
    return resData.data;
  };

  public readonly update = async (data: Partial<Omit<User, "_id">>) => {
    const { data: resData } = await this.instance.patch<{
      data: User;
    }>("/users/me", data);
    return resData.data;
  };
}

export default Me;
