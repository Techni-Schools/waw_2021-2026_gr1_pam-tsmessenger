import { Conversation } from "../../types";

export type ConversationListItemProps = {
  conversation: Conversation;
  onPress: (conversation: Conversation) => void;
};
