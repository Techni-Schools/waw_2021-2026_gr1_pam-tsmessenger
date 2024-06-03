import React, { useEffect, useRef } from "react";
import { ScrollView, View } from "react-native";
import styles from "./styles";
import { MessageListProps } from "./types";
import { useQuery } from "@tanstack/react-query";
import api from "../../api";
import MessageListItem from "../MessageListItem";
import useKeyboardVisible from "../../hooks/useKeyboardVisible";

const MessageList: React.FC<MessageListProps> = (props) => {
  const { messages } = props;

  const scrollViewRef = useRef<ScrollView>(null);

  const isKeyboardVisible = useKeyboardVisible();

  const scrollToEnd = () => {
    scrollViewRef.current?.scrollToEnd({ animated: true });
  };

  useEffect(() => {
    scrollToEnd();
  }, [isKeyboardVisible]);

  return (
    <ScrollView
      ref={scrollViewRef}
      style={[styles.container]}
      onLayout={() => scrollToEnd()}
      onContentSizeChange={() => scrollToEnd()}
    >
      <View>
        {messages?.map((message) => (
          <MessageListItem key={message._id} message={message} />
        ))}
      </View>
    </ScrollView>
  );
};

export default MessageList;
