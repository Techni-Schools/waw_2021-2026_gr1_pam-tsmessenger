import { Conversation, Message } from "../../../../types";
import AxiosManager, { Options } from "../../AxiosManager";

class Messages extends AxiosManager {
  constructor(options: Options) {
    super(options);
  }

  public readonly list = async (
    conversationId: Conversation["_id"],
    params?: {
      limit?: number | undefined;
      skip?: number | undefined;
      populate?: string | string[] | undefined;
    }
  ) => {
    const { data: resData } = await this.instance.get<{
      data: Message[];
    }>(`/conversations/${conversationId}/messages`, { params });
    return resData.data;
  };

  public readonly create = async (
    conversationId: Conversation["_id"],
    data: Pick<Message, "content">
  ) => {
    const { data: resData } = await this.instance.post<{
      data: Message;
    }>(`/conversations/${conversationId}/messages`, data);
    return resData.data;
  };
}

export default Messages;
