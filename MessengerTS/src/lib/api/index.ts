import { Options } from "./AxiosManager";
import Auth from "./auth";
import Conversations from "./conversations";
import Users from "./users";

class Api {
  public readonly auth: Auth;
  public readonly conversations: Conversations;
  public readonly users: Users;

  constructor(options: Options) {
    this.auth = new Auth(options);
    this.conversations = new Conversations(options);
    this.users = new Users(options);
  }
}

export default Api;
