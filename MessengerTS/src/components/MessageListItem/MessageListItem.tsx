import React from "react";
import { View } from "react-native";
import styles from "./styles";
import { MessageListItemProps } from "./types";
import Avatar from "../Avatar";
import { Chip, Text } from "react-native-paper";
import { useQuery } from "@tanstack/react-query";
import api from "../../api";

const MessageListItem: React.FC<MessageListItemProps> = (props) => {
  const { message } = props;
  const { content, user } = message;

  const isUserPopulated = typeof user === "object";

  const {} = useQuery({
    queryKey: ["api.users.me.retrieve"],
    queryFn: () => api.users.me.retrieve(),
  });

  return (
    <View style={[styles.container]}>
      {isUserPopulated && (
        <Avatar src={user.photo} alt={user.username} size={28} />
      )}
      <View>
        {isUserPopulated && <Text>{user.username}</Text>}
        <Chip>
          <Text>{content}</Text>
        </Chip>
      </View>
    </View>
  );
};

export default MessageListItem;
