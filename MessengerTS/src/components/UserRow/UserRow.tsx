import React from "react";
import { View } from "react-native";
import styles from "./styles";
import { UserRowProps } from "./types";
import Avatar from "../Avatar";
import { Text } from "react-native-paper";

const UserRow: React.FC<UserRowProps> = (props) => {
  const { user, button } = props;

  const isUserPopulated = typeof user === "object";

  return (
    <View style={[styles.container]}>
      {isUserPopulated && (
        <Avatar src={user.photo} alt={user.username} size={20} />
      )}
      {isUserPopulated && <Text style={{ flex: 1 }}>{user.username}</Text>}
      {button}
    </View>
  );
};

export default UserRow;
