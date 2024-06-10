import React from "react";
import { ScrollView, View } from "react-native";
import styles from "./styles";
import { ParticipantModalProps } from "./types";
import { useMutation, useQuery } from "@tanstack/react-query";
import api from "../../api";
import { RouteProp, useRoute } from "@react-navigation/native";
import { ParamList } from "../../../App";
import { Participant, User } from "../../types";
import { Button, Headline, Modal, Portal } from "react-native-paper";
import UserRow from "../UserRow";

const ParticipantModal: React.FC<ParticipantModalProps> = (props) => {
  const { isVisible, onClose } = props;

  const { params } = useRoute<RouteProp<ParamList, "Conversation">>();
  const { conversationId } = params;

  const { data: users } = useQuery({
    queryKey: ["api.users.list"],
    queryFn: () => api.users.list(),
  });

  const { data: participants, refetch } = useQuery({
    queryKey: ["api.conversations.participants.list", conversationId],
    queryFn: () =>
      api.conversations.participants.list(conversationId, {
        populate: ["participants.user"],
      }),
  });

  const { mutate: createParticipant } = useMutation({
    mutationKey: ["api.conversations.participants.create", conversationId],
    mutationFn: (variables: Omit<Participant, "_id">) =>
      api.conversations.participants.create(conversationId, variables),
    onSuccess: () => refetch(),
  });

  const { mutate: deleteParticipant } = useMutation({
    mutationKey: ["api.conversations.participants.delete", conversationId],
    mutationFn: (variables: Participant["_id"]) =>
      api.conversations.participants.delete(conversationId, variables),
    onSuccess: () => refetch(),
  });

  return (
    <Portal>
      <Modal style={{ padding: 20 }} visible={isVisible}>
        <View
          style={{
            backgroundColor: "#111",
            borderRadius: 20,
            padding: 20,
            maxHeight: 500,
          }}
        >
          <View>
            <Button icon="close" onPress={() => onClose()}>
              {""}
            </Button>
          </View>
          <ScrollView>
            <View>
              <Headline>Participants</Headline>
              {participants?.map((participant) => (
                <UserRow
                  key={participant._id}
                  user={participant.user}
                  button={
                    <Button onPress={() => deleteParticipant(participant._id)}>
                      KICK
                    </Button>
                  }
                />
              ))}
            </View>
            <View>
              <Headline>Other users</Headline>
              {users
                ?.filter(
                  (user) =>
                    !participants?.some(
                      (participant) =>
                        (participant.user as User)._id === user._id
                    )
                )
                .map((user) => (
                  <UserRow
                    key={user._id}
                    user={user}
                    button={
                      <Button
                        onPress={() =>
                          createParticipant({ role: "member", user: user._id })
                        }
                      >
                        ADD
                      </Button>
                    }
                  />
                ))}
            </View>
          </ScrollView>
        </View>
      </Modal>
    </Portal>
  );
};

export default ParticipantModal;
