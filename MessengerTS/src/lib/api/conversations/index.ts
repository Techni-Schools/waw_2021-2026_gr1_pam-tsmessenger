import { Conversation } from "../../../types";
import AxiosManager, { Options } from "../AxiosManager";
import Messages from "./messages";

class Conversations extends AxiosManager {
  public readonly messages: Messages; // !

  constructor(options: Options) {
    super(options);
    this.messages = new Messages(options); // !
  }

  public readonly list = async () => {
    const { data: resData } = await this.instance.get<{
      data: Conversation[];
    }>("/conversations");
    return resData.data;
  };

  public readonly retrieve = async (id: Conversation["_id"]) => {
    const { data: resData } = await this.instance.get<{
      data: Conversation;
    }>(`/conversations/${id}`);
    return resData.data;
  };

  public readonly create = async (
    data: Pick<Conversation, "name" | "accentColor">
  ) => {
    const { data: resData } = await this.instance.post<{
      data: Conversation;
    }>("/conversations", data);
    return resData.data;
  };

  public readonly update = async (
    id: Conversation["_id"],
    data: Pick<Conversation, "name" | "accentColor">
  ) => {
    const { data: resData } = await this.instance.patch<{
      data: Conversation;
    }>(`/conversations/${id}`, data);
    return resData.data;
  };
}

export default Conversations;
