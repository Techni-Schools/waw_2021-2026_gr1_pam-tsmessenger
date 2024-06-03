import { Conversation, Participant } from "../../../../types";
import AxiosManager, { Options } from "../../AxiosManager";

class Participants extends AxiosManager {
  constructor(options: Options) {
    super(options);
  }

  public readonly list = async (
    conversationId: Conversation["_id"],
    params?: {
      populate?: string;
      limit?: number | undefined;
      skip?: number | undefined;
    }
  ) => {
    const { data: resData } = await this.instance.get<{ data: Participant[] }>(
      `/conversations/${conversationId}/participants`
    );
    return resData.data;
  };

  public readonly create = async (
    conversationId: Conversation["_id"],
    data: Omit<Participant, "_id">
  ) => {
    const { data: resData } = await this.instance.post<{ data: Participant }>(
      `/conversations/${conversationId}/participants`,
      data
    );
    return resData.data;
  };

  public readonly delete = async (
    conversationId: Conversation["_id"],
    participantId: Participant["_id"]
  ) => {
    const { data: resData } = await this.instance.delete<null>(
      `/conversations/${conversationId}/participants/${participantId}`
    );
    return resData;
  };
}

export default Participants;
