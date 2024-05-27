import React from "react";
import { SafeAreaView, View, ScrollView } from "react-native";
import { ActivityIndicator, Text } from "react-native-paper";
import styles from "./styles";
import { ConversationsScreenProps } from "./types";
import Header from "../Header";
import ConversationsMenu from "../ConversationsMenu";
import { useQuery } from "@tanstack/react-query";
import api from "../../api";
import ConversationListItem from "../ConversationListItem";

const ConversationsScreen: React.FC<ConversationsScreenProps> = (props) => {
  const { navigation } = props;
  const { navigate } = navigation;

  const { data: conversations, isFetching } = useQuery({
    queryKey: ["api.conversations.list"],
    queryFn: () => api.conversations.list(),
  });

  return (
    <SafeAreaView style={[styles.container]}>
      <Header headline="Conversations">
        <ConversationsMenu />
      </Header>
      <ScrollView>
        {isFetching ? <ActivityIndicator /> : null}
        {conversations ? (
          <View style={{ gap: 15 }}>
            {conversations.map((conversation) => (
              <ConversationListItem
                key={conversation._id}
                conversation={conversation}
                onPress={() =>
                  navigate("Conversation", { conversationId: conversation._id })
                }
              />
            ))}
          </View>
        ) : null}
      </ScrollView>
    </SafeAreaView>
  );
};

export default ConversationsScreen;
