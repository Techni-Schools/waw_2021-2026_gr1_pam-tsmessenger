import { Schema, model } from "mongoose";
import pusher from "../../pusher.js";

const messageSchema = new Schema(
  {
    content: {
      type: String,
      required: true,
    },
    conversation: {
      type: Schema.Types.ObjectId,
      ref: "Conversation",
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const Message = model("Message", messageSchema);

export default Message;
