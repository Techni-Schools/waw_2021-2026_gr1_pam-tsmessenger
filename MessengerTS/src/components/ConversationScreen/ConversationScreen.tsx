import React from "react";
import { KeyboardAvoidingView, View } from "react-native";
import styles from "./styles";
import { ConversationScreenProps } from "./types";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../Header";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigation } from "@react-navigation/native";
import api from "../../api";
import MessageInputBar from "../MessageInputBar";
import MessageList from "../MessageList";

const ConversationScreen: React.FC<ConversationScreenProps> = (props) => {
  const { route, navigation } = props;
  const { params } = route;
  const { conversationId } = params;

  const {} = useNavigation();

  const {
    data: conversation,
    error,
    isFetching,
  } = useQuery({
    queryKey: ["api.conversations.retrieve", conversationId],
    queryFn: () => api.conversations.retrieve(conversationId),
  });

  const { data: messages, refetch } = useQuery({
    queryKey: ["api.conversations.messages.list", conversationId],
    queryFn: () =>
      api.conversations.messages.list(conversationId, { populate: "user" }),
  });

  const { mutate: createMessage } = useMutation({
    mutationKey: ["api.conversations.messages.create", conversationId],
    mutationFn: (variables: { content: string }) =>
      api.conversations.messages.create(conversationId, variables),
    onSuccess: () => refetch(),
  });

  return (
    <SafeAreaView style={[styles.container]}>
      <KeyboardAvoidingView
        style={{
          flexDirection: "column",
          justifyContent: "center",
          flex: 1,
          gap: 25,
        }}
        behavior="padding"
        enabled
        keyboardVerticalOffset={10}
      >
        <Header headline={conversation?.name || ""}></Header>
        <MessageList messages={messages} />
        <MessageInputBar onSubmit={(content) => createMessage({ content })} />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ConversationScreen;
