import React, { useState } from "react";
import { View } from "react-native";
import Dialog from "react-native-dialog";
import styles from "./styles";
import { ConversationsMenuProps } from "./types";
import { Button, Menu as PaperMenu, Text } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { useMutation } from "@tanstack/react-query";
import api from "../../api";
import { Conversation } from "../../types";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ConversationsMenu: React.FC<ConversationsMenuProps> = (props) => {
  const {} = props;

  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [isDialogOpened, setIsDialogOpened] = useState<boolean>(false);
  const [conversationName, setConversationName] = useState<string>("");
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
  });

  return (
    <View style={[styles.container]}>
      <Dialog.Container visible={isDialogOpened}>
        <Dialog.Title>New conversation</Dialog.Title>
        <Dialog.Description>Enter name of conversation...</Dialog.Description>
        <Dialog.Input
          value={conversationName}
          onChangeText={setConversationName}
        />
        <Dialog.Button
          label="Cancel"
          onPress={() => setIsDialogOpened(false)}
        ></Dialog.Button>
        <Dialog.Button
          label="Create"
          onPress={() => {
            setIsDialogOpened(false);
            createConversation({ name: conversationName });
          }}
        ></Dialog.Button>
      </Dialog.Container>
      <PaperMenu
        visible={isVisible}
        onDismiss={() => setIsVisible(false)}
        anchor={
          <Button
            icon={"dots-vertical"}
            onPress={() => setIsVisible(!isVisible)}
          >
            <Text>{""}</Text>
          </Button>
        }
      >
        <PaperMenu.Item
          title="New conversation"
          onPress={() => setIsDialogOpened(true)}
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
