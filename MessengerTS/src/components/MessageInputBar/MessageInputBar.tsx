import React, { useState } from "react";
import { View } from "react-native";
import styles from "./styles";
import { MessageInputBarProps } from "./types";
import { Button, TextInput } from "react-native-paper";

const MessageInputBar: React.FC<MessageInputBarProps> = (props) => {
  const { onSubmit } = props;

  const [content, setContent] = useState<string>("");

  const handlePress = () => {
    onSubmit(content);
    setContent("");
  };

  return (
    <View style={[styles.container]}>
      <TextInput
        mode="flat"
        style={{ flex: 1 }}
        contentStyle={{ borderRadius: 50 }}
        autoCapitalize="none"
        keyboardAppearance="dark"
        value={content}
        onChangeText={setContent}
      />
      <Button mode="contained" onPress={handlePress}>
        Send
      </Button>
    </View>
  );
};

export default MessageInputBar;
