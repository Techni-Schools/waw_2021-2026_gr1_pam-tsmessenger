import React, { useState } from "react";
import { View } from "react-native";
import styles from "./styles";
import { ConversationMenuProps } from "./types";
import { Menu as PaperMenu, Button } from "react-native-paper";
import ParticipantModal from "../ParticipantModal";

const ConversationMenu: React.FC<ConversationMenuProps> = (props) => {
  const {} = props;
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  return (
    <View style={[styles.container]}>
      <ParticipantModal
        isVisible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
      />
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
          title="Manage participants"
          onPress={() => setIsModalVisible(true)}
        ></PaperMenu.Item>
      </PaperMenu>
    </View>
  );
};

export default ConversationMenu;
