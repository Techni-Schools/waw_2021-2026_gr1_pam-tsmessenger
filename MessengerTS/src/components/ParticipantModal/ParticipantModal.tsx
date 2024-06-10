import React from "react";
import { View } from "react-native";
import styles from "./styles";
import { ParticipantModalProps } from "./types";
import { useMutation, useQuery } from "@tanstack/react-query";
import api from "../../api";

const ParticipantModal: React.FC<ParticipantModalProps> = (props) => {
  const {} = props;

  const { data: users } = useQuery({
    queryKey: ["api.users.list"],
    queryFn: () => api.users.list(),
  });

  const { data: participants } = useQuery({
    queryKey: ["api.conversations.participants.list"],
    queryFn: () => api.conversations.participants.list(),
  });

  const { mutate: createParticipant } = useMutation({
    mutationKey: ["api.conversations.participants.create"],
    mutationFn: () => api.conversations.participants.create(),
  });

  return <View style={[styles.container]}></View>;
};

export default ParticipantModal;
