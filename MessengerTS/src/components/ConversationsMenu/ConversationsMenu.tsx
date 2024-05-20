import React, { useState } from "react";
import { View, Alert } from "react-native";
import styles from "./styles";
import { ConversationsMenuProps } from "./types";
import { Button, Menu as PaperMenu } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { useMutation } from "@tanstack/react-query";
import api from "../../api";
import { Conversation } from "../../types";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ConversationsMenu: React.FC<ConversationsMenuProps> = (props) => {
  const {} = props;

  const [isVisible, setIsVisible] = useState<boolean>(false);
  const { navigate } = useNavigation();

  const { mutate: logout } = useMutation({
    mutationFn: () => AsyncStorage.removeItem("auth-token"),
    onSuccess: () => navigate("Splash"),
  });

  const { mutate: createConversation, isPending } = useMutation({
    mutationFn: (variables: Pick<Conversation, "name" | "accentColor">) =>
      api.conversations.create(variables),
    onSuccess: (conversation) => {
      navigate("Conversation", { conversationId: conversation._id });
    },
    onError: (error) => {
      console.error(error);
      Alert.alert(error?.message);
    },
  });

  return (
    <View style={[styles.container]}>
      <PaperMenu
        visible={isVisible}
        onDismiss={() => setIsVisible(false)}
        anchor={
          <Button
            icon={"dots-vertical"}
            onPress={() => setIsVisible(!isVisible)}
          >
            {""}
          </Button>
        }
      >
        <PaperMenu.Item
          title="New conversation"
          onPress={() =>
            Alert.prompt("New conversation", "Enter name of conversation...", [
              { text: "Cancel", style: "cancel" },
              {
                text: "Create",
                onPress: (name) => name && createConversation({ name }),
              },
            ])
          }
        />
        <PaperMenu.Item
          title="My profile"
          onPress={() => navigate("Profile")}
        />
        <PaperMenu.Item title="Logout" onPress={() => logout()} />
      </PaperMenu>
    </View>
  );
};

export default ConversationsMenu;
