import React from "react";
import { View } from "react-native";
import styles from "./styles";
import { ParticipantModalProps } from "./types";
import { useMutation, useQuery } from "@tanstack/react-query";
import api from "../../api";
import { RouteProp, useRoute } from "@react-navigation/native";
import { ParamList } from "../../../App";
import { Participant } from "../../types";

const ParticipantModal: React.FC<ParticipantModalProps> = (props) => {
  const {} = props;

  const { params } = useRoute<RouteProp<ParamList, "Conversation">>();
  const { conversationId } = params;

  const { data: users } = useQuery({
    queryKey: ["api.users.list"],
    queryFn: () => api.users.list(),
  });

  const { data: participants } = useQuery({
    queryKey: ["api.conversations.participants.list", conversationId],
    queryFn: () => api.conversations.participants.list(conversationId),
  });

  const { mutate: createParticipant } = useMutation({
    mutationKey: ["api.conversations.participants.create", conversationId],
    mutationFn: (variables: Omit<Participant, "_id">) =>
      api.conversations.participants.create(conversationId, variables),
  });

  const { mutate: deleteParticipant } = useMutation({
    mutationKey: ["api.conversations.participants.delete", conversationId],
    mutationFn: (variables: Participant["_id"]) =>
      api.conversations.participants.delete(conversationId, variables),
  });

  return <View style={[styles.container]}></View>;
};

export default ParticipantModal;
