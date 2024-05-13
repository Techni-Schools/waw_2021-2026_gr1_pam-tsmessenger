import { Schema, model } from "mongoose";
import { getRandomColor } from "../../utils.js";
import pusher from "../../pusher.js";

const participantSchema = new Schema({
  role: {
    type: String,
    enum: ["owner", "member"],
    default: "member",
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

const conversationSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    accentColor: {
      type: String,
      default: getRandomColor,
    },
    photo: {
      type: String,
      required: false,
    },
    participants: {
      type: [participantSchema],
      default: [],
    },
  },
  {
    timestamps: true,
    methods: {
      includesUser: function (userId, allowedRoles) {
        const participant = this.participants.find((participant) =>
          participant.user.equals(userId)
        );
        if (!participant) return false;
        return !allowedRoles || allowedRoles.includes(participant.role);
      },
    },
  }
);

const Conversation = model("Conversation", conversationSchema);

export default Conversation;
